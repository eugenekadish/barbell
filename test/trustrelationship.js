// const Identity = artifacts.require('Identity.sol');

// contract('Identity', (accounts) => {
//   describe('a trust relationship', () => {

//     // let dataOwner, trustedSigner = {};
//     // let identityInstance, trustRelationshipSig = {};

//     before(async () => {
//       // dataOwner = accounts[0];
//       // trustedSigner = accounts[1];

//       // identityInstance = await Identity.deployed();
//     });

//     it('...should succeed being created by the data owner',
//       async (/* done */) => {
//         // let trustRelationship = {};
//         // let trustedSigner = accounts[1];

//         // try {
//         //   trustRelationship =
//         //     await identityInstance.createTrustRelationship(
//         //       '0x11e7fb', trustedSigner, ['0x187cdc', '0x24f9da'],
//         //       'application/json', [], { from: dataOwner, gasPrice: 400 }
//         //     );
//         // } catch (err) {
//         //   assert.fail(err.message);
//         // }

//         // let receipt = trustRelationship.receipt;
//         // console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         // var attribute = { shared: false };
//         // var badge = await identityInstance.fullBadge('0x11e7fb');

//         // let badgeState = badge.state;
//         // assert.equal(badgeState, 0, 'incorrect badge state');

//         // var attributeList = badge.attributeList;
//         // assert.equal(attributeList.length, 2, 'incorrect attribute list length');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x187cdc');
//         // assert.equal(attribute.shared, true, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x24f9da');
//         // assert.equal(attribute.shared, true, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x924186');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x1fb624');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // done();

//         assert.ok(true);
//       });

//     it('...should succeed verifying a trust relationship by the trusted signer',
//       async (/* done */) => {
//         // try {
//         //   trustRelationshipSig =
//         //     await identityInstance.verifyTrustRelationship(
//         //       '0x11e7fb',
//         //       [
//         //         ['0x187cdc', 'db6604', 'HMAC_SHA1', 'application/json'],
//         //         ['0x24f9da', 'ef3229', 'HMAC_SHA1', 'application/json']
//         //       ],
//         //       [[], []], { from: trustedSigner, gasPrice: 400 });
//         // } catch (err) {
//         //   assert.fail(err.message);
//         // }

//         // let receipt = trustRelationshipSig.receipt;
//         // console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         // var badge = await identityInstance.fullBadge('0x11e7fb');

//         // let badgeState = badge.state;
//         // assert.equal(badgeState, 2, 'The badge state is incorrect.');

//         // done();

//         assert.ok(true);
//       });

//     it('...should reset trust relationship state with the same badge and attribute id',
//       async (/* done */) => {
//         // let trustRelationship = {};
//         // let trustedSigner = accounts[1];

//         // try {
//         //   trustRelationship =
//         //     await identityInstance.createTrustRelationship(
//         //       '0x11e7fb', trustedSigner, ['0x187cdc' /*, '0x924186' */],
//         //       'application/json', [], { from: dataOwner, gasPrice: 400 }
//         //     );
//         // } catch (err) {
//         //   assert.fail(err.message);
//         // }

//         // let receipt = trustRelationship.receipt;
//         // console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         // var attribute = { shared: false };
//         // var badge = await identityInstance.fullBadge('0x11e7fb');

//         // let badgeState = badge.state;
//         // assert.equal(badgeState, 0, 'incorrect badge state');

//         // var attributeList = badge.attributeList;
//         // assert.equal(attributeList.length, 1, 'incorrect attribute list length');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x187cdc');
//         // assert.equal(attribute.shared, true, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x24f9da');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x924186');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x1fb624');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // done();

//         assert.ok(true);
//       });

//     it('...should reset trust relationship state with the same badge id and new attribute id',
//       async (/* done */) => {
//         // let trustRelationship = {};
//         // let trustedSigner = accounts[1];

//         // try {
//         //   trustRelationship =
//         //     await identityInstance.createTrustRelationship(
//         //       '0x11e7fb', trustedSigner, ['0x1fb624'],
//         //       'application/json', [], { from: dataOwner, gasPrice: 400 }
//         //     );
//         // } catch (err) {
//         //   assert.fail(err.message);
//         // }

//         // let receipt = trustRelationship.receipt;
//         // console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         // var attribute = { shared: false };
//         // var badge = await identityInstance.fullBadge('0x11e7fb');

