const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

describe("test", function () {
    var Force;
    var AttackForce;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const ForceInstance = await ethers.getContractFactory("Force");
        Force = await ForceInstance.deploy();

        const AttackForceInstance = await ethers.getContractFactory("AttackForce");
        AttackForce = await AttackForceInstance.deploy();
    });
    it("hack test", async function () {
        await deployer.sendTransaction({
            to: AttackForce.address,
            value: parseEther("1"),
        });
        const balance1 = await ethers.provider.getBalance(AttackForce.address);

        await AttackForce.attack(Force.address);
        const balance2 = await ethers.provider.getBalance(Force.address);

        expect(balance2).to.equal(parseEther("1"));
    });
});
