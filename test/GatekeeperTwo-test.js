const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("test", function () {
    var GatekeeperTwo;
    var AttackGatekeeperTwo;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const GatekeeperTwoInstance = await ethers.getContractFactory("GatekeeperTwo");
        GatekeeperTwo = await GatekeeperTwoInstance.deploy();
        expect(await GatekeeperTwo.entrant()).to.equal("0x0000000000000000000000000000000000000000");

        const AttackGatekeeperTwoInstance = await ethers.getContractFactory("AttackGatekeeperTwo");
        AttackGatekeeperTwo = await AttackGatekeeperTwoInstance.deploy(GatekeeperTwo.address);
    });
    it("hack test", async function () {
        expect(await GatekeeperTwo.entrant()).to.equal(deployer.address);
    });
});
