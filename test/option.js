const Token = artifacts.require('assets/Token.sol');
const Option = artifacts.require('derivatives/Option.sol');

contract('Option', (accounts) => {
    describe('a deployed contract', () => {
        let optionInstance, tokenAdmin, tokenInstance, tokenBuyer = {};

        before(async () => {

            let receipt, allowance = {};

            tokenAdmin = accounts[0];
            marketMaker = accounts[1];

            optionAdmin = accounts[2];
            optionBuyer = accounts[3];

            const blockNumber = await web3.eth.getBlockNumber();
            const tokenAdminBalance = await web3.eth.getBalance(tokenAdmin);

            console.log(blockNumber);
            console.log(tokenAdminBalance);

            console.log(' = = = = = = = = = = = = = = = = = = = ');

            // tokenInstance = await Token.at(0x3f80fe03f80fe03f80fe03f80fe03f8);
            // tokenInstance = await Token.at(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599);

            tokenInstance = await Token.new(482, { from: tokenAdmin, gasPrice: 400 });
            optionInstance = await Option.new(tokenInstance.address, { from: marketMaker, gasPrice: 400 });

            const transfer = await tokenInstance.transfer(marketMaker, 116);

            receipt = transfer.receipt;

            console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
            console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

            const approve = await tokenInstance.approve(optionInstance.address, 100, { from: marketMaker, gasPrice: 400 });

            receipt = approve.receipt;

            console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
            console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

            console.log(' = = = = = = = = = = = = = = = = = = = ');
        });

        // it('...should have transfered correct amount',
        //     async (/* done */) => {

        //         let adminBalance;

        //         adminBalance = await tokenInstance.balanceOf(tokenAdmin);
        //     });

        it('...should have transfered correct amount',
            async (/* done */) => {

                const balance = await tokenInstance.balanceOf(optionInstance.address);
                const allowance = await tokenInstance.allowance(marketMaker, optionInstance.address);

                console.log(` * Balance of ${balance}`);
                console.log(` * Allowance of ${allowance}`);

                const blockNumber = await web3.eth.getBlockNumber();
                const issue = await optionInstance.issue(optionBuyer, blockNumber + 42, 0, 16, 2, 4, { from: marketMaker, gasPrice: 400 });

                receipt = issue.receipt;

                console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
                console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

                const claim = await optionInstance.claim(blockNumber + 42, 0, 16, { from: optionBuyer, gasPrice: 400, value: 1 });

                receipt = claim.receipt;

                console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
                console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

                const optionBalance = await web3.eth.getBalance(optionInstance.address);
                const optionAllowance = await tokenInstance.allowance(marketMaker, optionInstance.address);

                console.log(` * Balance of ${optionBalance}`);
                console.log(` * Allowance of ${optionAllowance}`);

                // done();
            });
    });
});
