const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

describe("test", function () {
    var Elevator;
    var Building;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const ElevatorInstance = await ethers.getContractFactory("Elevator");
        Elevator = await ElevatorInstance.deploy();
        const BuildingInstance = await ethers.getContractFactory("Building");
        Building = await BuildingInstance.deploy();
    });
    it("hack test", async function () {
        expect(await Elevator.top()).to.equal(false);
        await Building.exploit(Elevator.address);
        expect(await Elevator.top()).to.equal(true);
    });
});
