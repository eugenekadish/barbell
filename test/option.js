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
        });

        it('...should have transfered correct amount',
            async (/* done */) => {

                const balance = await tokenInstance.balanceOf(optionInstance.address);

                console.log(` * Balance of ${balance}`);

                const issue = await optionInstance.issue(optionBuyer, 28, 0, 6, 2, 4, { from: marketMaker, gasPrice: 400 });

                receipt = issue.receipt;

                console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
                console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

                // done();
            });

        // it('...should have transfered correct amount',

        // // console.log(optionInstance);
        // console.log(optionInstance.address);

        // const approve = await tokenInstance.approve(optionInstance.address, 1000); // Can sell 10 contracts

        // receipt = approve.receipt;

        // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
        // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

        // allowance = await tokenInstance.allowance(marketMaker, optionInstance.address);

        // console.log(` * Allowance ${allowance}`);

        // const transferFrom = await tokenInstance.transferFrom(marketMaker, optionInstance.address, 1000);

        // receipt = transferFrom.receipt;

        // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
        // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

        // allowance = await tokenInstance.allowance(marketMaker, optionInstance.address);

        // console.log(` * Allowance ${allowance}`);

        // console.log(' = = = = = = = = = = = = = = = = = = ');

        //     async (/* done */) => {

        //         let receipt, transfer, totalSupply, adminBalance, buyerBalance;

        //         totalSupply = await tokenInstance.totalSupply();
        //         assert.equal(totalSupply, 284, 'total supply is not \'284\'');

        //         adminBalance = await tokenInstance.balanceOf(tokenAdmin);
        //         assert.equal(adminBalance, 284, 'admin balance is not \'284\'');

        //         // TODO: Transfer tokens to the smart contract
        //         // transfer = await tokenInstance.transfer(tokenBuyer, 12, { from: tokenAdmin, gasPrice: 400 });

        //         // console.log(` * ${totalSupply}`);
        //         // console.log(` * ${adminBalance}`);

        //         // receipt = transfer.receipt;

        //         // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
        //         // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

        //         // for (let log in transfer.logs) {
        //         //     console.log(` * Log ${log.event}`);
        //         // }

        //         // adminBalance = await tokenInstance.balanceOf(tokenAdmin);
        //         // buyerBalance = await tokenInstance.balanceOf(tokenBuyer);

        //         // console.log(` * ${buyerBalance}`);
        //         // console.log(` * ${adminBalance}`);

        //         // assert.equal(buyerBalance, 12, 'buyer balance is not \'12\'');
        //         // assert.equal(adminBalance, 272, 'admin balance is not \'272\'');
        //     });

        // it('...should have transfered correct amount',
        //     async (/* done */) => {

        //         let adminBalance;

        //         adminBalance = await tokenInstance.balanceOf(tokenAdmin);
        //     });
    });
});
