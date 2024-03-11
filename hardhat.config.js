const { task } = require("hardhat/config");

require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");

task("deploy", "Deploy contract").setAction(async () => {
  const deploy = require("./scripts/deploy");
  await deploy();
});

task("upgrade", "Upgrade contract").setAction(async () => {
  const upgrade = require("./scripts/upgrade");
  await upgrade();
});

task("deploy-checker", "Deploy BalanceChecker contract").setAction(async () => {
  const deploy = require("./scripts/deploy-checker");
  await deploy();
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sphinx",
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    sphinx: {
      chainId: 8082,
      url: "https://sphinx.shardeum.org",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1,
    },
  },
  etherscan: {
    apiKey: {
      sphinx: process.env.shardeum_sphinx_API_KEY,
    },
    customChains: [
      {
        network: "sphinx",
        chainId: 8082,
        urls: {
          apiURL: "https://explorer-sphinx.shardeum.org/api",
          browserURL: "https://explorer-sphinx.shardeum.org/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false
  }
};