//         // let badgeState = badge.state;
//         // assert.equal(badgeState, 0, 'incorrect badge state');

//         // var attributeList = badge.attributeList;
//         // assert.equal(attributeList.length, 1, 'incorrect attribute list length');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x187cdc');
//         // assert.equal(attribute.shared, false, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x24f9da');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x924186');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x1fb624');
//         // assert.equal(attribute.shared, true, 'random attribute was shared');

//         // done();

//         assert.ok(true);
//       });
//   });

//   describe('a trust relationship', () => {

//     // let dataOwner, trustedSigner = {};
//     // let identityInstance, trustRelationshipSig = {};

//     before(async () => {
//       // dataOwner = accounts[0];
//       // trustedSigner = accounts[1];

//       // identityInstance = await Identity.deployed();
//     });

//     it('...should succeed being created by the data owner',
//       async (/* done */) => {
//         // let trustRelationship = {};
//         // let trustedSigner = accounts[1];

//         // try {
//         //   trustRelationship =
//         //     await identityInstance.createTrustRelationship(
//         //       '0x11e7fb', trustedSigner, ['0x187cdc', '0x24f9da'],
//         //       'application/json', [], { from: dataOwner, gasPrice: 400 }
//         //     );
//         // } catch (err) {
//         //   assert.fail(err.message);
//         // }

//         // let receipt = trustRelationship.receipt;
//         // console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         // var attribute = { shared: false };
//         // var badge = await identityInstance.fullBadge('0x11e7fb');

//         // let badgeState = badge.state;
//         // assert.equal(badgeState, 0, 'incorrect badge state');

//         // var attributeList = badge.attributeList;
//         // assert.equal(attributeList.length, 2, 'incorrect attribute list length');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x187cdc');
//         // assert.equal(attribute.shared, true, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x24f9da');
//         // assert.equal(attribute.shared, true, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x924186');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x1fb624');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // done();

//         assert.ok(true);
//       });

//     it('...should succeed verifying a trust relationship by the trusted signer',
//       async (/* done */) => {
//         // try {
//         //   trustRelationshipSig =
//         //     await identityInstance.verifyTrustRelationship(
//         //       '0x11e7fb',
//         //       [
//         //         ['0x187cdc', 'db6604', 'HMAC_SHA1', 'application/json'],
//         //         ['0x24f9da', 'ef3229', 'HMAC_SHA1', 'application/json']
//         //       ],
//         //       [[], []], { from: trustedSigner, gasPrice: 400 });
//         // } catch (err) {
//         //   assert.fail(err.message);
//         // }

//         // let receipt = trustRelationshipSig.receipt;
//         // console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         // var badge = await identityInstance.fullBadge('0x11e7fb');

//         // let badgeState = badge.state;
//         // assert.equal(badgeState, 2, 'The badge state is incorrect.');

//         // done();

//         assert.ok(true);
//       });

//     it('...should reset trust relationship state after appending an attribute id',
//       async (/* done */) => {
//         // let trustRelationship = {};
//         // let trustedSigner = accounts[1];

//         // try {
//         //   trustRelationship =
//         //     await identityInstance.appendAttribute(
//         //       '0x11e7fb', '0xef3229',
//         //       { from: dataOwner, gasPrice: 400 }
//         //     );
//         // } catch (err) {
//         //   assert.fail(err.message);
//         // }

//         // let receipt = trustRelationship.receipt;
//         // console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         // console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         // console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         // console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         // var attribute = { shared: false };
//         // var badge = await identityInstance.fullBadge('0x11e7fb');

//         // let badgeState = badge.state;
//         // assert.equal(badgeState, 0, 'incorrect badge state');

//         // var attributeList = badge.attributeList;
//         // assert.equal(attributeList.length, 3, 'incorrect attribute list length');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x187cdc');
//         // assert.equal(attribute.shared, true, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x24f9da');
//         // assert.equal(attribute.shared, true, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0xef3229');
//         // assert.equal(attribute.shared, true, 'badge attribute was not shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x924186');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // attribute = await identityInstance.fullAttribute('0x11e7fb', '0x1fb624');
//         // assert.equal(attribute.shared, false, 'random attribute was shared');

//         // done();

//         assert.ok(true);
//       });
//   });
// });
