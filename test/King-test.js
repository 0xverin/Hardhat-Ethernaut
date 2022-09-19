const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");

describe("test", function () {
    var King;
    var AttackKing;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const KingInstance = await ethers.getContractFactory("King");
        King = await KingInstance.deploy({
            value: parseEther("1"),
        });
        expect(await King._king()).to.equal(deployer.address);

        const AttackKingInstance = await ethers.getContractFactory("AttackKing");
        AttackKing = await AttackKingInstance.connect(users[0]).deploy(King.address, {
            value: parseEther("2"),
        });
    });
    it("hack test", async function () {
        expect(await King._king()).to.equal(AttackKing.address);
        try {
            const res = await deployer.sendTransaction({
                value: parseEther("2"),
                to: King.address,
            });
        } catch (error) {
            console.log("error", "无法发送ETH到合约地址");
        }
    });
});
