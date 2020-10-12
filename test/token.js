const Token = artifacts.require('assets/Token.sol');

contract('Token', (accounts) => {
    describe('a deployed contract', () => {
        let tokenInstance, tokenAdmin, tokenBuyer = {};

        before(async () => {
            tokenAdmin = accounts[0];
            tokenBuyer = accounts[1];

            // tokenInstance = await Token.deployed();
            tokenInstance = await Token.new(284, { from: tokenAdmin, gasPrice: 400 });
        });

        it('...should have expected total supply',
            async (/* done */) => {

                let receipt, transfer, totalSupply, adminBalance, buyerBalance;

                totalSupply = await tokenInstance.totalSupply();
                assert.equal(totalSupply, 284, 'total supply is not \'284\'');

                adminBalance = await tokenInstance.balanceOf(tokenAdmin);
                assert.equal(adminBalance, 284, 'admin balance is not \'284\'');

                transfer = await tokenInstance.transfer(tokenBuyer, 12, { from: tokenAdmin, gasPrice: 400 });

                console.log(` * ${totalSupply}`);
                console.log(` * ${adminBalance}`);

                receipt = transfer.receipt;

                console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
                // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

                for (let log in transfer.logs) {
                    console.log(` * Log ${log}`);
                }

                adminBalance = await tokenInstance.balanceOf(tokenAdmin);
                buyerBalance = await tokenInstance.balanceOf(tokenBuyer);

                console.log(` * ${buyerBalance}`);
                console.log(` * ${adminBalance}`);

                assert.equal(buyerBalance, 12, 'buyer balance is not \'12\'');
                assert.equal(adminBalance, 272, 'admin balance is not \'272\'');
            });
    });
});
