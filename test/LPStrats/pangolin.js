const { doLPStrategyTest } = require("../lp-strategy-test");

const globeABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_governance","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"address","name":"_controller","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"available","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"controller","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"harvest","inputs":[{"type":"address","name":"reserve","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"max","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"min","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setController","inputs":[{"type":"address","name":"_controller","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMin","inputs":[{"type":"uint256","name":"_min","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimelock","inputs":[{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"timelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"token","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_shares","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}];
const stratABI = [{"inputs":[{"internalType":"address","name":"_want","type":"address"},{"internalType":"address","name":"_governance","type":"address"},{"internalType":"address","name":"_strategist","type":"address"},{"internalType":"address","name":"_controller","type":"address"},{"internalType":"address","name":"_timelock","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfWant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_target","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"execute","outputs":[{"internalType":"bytes","name":"response","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"feeDistributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"harvesters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keep","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keepMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pangolinRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceDevFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceDevMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceTreasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"performanceTreasuryMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"png","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"revenueShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"revenueShareMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_harvester","type":"address"}],"name":"revokeHarvester","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeDistributor","type":"address"}],"name":"setFeeDistributor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_keep","type":"uint256"}],"name":"setKeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_performanceDevFee","type":"uint256"}],"name":"setPerformanceDevFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_performanceTreasuryFee","type":"uint256"}],"name":"setPerformanceTreasuryFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"setRevenueShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_timelock","type":"address"}],"name":"setTimelock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawalDevFundFee","type":"uint256"}],"name":"setWithdrawalDevFundFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawalTreasuryFee","type":"uint256"}],"name":"setWithdrawalTreasuryFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"snob","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timelock","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wavax","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_harvester","type":"address"}],"name":"whitelistHarvester","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contractIERC20","name":"_asset","type":"address"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawForSwap","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawalDevFundFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawalDevFundMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawalTreasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawalTreasuryMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

const tests = [
//   {
//     name: "PngAvaxAmpl",
//   },
//   {
//     name: "PngAvaxApein",
//   },
//   {
//     name: "PngAvaxAvai",
//   },
//   {
//     name: "PngAvaxCly",
//   },
//   {
//     name: "PngAvaxCook",
//   },
//   {
//     name: "PngAvaxCra",
//   },
//   {
//     name: "PngAvaxCraft",
//   },
//   {
//     name: "PngAvaxDaiE",
//   },
//   {
//     name: "PngAvaxDyp",
//   },
//   {
//     name: "PngAvaxFrax",
//   },
//   {
//     name: "PngAvaxgOhm",
//   },
//   {
//     name: "PngAvaxHct",
//   },
//   {
//     name: "PngAvaxHusky",
//   },
//   {
//     name: "PngAvaxImxa",
//   },
//   {
//     name: "PngAvaxInsur",
//   },
//   {
//     name: "PngAvaxJewel",
//   },
//   {
//     name: "PngAvaxJoe",
//   },
//   {
//     name: "PngAvaxKlo",
//   },
//   {
//     name: "PngAvaxLinkE",
//   },
//   {
//     name: "PngAvaxMaxi",
//   },
//   {
//     name: "PngAvaxMim",
//   },
//   {
//     name: "PngAvaxOoe",
//   },
//   {
//     name: "PngAvaxOrbs",
//   },
//   {
//     name: "PngAvaxOrca",
//   },
//   {
//     name: "PngAvaxPefi",
//   },
//   {
//     name: "PngAvaxPng",
//   },
  {
    name: "PngAvaxQi",
  },
  {
    name: "PngAvaxRoco",
  },
  {
    name: "PngAvaxSnob",
  },
  {
    name: "PngAvaxSpell",
  },
  {
    name: "PngAvaxSpore",
  },
  {
    name: "PngAvaxTeddy",
  },
  {
    name: "PngAvaxTime",
  },
  {
    name: "PngAvaxTusd",
  },
  {
    name: "PngAvaxUsdcE",
  },
  {
    name: "PngAvaxUsdtE",
  },
  {
    name: "PngAvaxVee",
  },
  {
    name: "PngAvaxWalbt",
  },
  {
    name: "PngAvaxWbtcE",
  },
  {
    name: "PngAvaxWethE",
  },
  {
    name: "PngAvaxWow",
  },
  {
    name: "PngAvaxXava",
  },
  {
    name: "PngAvaxYak",
  },
  {
    name: "PngAvaxYay",
  },
  {
    name: "PngTusdDaiE",
  },
  {
    name: "PngUsdcEDaiE",
  },
  {
    name: "PngUsdcEMim",
  },
  {
    name: "PngUsdcEPng",
  },
  {
    name: "PngUsdcEUsdtE",
  },
  {
    name: "PngUsdtESkill",
  },
];

for (const test of tests) {
  describe(test.name, async () => {
    doLPStrategyTest(
      test.name,
      test.snowglobeAddress,
      test.controllerAddress,
      globeABI,
      stratABI,
      test.slot
    );
  });
}
