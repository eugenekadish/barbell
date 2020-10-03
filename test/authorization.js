// const Identity = artifacts.require('Identity.sol');

// contract('Identity', (accounts) => {
//   describe('the trust relationship authorization', () => {
//     let identityInstance, trustRelationshipSig = {};
//     let dataOwner, trustedSigner, faultyDataOwner = {};

//     before(async () => {
//       dataOwner = accounts[0];
//       trustedSigner = accounts[1];

//       let floorRange = Math.random() * 8;
//       let accIndex = Math.floor(floorRange) + 2;

//       faultyDataOwner = accounts[accIndex];
//       identityInstance = await Identity.deployed();
//     });

//     it('...allows it to be created by the data owner',
//       async (/* done */) => {
//         let trustRelationship = {};
//         let trustedSigner = accounts[1];

//         try {
//           trustRelationship =
//             await identityInstance.createTrustRelationship(
//               '0x11e7fb', trustedSigner, ['0x187cdc', '0x24f9da'],
//               'application/json', [], { from: dataOwner, gasPrice: 400 }
//             );
//         } catch (err) {
//           assert.fail(err.message);
//         }

//         let receipt = trustRelationship.receipt;
//         console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         var badge = await identityInstance.fullBadge('0x11e7fb');

//         let badgeState = badge.state;
//         assert.equal(badgeState, 0, 'The badge state is incorrect.');

//         // done();
//       });

//     it('...prevents it from being created by anyone except the data owner',
//       async (/* done */) => {
//         try {
//           trustRelationship =
//             await identityInstance.createTrustRelationship(
//               '0xfa9fc5', trustedSigner, ['0x187cdc', '0x24f9da'],
//               'application/json', [], { from: faultyDataOwner, gasPrice: 400 }
//             );
//         } catch (err) {
//           assert.isOk(err.message, 'trust relationship creation failed successfully');

//           return;
//         }

//         assert.fail('only the data owner can create the trust relationship');
//       });

//     it('...allows it to be verified by the trusted signer',
//       async (/* done */) => {
//         try {
//           trustRelationshipSig =
//             await identityInstance.verifyTrustRelationship(
//               '0x11e7fb',
//               [
//                 ['0x187cdc', 'db6604', 'HMAC_SHA1', 'application/json'],
//                 ['0x24f9da', 'ef3229', 'HMAC_SHA1', 'application/json']
//               ],
//               [[], []],
//               { from: trustedSigner, gasPrice: 400 }
//             );
//         } catch (err) {
//           assert.fail(err.message);
//         }

//         let receipt = trustRelationshipSig.receipt;
//         console.log(' = = = = = = = = = = Deploy Data = = = = = = = = = = ');

//         console.log(` * Block hash ${receipt.blockHash.substring(0, 8)}`);
//         console.log(` * Transaction hash ${receipt.transactionHash.substring(0, 8)}`);
//         console.log(' = = = = = = = = = = = = = = = = = = = = = = = = = = ');

//         var badge = await identityInstance.fullBadge('0x11e7fb');

//         let badgeState = badge.state;
//         assert.equal(badgeState, 2, 'The badge state is incorrect.');

//         // done();
//       });

//     it('...prevents it from being verified by anyone except the trusted signer',
//       async (/* done */) => {
//         try {
//           trustRelationshipSig =
//             await identityInstance.verifyTrustRelationship(
//               '0x11e7fb',
//               [
//                 ['0x187cdc', 'db66048c', 'HMAC_SHA1'],
//                 ['0x24f9da', 'ef322920', 'HMAC_SHA1']
//               ],
//               'application/json', [],
//               { from: faultyTrustedSigner, gasPrice: 400 }
//             );
//         } catch (err) {
//           assert.isOk(err.message, 'trust relationship signing failed successfully');

//           return;
//         }

//         assert.fail('only the trusted signer can sign the trust relationship');

//         // done();
//       });
//   });
// });
