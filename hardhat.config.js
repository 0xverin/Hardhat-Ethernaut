require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
        ganache: {
            url: "http://127.0.0.1:7545",
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.0",
            },
            {
                version: "0.6.0",
            },
        ],
    },
};
