export const GOVERNANCE_ADDRESS = process.env.EXPO_PUBLIC_GOVERNANCE as string

export const GOVERNANCE_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        }
      ],
      "name": "AddressEmptyCode",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "ERC1967InvalidImplementation",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ERC1967NonPayable",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "FailedCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidInitialization",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotInitializing",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "UUPSUnauthorizedCallContext",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "slot",
          "type": "bytes32"
        }
      ],
      "name": "UUPSUnsupportedProxiableUUID",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "admin",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "added",
          "type": "bool"
        }
      ],
      "name": "AdminUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "version",
          "type": "uint64"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum PlatformGovernance.ProposalType",
          "name": "pType",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        }
      ],
      "name": "ProposalAdminCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "UpgradeAuthorized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "implementation",
          "type": "address"
        }
      ],
      "name": "Upgraded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "enum PlatformGovernance.ProposalCategory",
          "name": "category",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "support",
          "type": "bool"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "QUORUM",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "UPGRADE_INTERFACE_VERSION",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "VOTE_DURATION",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "admins",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_candidate",
          "type": "address"
        },
        {
          "internalType": "enum PlatformGovernance.ProposalType",
          "name": "_pType",
          "type": "uint8"
        }
      ],
      "name": "createProposalAdmin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "_weaponTypeId",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_nominationId",
          "type": "uint8"
        },
        {
          "internalType": "enum PlatformGovernance.ProposalType",
          "name": "_pType",
          "type": "uint8"
        }
      ],
      "name": "createProposalTypes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "executeProposalAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "executeProposalType",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fencer",
      "outputs": [
        {
          "internalType": "contract Fencer",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "end",
          "type": "uint256"
        }
      ],
      "name": "getActiveAdminProposals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "candidate",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PlatformGovernance.ProposalType",
                  "name": "pType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "proponent",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "votesYes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesNo",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "deadline",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "executed",
                  "type": "bool"
                }
              ],
              "internalType": "struct PlatformGovernance.BaseProposal",
              "name": "base",
              "type": "tuple"
            }
          ],
          "internalType": "struct PlatformGovernance.ProposalAdmin[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getActiveAdminProposalsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "end",
          "type": "uint256"
        }
      ],
      "name": "getActiveTypeProposals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "weaponTypeId",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "nominationId",
              "type": "uint8"
            },
            {
              "components": [
                {
                  "internalType": "enum PlatformGovernance.ProposalType",
                  "name": "pType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "proponent",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "votesYes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesNo",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "deadline",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "executed",
                  "type": "bool"
                }
              ],
              "internalType": "struct PlatformGovernance.BaseProposal",
              "name": "base",
              "type": "tuple"
            }
          ],
          "internalType": "struct PlatformGovernance.ProposalAddType[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getActiveTypeProposalsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAdmins",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "end",
          "type": "uint256"
        }
      ],
      "name": "getPastAdminProposals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "candidate",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PlatformGovernance.ProposalType",
                  "name": "pType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "proponent",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "votesYes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesNo",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "deadline",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "executed",
                  "type": "bool"
                }
              ],
              "internalType": "struct PlatformGovernance.BaseProposal",
              "name": "base",
              "type": "tuple"
            }
          ],
          "internalType": "struct PlatformGovernance.ProposalAdmin[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPastAdminProposalsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "start",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "end",
          "type": "uint256"
        }
      ],
      "name": "getPastTypeProposals",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "title",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "weaponTypeId",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "nominationId",
              "type": "uint8"
            },
            {
              "components": [
                {
                  "internalType": "enum PlatformGovernance.ProposalType",
                  "name": "pType",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "proponent",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "votesYes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "votesNo",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "deadline",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "executed",
                  "type": "bool"
                }
              ],
              "internalType": "struct PlatformGovernance.BaseProposal",
              "name": "base",
              "type": "tuple"
            }
          ],
          "internalType": "struct PlatformGovernance.ProposalAddType[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPastTypeProposalsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "fencerAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tournamentAddress",
          "type": "address"
        }
      ],
      "name": "initAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "initialAdmins",
          "type": "address[]"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isAdmin",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposalsAdmin",
      "outputs": [
        {
          "internalType": "address",
          "name": "candidate",
          "type": "address"
        },
        {
          "components": [
            {
              "internalType": "enum PlatformGovernance.ProposalType",
              "name": "pType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "proponent",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "votesYes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votesNo",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            }
          ],
          "internalType": "struct PlatformGovernance.BaseProposal",
          "name": "base",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposalsTypes",
      "outputs": [
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "weaponTypeId",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "nominationId",
          "type": "uint8"
        },
        {
          "components": [
            {
              "internalType": "enum PlatformGovernance.ProposalType",
              "name": "pType",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "proponent",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "votesYes",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "votesNo",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "deadline",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            }
          ],
          "internalType": "struct PlatformGovernance.BaseProposal",
          "name": "base",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "proxiableUUID",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tournament",
      "outputs": [
        {
          "internalType": "contract Tournament",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tournamentContract",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newImplementation",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "upgradeToAndCall",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum PlatformGovernance.ProposalCategory",
          "name": "category",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "support",
          "type": "bool"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "enum PlatformGovernance.ProposalCategory",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "voted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "weaponsContract",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]