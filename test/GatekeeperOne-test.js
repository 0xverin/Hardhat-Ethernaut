const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("test", function () {
    var GatekeeperOne;
    var AttackGatekeeperOne;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const GatekeeperOneInstance = await ethers.getContractFactory("GatekeeperOne");
        GatekeeperOne = await GatekeeperOneInstance.deploy();

        const AttackGatekeeperOneInstance = await ethers.getContractFactory("AttackGatekeeperOne");
        AttackGatekeeperOne = await AttackGatekeeperOneInstance.deploy(GatekeeperOne.address);
    });
    it("hack test", async function () {
        console.log(await AttackGatekeeperOne.entrant()); // 0x0000000000000000000000000000000000000000

        console.log(await AttackGatekeeperOne.entrant());
        await AttackGatekeeperOne.exploit();
        await AttackGatekeeperOne.getentrant();

        console.log(await AttackGatekeeperOne.entrant()); //your address
    });
});
