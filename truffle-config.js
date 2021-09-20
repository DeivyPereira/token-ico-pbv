var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "increase sponsor cute cluster echo ostrich soda galaxy family people sure salmon";
require("babel-register");
require("babel-polyfill");

module.exports = {
    contracts_directory: "./src/contracts/",
    contracts_build_directory: "./src/abis/",
    compilers: {
        solc: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        development: {
         host: "127.0.0.1",
         port: 7545,
         network_id: "5777"
        },
        rinkeby: {
            provider: function() { 
             return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/ee91d20db7dd4219aa78bf100732da25");
            },
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000,
        }
       }
};
