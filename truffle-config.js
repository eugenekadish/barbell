const path = require('path');
// const HDWalletProvider =
//     require('./client/node_modules/@truffle/hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'public/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'  // ,
      // provider: function() {
      //   return new HDWalletProvider(
      //       'fade beyond puppy awful shallow whip uniform robot dynamic
      //       present gap term',
      //       'http://127.0.0.1:8545', 0, 10);
      // }
    }
  },
  compilers: {
    solc: {
      version: '0.7.2',
      evmVersion: 'petersburg'
    }
  },

  mocha: { bail: true, useColors: true }
};
