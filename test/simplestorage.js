const FunRunner = artifacts.require('FunRunner.sol');
const SimpleStorage = artifacts.require('SimpleStorage.sol');

contract("SimpleStorage", accounts => {
    describe('a deployed contract', () => {
        let ownerAddr, runnerAddr;

        before(async () => {

            // let receipt, allowance = {};

            ownerAddr = accounts[0];
            runnerAddr = accounts[1];

            console.log(` * Owner Address: ${ownerAddr}`);
            console.log(` * Runner Address: ${runnerAddr}`);

            storageInstance = await SimpleStorage.new({ from: ownerAddr, gasPrice: 400 });
            runnerInstance = await FunRunner.new(storageInstance.address, { from: runnerAddr, gasPrice: 400 });

            console.log(` * Fun Runner Address: ${runnerInstance.address.substring(0, 8)}`);
            console.log(` * Fun Runner Transaction Hash: ${runnerInstance.transactionHash.substring(0, 8)}`);

            console.log(` * Simple Storage Address: ${storageInstance.address.substring(0, 8)}`);
            console.log(` * Simple StorageTransaction Hash: ${storageInstance.transactionHash.substring(0, 8)}`);
        });

        it('...should store and read data', async () => {

            const set = await runnerInstance.set(12);

            receipt = set.receipt;

            console.log(` * Set Block Hash ${receipt.blockHash.substring(0, 8)}`);
            console.log(` * Set Transaction Hash ${receipt.transactionHash.substring(0, 8)}`);

            const get = await runnerInstance.get();

            console.log(` * Get: ${get}`);

            const setAndGet = await runnerInstance.setAndGet(8);

            receipt = setAndGet.receipt;

            console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
            console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);

            // const approve = await tokenInstance.approve(optionInstance.address, 100, { from: marketMaker, gasPrice: 400 });

            // receipt = approve.receipt;

            // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
            // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
        });

        it("...should store the value 89.", async () => {
            // const simpleStorageInstance = await SimpleStorage.deployed();

            // // Set value of 89
            // await simpleStorageInstance.set(89, { from: accounts[0] });

            // // Get stored value
            // const storedData = await simpleStorageInstance.get.call();

            // assert.equal(storedData, 89, "The value 89 was not stored.");
        });
    });
});
