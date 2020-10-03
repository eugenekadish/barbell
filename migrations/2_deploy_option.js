const Token = artifacts.require('assets/Token.sol');
// const Option = artifacts.require('derivatives/Option.sol');

// https://ethereum.stackexchange.com/questions/59969/truffle-migrations-same-contract-deployed-multiple-times

module.exports = function (deployer, network, accounts) {
    // let user = accounts[0];

    // deployer.deploy(Token, 284, { from: user, gasPrice: 400 })
    //     .then((res) => {
    //         const contracAddress = res.address;

    //         return deployer.deploy(Option, contracAddress, { from: user, gasPrice: 400 })
    //     })
    //     .then((res) => {

    //         console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = ');
    //         console.log(` * Contract address ${res.address.substring(0, 8)}`);
    //         // console.log(` * Transaction hash ${res.transactionHash.substring(0, 8)}`);
    //         console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = ');
    //     });
};
