pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract TrustRelationship {

    struct Attestation {
        string attrID;

        string proof;
        string hashAlgo;

        bytes metadata;
        string encoding;
    }

    struct Attribute {
        bytes metadata;
        string encoding;

        string proof;
        string hashAlgo;

        bool shared;
    }

    string[] badgesList;
    enum SignatureStates { PENDING, REJECTED, VERIFIED, VALID, TERMINATED }

    struct BadgeView {
        bytes metadata;
        string encoding;
        address signingKey;

        SignatureStates state;
        string[] attributeList;
    }

    struct Badge {
        bytes metadata;
        string encoding;
        address signingKey;

        SignatureStates state; // default is PENDING

        string[] attributeList;
        mapping (string => Attribute) attributes;
    }

    mapping (string => Badge) Badges;

    modifier isTrustedSigner(string memory badgeID) {
        Badge storage b = Badges[badgeID];

        require (
            msg.sender == b.signingKey,
            "AccessDenied: Caller is not the designated Trusted Signer!"
        );

        _;
    }

    event BadgeStateResetEvent(
        address indexed ownerKey, address indexed signingKey,
        string attrID, string badgeID, uint creationBlock
    );

    event AttributeProofChangeEvent(
        address indexed ownerKey, address indexed signingKey,
        string attrID, string badgeID, uint creationBlock
    );

    event TrustRelationshipSignEvent(
        address indexed ownerKey, address indexed signingKey,
        string badgeID, SignatureStates state, uint creationBlock
    );

    event TrustRelationshipCreatedEvent(
        address indexed ownerKey, address indexed signingKey,
        string badgeID, uint creationBlock
    );
}
