const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

describe("test", function () {
    var Force;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const ForceInstance = await ethers.getContractFactory("Force");
        Force = await ForceInstance.deploy();
    });
    it("hack test", async function () {
        const abi = ["function transfer(address _to,unit _amount)"];
        const interface = new ethers.utils.Interface(abi);

        const callData = interface.encodeFunctionData(`transfer`, [Force.address, parseEther("1")]);
        await users[0].sendTransaction({
            to: Force.address,
            data: callData,
        });
        expect(await Force.owner()).to.equal(users[0].address);
    });
});
