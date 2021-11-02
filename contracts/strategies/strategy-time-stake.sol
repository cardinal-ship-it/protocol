// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;

import "../lib/ownable.sol"; 
import "../lib/safe-math.sol";
import "../lib/erc20.sol";
import "./strategy-base.sol";
import "../interfaces/wonderland.sol"; 

abstract contract TimeStaking is StrategyBase{

    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeERC20 for IERC20;

    //Tokens
    address public immutable Time;
    address public immutable Memories;


    struct Epoch {
        uint number;
        uint distribute;
        uint32 length;
        uint32 endTime;
    }
    Epoch public epoch;

    address public distributor;
    
    address public locker;
    uint public totalBonus;
    
    address public warmupContract;
    uint public warmupPeriod;
    
    constructor ( 
        address _Time, 
        address _Memories, 
        uint32 _epochLength,
        uint _firstEpochNumber,
        uint32 _firstEpochTime
    ) public {
        require( _Time != address(0) );
        Time = _Time;
        require( _Memories != address(0) );
        Memories = _Memories;
        
        epoch = Epoch({
            length: _epochLength,
            number: _firstEpochNumber,
            endTime: _firstEpochTime,
            distribute: 0
        });
    }

    struct Claim {
        uint deposit;
        uint gons;
        uint expiry;
        bool lock; // prevents malicious delays
    }
    mapping( address => Claim ) public warmupInfo;


    /**
        @notice stake TIME to enter warmup
        @param _amount uint
        @return bool
     */
    function stake( uint _amount, address _recipient ) external returns ( bool ) {

        //the protocol making sure that you own the right proportion of the treasury balancer
        rebase();
        
        IERC20( Time ).safeTransferFrom( msg.sender, address(this), _amount );

        //The warmup period is a number of epochs before a staker can take their MEMOries.
        Claim memory info = warmupInfo[ _recipient ];
        require( !info.lock, "Deposits for account are locked" );

        warmupInfo[ _recipient ] = Claim ({
            deposit: info.deposit.add( _amount ),
            gons: info.gons.add( IMemo( Memories ).gonsForBalance( _amount ) ),
            expiry: epoch.number.add( warmupPeriod ),
            lock: false
        });
        
        IERC20( Memories ).safeTransfer( warmupContract, _amount );
        return true;
    }

    /**
        @notice retrieve MEMOries from warmup
        @param _recipient address
     */
    function claim ( address _recipient ) public {
        Claim memory info = warmupInfo[ _recipient ];
        if ( epoch.number >= info.expiry && info.expiry != 0 ) {
            delete warmupInfo[ _recipient ];
            IWarmup( warmupContract ).retrieve( _recipient, IMemo( Memories ).balanceForGons( info.gons ) );
        }
    }

    /**
        @notice forfeit MEMOries in warmup and retrieve TIME
     */
    function forfeit() external {
        Claim memory info = warmupInfo[ msg.sender ];
        delete warmupInfo[ msg.sender ];

        IWarmup( warmupContract ).retrieve( address(this), IMemo( Memories ).balanceForGons( info.gons ) );
        IERC20( Time ).safeTransfer( msg.sender, info.deposit );
    }

    /**
        @notice prevent new deposits to address (protection from malicious activity)
     */
    function toggleDepositLock() external {
        warmupInfo[ msg.sender ].lock = !warmupInfo[ msg.sender ].lock;
    }

    /**
        @notice redeem MEMOries for TIME
        @param _amount uint
        @param _trigger bool
     */
    function unstake( uint _amount, bool _trigger ) external {
        if ( _trigger ) {
            //the protocol making sure that you own the right proportion of the treasury balancer
            rebase();
        }

        //changes MEMOries to TIME
        IERC20( Memories ).safeTransferFrom( msg.sender, address(this), _amount );
        IERC20( Time ).safeTransfer( msg.sender, _amount );
    }


    /**
        @notice returns the MEMOries index, which tracks rebase growth
        @return uint
     */
    function index() public view returns ( uint ) {
        return IMemo( Memories ).index();
    }

    /**
        @notice trigger rebase if epoch over
     */
    function rebase() public {
        if( epoch.endTime <= uint32(block.timestamp) ) {

            IMemo( Memories ).rebase( epoch.distribute, epoch.number );

            epoch.endTime = epoch.endTime.add32( epoch.length );
            epoch.number++;
            
            if ( distributor != address(0) ) {
                IDistributor( distributor ).distribute();
            }

            //TIME balance
            uint balance = contractBalance();
            uint staked = IMemo( Memories ).circulatingSupply();

            if( balance <= staked ) {
                epoch.distribute = 0;
            } else {
                epoch.distribute = balance.sub( staked );
            }
        }
    }

    /**
        @notice returns contract TIME holdings, including bonuses provided
        @return uint
     */
    function contractBalance() public view returns ( uint ) {
        return IERC20( Time ).balanceOf( address(this) ).add( totalBonus );
    }

    /**
        @notice provide bonus to locked staking contract
        @param _amount uint
     */
    function giveLockBonus( uint _amount ) external {
        require( msg.sender == locker );
        totalBonus = totalBonus.add( _amount );
        IERC20( Memories ).safeTransfer( locker, _amount );
    }

    /**
        @notice reclaim bonus from locked staking contract
        @param _amount uint
     */
    function returnLockBonus( uint _amount ) external {
        require( msg.sender == locker );
        totalBonus = totalBonus.sub( _amount );
        IERC20( Memories ).safeTransferFrom( locker, address(this), _amount );
    }

    enum CONTRACTS { DISTRIBUTOR, WARMUP, LOCKER }

    /**
        @notice sets the contract address for LP staking
        @param _contract address
     */
    function setContract( CONTRACTS _contract, address _address ) public {
        if( _contract == CONTRACTS.DISTRIBUTOR ) { // 0
            distributor = _address;
        } else if ( _contract == CONTRACTS.WARMUP ) { // 1
            require( warmupContract == address( 0 ), "Warmup cannot be set more than once" );
            warmupContract = _address;
        } else if ( _contract == CONTRACTS.LOCKER ) { // 2
            require( locker == address(0), "Locker cannot be set more than once" );
            locker = _address;
        }
    }
    
    /**
     * @notice set warmup period in epoch's numbers for new stakers
     * @param _warmupPeriod uint
     */
    function setWarmup( uint _warmupPeriod ) public {
        warmupPeriod = _warmupPeriod;
    }
}