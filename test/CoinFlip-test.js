const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("RebaseDividendToken Token Test", function () {
    var CoinFlip;
    var AttackCoinFlip;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const CoinFlipInstance = await ethers.getContractFactory("CoinFlip");
        CoinFlip = await CoinFlipInstance.deploy();
        const AttackCoinFlipInstance = await ethers.getContractFactory("AttackCoinFlip");
        AttackCoinFlip = await AttackCoinFlipInstance.deploy(CoinFlip.address);
    });
    it("hack test", async function () {
        for (let index = 0; index < 10; index++) {
            await AttackCoinFlip.attack();
        }
        const num = await CoinFlip.consecutiveWins();
        expect(num).to.equal(10);
    });
});
