const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("test", function () {
    var Vault;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const VaultInstance = await ethers.getContractFactory("Vault");
        Vault = await VaultInstance.deploy(ethers.utils.formatBytes32String("ETH"));
    });
    it("hack test", async function () {
        const r = await ethers.provider.getStorageAt(Vault.address, 0);
        console.log(ethers.utils.parseBytes32String(r)); //ETH
    });
});
