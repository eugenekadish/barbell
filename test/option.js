const Token = artifacts.require('assets/Token.sol');

const Oracle = artifacts.require('utilities/Oracle.sol');
const Option = artifacts.require('derivatives/Option.sol');

contract('Option', (accounts) => {
    describe('a deployed contract', () => {

        let optionInstance, tokenInstance, oracleInstance;
        let tokenAdmin, marketMaker, optionAdmin, optionBuyer;

        before(async () => {

            let receipt;

            tokenAdmin = accounts[0];
            marketMaker = accounts[1];

            optionAdmin = accounts[2];
            optionBuyer = accounts[3];

            // tokenInstance = await Token.at(0x3f80fe03f80fe03f80fe03f80fe03f8);
            // tokenInstance = await Token.at(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599);

            tokenInstance = await Token.new(482, { from: tokenAdmin, gasPrice: 400 });
            oracleInstance = await Oracle.new(tokenInstance.address, { from: accounts[4], gasPrice: 400 });

            optionInstance = await Option.new(tokenInstance.address, oracleInstance.address, { from: marketMaker, gasPrice: 400 });

            const transfer = await tokenInstance.transfer(marketMaker, 116);

            receipt = transfer.receipt;

            console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
            // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

            const approve = await tokenInstance.approve(optionInstance.address, 100, { from: marketMaker, gasPrice: 400 });

            receipt = approve.receipt;

            console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
            // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
        });

        it('...should transfer tokens',
            async (/* done */) => {

                let receipt;

                let mmEthBalance, mmTokBalance, mmTokAllowance;
                let oBuyerEthBalance, oBuyerTokBalance, oBuyerTokAllowance;

                let oEthBalance, oTokBalance, oTokAllowance;

                const blockNumber = await web3.eth.getBlockNumber();

                mmEthBalance = await web3.eth.getBalance(marketMaker);
                oBuyerEthBalance = await web3.eth.getBalance(optionBuyer);

                oEthBalance = await web3.eth.getBalance(optionInstance.address);

                console.log(` * Eth Balance ${mmEthBalance}`);
                console.log(` * Eth Balance ${oBuyerEthBalance}`);

                console.log(` * Eth Balance ${oEthBalance}`);

                mmTokBalance = await tokenInstance.balanceOf(marketMaker);
                oBuyerTokBalance = await tokenInstance.balanceOf(optionBuyer);

                oTokBalance = await tokenInstance.balanceOf(optionInstance.address);

                console.log(` * Tok Balance ${mmTokBalance}`);
                console.log(` * Tok Balance ${oBuyerTokBalance}`);

                console.log(` * Tok Balance ${oTokBalance}`);

                mmTokAllowance = await tokenInstance.allowance(marketMaker, marketMaker);
                oBuyerTokAllowance = await tokenInstance.allowance(marketMaker, optionBuyer);

                oTokAllowance = await tokenInstance.allowance(marketMaker, optionInstance.address);

                console.log(` * Allowance ${mmTokAllowance}`);
                console.log(` * Allowance ${oBuyerTokAllowance}`);

                console.log(` * Allowance ${oTokAllowance}`);

                const issue = await optionInstance.issue(optionBuyer, blockNumber + 42, 0, 16, 2, 4, { from: marketMaker, gasPrice: 400 });

                receipt = issue.receipt;

                console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
                // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

                const claim = await optionInstance.claim(blockNumber + 42, 0, 16, { from: optionBuyer, gasPrice: 400, value: 65 });

                receipt = claim.receipt;

                console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
                // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

                mmEthBalance = await web3.eth.getBalance(marketMaker);
                oBuyerEthBalance = await web3.eth.getBalance(optionBuyer);

                oEthBalance = await web3.eth.getBalance(optionInstance.address);

                console.log(` * Eth Balance ${mmEthBalance}`);
                console.log(` * Eth Balance ${oBuyerEthBalance}`);

                console.log(` * Eth Balance ${oEthBalance}`);

                mmTokBalance = await tokenInstance.balanceOf(marketMaker);
                oBuyerTokBalance = await tokenInstance.balanceOf(optionBuyer);

                oTokBalance = await tokenInstance.balanceOf(optionInstance.address);

                console.log(` * Tok Balance ${mmTokBalance}`);
                console.log(` * Tok Balance ${oBuyerTokBalance}`);

                console.log(` * Tok Balance ${oTokBalance}`);

                mmTokAllowance = await tokenInstance.allowance(marketMaker, marketMaker);
                oBuyerTokAllowance = await tokenInstance.allowance(marketMaker, optionBuyer);

                oTokAllowance = await tokenInstance.allowance(marketMaker, optionInstance.address);

                console.log(` * Allowance ${mmTokAllowance}`);
                console.log(` * Allowance ${oBuyerTokAllowance}`);

                console.log(` * Allowance ${oTokAllowance}`);

                const withdraw = await optionInstance.withdraw({ from: marketMaker, gasPrice: 400 });

                receipt = withdraw.receipt;

                console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
                // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

                mmEthBalance = await web3.eth.getBalance(marketMaker);
                oBuyerEthBalance = await web3.eth.getBalance(optionBuyer);

                oEthBalance = await web3.eth.getBalance(optionInstance.address);

                console.log(` * Eth Balance ${mmEthBalance}`);
                console.log(` * Eth Balance ${oBuyerEthBalance}`);

                console.log(` * Eth Balance ${oEthBalance}`);

                // done();
            });
    });
});
