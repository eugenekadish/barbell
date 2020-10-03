pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./TrustRelationship.sol";

contract Identity is TrustRelationship {

    address public OwnerKey;
    uint public CreationBlock;

    bytes public Metadata;
    string public Encoding;

    string public constant VERSION = "6.1.0";

    event ContractCreatedEvent(
         address indexed ownerKey, uint creationBlock
    );

    modifier isOwner() {
        require (
            msg.sender == OwnerKey,
            "caller is not the Contract Owner"
        );

        _;
    }

    constructor (
        string memory encoding, bytes memory metadata
    ) public {

        // TODO: put checks on input into a modifier

        require(
            bytes(encoding).length > 0,
            "nonempty encoding required"
        );

        Encoding = encoding;
        Metadata = metadata;

        OwnerKey = msg.sender;
        CreationBlock = block.number;

        emit ContractCreatedEvent(msg.sender, block.number);
    }

    function createTrustRelationship(
        string memory badgeID, address signingKey, string[] memory attrIDs,
        string memory encoding, bytes memory metadata
    ) public isOwner() {

        require(
            bytes(encoding).length > 0,
            "nonempty encoding required"
        );

        require(
            signingKey != address(0),
            "invalid key set for signer"
        );

        string memory attrID;
        Badge storage b = Badges[badgeID];

        address storedKey = b.signingKey;
        uint length = b.attributeList.length;

        // all stored attributes have to be deleted explicitly
        for (uint i = 0; i < length; i++) {
            attrID = b.attributeList[i];

            delete b.attributes[attrID];
        }

        if (storedKey == address(0)) {
            badgesList.push(badgeID);
        }

        delete Badges[badgeID];
        b = Badges[badgeID];

        b.metadata = metadata;
        b.encoding = encoding;

        b.signingKey = signingKey;
        b.state = SignatureStates.PENDING;

        // string memory attrID;
        length = attrIDs.length;
        for (uint i = 0; i < length; i++) {
            attrID = attrIDs[i];
            b.attributeList.push(attrID);

            Attribute storage a = b.attributes[attrID];
            a.shared = true;
        }

        emit TrustRelationshipCreatedEvent(
            msg.sender, signingKey, badgeID, block.number
        );
    }

    function verifyTrustRelationship(
        string memory badgeID, string[4][] memory checkedData, // Attestation[] memory checkedData,
        bytes[] memory checkedMetaData
    ) public isTrustedSigner(badgeID) {

        Badge storage b = Badges[badgeID];

        string memory attrID;
        string[4] memory tmp;

        Attestation memory att;
        uint length = checkedData.length;

        require(
            b.attributeList.length == length,
            "attributes input list is incorrect"
        );

        require(
            b.state != SignatureStates.VERIFIED,
            "badge has already been verified"
        );

        string memory proof;
        bool verify = true;

        for (uint i = 0; i < length; i++) {
            tmp = checkedData[i];
            att = Attestation(
                tmp[0], tmp[1], tmp[2], checkedMetaData[i], tmp[3]
            );

            attrID = att.attrID;
            Attribute storage a = b.attributes[attrID];

            require(
                a.shared,
                "attribute does not exist"
            );

            proof = att.proof;
            if (bytes(proof).length == 0) {
                verify = false;
            }

            a.proof = proof;
            a.hashAlgo = att.hashAlgo;
        }

        // NOTE: The require statements in this method ensure that only all the
        // shared attributes can be attested by the trusted signer.
        if (verify) {
            b.state = SignatureStates.VERIFIED;
        }

        string memory bID = badgeID; // NOTE: Not sure why the compiler requires this?
        address signingKey = b.signingKey;

        emit TrustRelationshipSignEvent(
            msg.sender, signingKey, bID, b.state, block.number
        );
    }

    function rejectTrustRelationship(
        string memory badgeID
    ) public isTrustedSigner(badgeID) {

        Badge storage b = Badges[badgeID];
        address signingKey = b.signingKey;

        require( // QUESTION: Does the state have to PENDING?
            b.state == SignatureStates.PENDING,
            "badge is not in a compatible state"
        );

        b.state = SignatureStates.REJECTED;
        emit TrustRelationshipSignEvent(
            msg.sender, signingKey, badgeID, b.state, block.number
        );
    }

    function terminateTrustRelationship(
        string memory badgeID, string memory encoding, bytes memory metadata
    ) public {

        Badge storage b = Badges[badgeID];
        address storedKey = b.signingKey;

        require(
            msg.sender == OwnerKey || msg.sender == storedKey,
            "AccessDenied: Caller is not designated to change this state!"
        );

        b.metadata = metadata;
        b.encoding = encoding;

        b.state = SignatureStates.TERMINATED;
        emit TrustRelationshipSignEvent(
            msg.sender, storedKey, badgeID, b.state, block.number
        );
    }

    function appendAttribute(
        string memory badgeID, string memory attrID
    ) public isOwner() {

        Badge storage b = Badges[badgeID];
        address storedKey = b.signingKey;

        require(
            storedKey != address(0),
            "cannot add attribute to empty badge"
        );

        Attribute storage a = b.attributes[attrID];

        require(
            !a.shared,
            "cannot add attribute that already exists"
        );

        a.shared = true;
        b.attributeList.push(attrID);

        b.state = SignatureStates.PENDING;
        emit AttributeProofChangeEvent(
            msg.sender, storedKey, attrID, badgeID, block.number
        );
    }

    function resetAttribute(
        string calldata attrID
    ) external isOwner() {

        address signingKey;
        string memory badgeID;

        string memory aID = attrID;
        uint length = badgesList.length;

        for (uint i = 0; i < length; i++) {

            badgeID = badgesList[i];
            Badge storage b = Badges[badgeID];
            Attribute storage a = b.attributes[aID];

            if (!a.shared) {
                // If the attribute is not part of the badge in this loop
                // iteration, do nothing.

                continue;
            }

            // Note: "delete a" would not be valid here as assignments to local
            // variables referencing storage objects can only be made from
            // existing storage objects.
            delete b.attributes[aID];

            a.shared = true;
            signingKey = b.signingKey;
            b.state = SignatureStates.PENDING;

            emit BadgeStateResetEvent(
                msg.sender, signingKey, aID, badgeID, block.number
            );

            emit AttributeProofChangeEvent(
                msg.sender, signingKey, aID, badgeID, block.number
            );
        }
    }

    function fullAttribute(
        string calldata badgeID, string calldata attrID
    ) external view returns (Attribute memory) {
        return Badges[badgeID].attributes[attrID];
    }

    function attributeBadgeList(
        string calldata attrID
    ) external view returns (string[] memory tmpBadgesList) {

        uint ct;
        uint length;

        string memory badgeID;
        string memory aID = attrID;

        length = badgesList.length;
        for (uint i = 0; i < length; i++) {

            badgeID = badgesList[i];
            Badge storage b = Badges[badgeID];
            Attribute storage a = b.attributes[aID];

            if (a.shared) {
                ct += 1;
            }
        }

        tmpBadgesList = new string[](ct);

        length = tmpBadgesList.length;
        for (uint i = 0; i < length; i++) {

            badgeID = badgesList[i];
            Badge storage b = Badges[badgeID];
            Attribute storage a = b.attributes[aID];

            if (a.shared) {
                tmpBadgesList[i] = badgeID;
            }
        }

        return tmpBadgesList;
    }

    function fullBadge(
        string calldata badgeID
    ) external view returns (BadgeView memory) {
        Badge storage b = Badges[badgeID];

        return BadgeView(
            b.metadata, b.encoding, b.signingKey, b.state, b.attributeList
        );
    }
}
