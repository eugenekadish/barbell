const Identity = artifacts.require('Identity.sol');

// https://ethereum.stackexchange.com/questions/59969/truffle-migrations-same-contract-deployed-multiple-times
module.exports = function (deployer, network, accounts) {
    // let user = accounts[0];
    // // let inputBytes = (new TextEncoder()).encode("personal");

    // deployer
    //     .deploy(Identity, 'application/json', [72, 6, 13], { from: user, gasPrice: 400 })
    //     .then((res) => {

    //         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = ');
    //         // console.log(` * Contract address ${res.address}`);
    //         // console.log(` * Transaction hash ${res.transactionHash}`);
    //         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = ');
    //     });
};
