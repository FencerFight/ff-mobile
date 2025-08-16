export const TOURNAMENT_ADDRESS = process.env.EXPO_PUBLIC_TOURNAMENT as string

export const TOURNAMENT_ABI = [
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
          "internalType": "uint256",
          "name": "nominationId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "fightId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "winner",
          "type": "address"
        }
      ],
      "name": "FightConfirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "nominationId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "fightId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "fighter1",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "fighter2",
          "type": "address"
        }
      ],
      "name": "FightCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "weaponId",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "nominationId",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "fighter1",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "fighter2",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "win1",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "win2",
          "type": "uint256"
        }
      ],
      "name": "FightRecorded",
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
          "internalType": "address",
          "name": "judge",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "action",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "JudgeActionLogged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "judge",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "JudgeAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "judge",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "JudgeRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "metadataCID",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "cityId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "countryId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "date",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "TournamentCreated",
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
      "name": "achievementSBT",
      "outputs": [
        {
          "internalType": "contract AchievementSBT",
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
          "name": "judge",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "addJudge",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "weaponTypeId",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "addNomination",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_type",
          "type": "string"
        }
      ],
      "name": "addWeaponType",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "badgesURI",
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
      "inputs": [
        {
          "internalType": "uint8",
          "name": "weaponId",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "nominationId",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "fighter1",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "fighter2",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "wins1",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "wins2",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "confirmFight",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_metadataCID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_cityId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_countryId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_date",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_nominationsPacked",
          "type": "bytes"
        }
      ],
      "name": "createTournament",
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
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "fights",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "nominationId",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "fighter1",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "fighter2",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "confirmed",
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
          "name": "tournamentId",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "nominationId",
          "type": "uint8"
        },
        {
          "internalType": "address[3]",
          "name": "winners",
          "type": "address[3]"
        }
      ],
      "name": "finishTournament",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "id",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "getNomination",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        },
        {
          "internalType": "enum Fencer.Gender",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[]",
          "name": "weaponIds",
          "type": "uint8[]"
        }
      ],
      "name": "getNominations",
      "outputs": [
        {
          "internalType": "string[][]",
          "name": "names",
          "type": "string[][]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "nominationId",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "getParticipants",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "fighter1",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "fighter2",
              "type": "address"
            }
          ],
          "internalType": "struct Tournament.Pairs[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "getTournament",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "metadataCID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "cityId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "countryId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "nameId",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "max",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "participants",
                  "type": "address[]"
                },
                {
                  "internalType": "address[3]",
                  "name": "winners",
                  "type": "address[3]"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "fighter1",
                      "type": "address"
                    },
                    {
                      "internalType": "uint8",
                      "name": "wins1",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "fighter2",
                      "type": "address"
                    },
                    {
                      "internalType": "uint8",
                      "name": "wins2",
                      "type": "uint8"
                    }
                  ],
                  "internalType": "struct Tournament.Pair[]",
                  "name": "pairs",
                  "type": "tuple[]"
                },
                {
                  "internalType": "string",
                  "name": "badgeURI",
                  "type": "string"
                },
                {
                  "internalType": "uint8",
                  "name": "weaponId",
                  "type": "uint8"
                },
                {
                  "internalType": "enum Fencer.Gender",
                  "name": "gender",
                  "type": "uint8"
                }
              ],
              "internalType": "struct Tournament.Nomination[]",
              "name": "nominations",
              "type": "tuple[]"
            },
            {
              "internalType": "address[]",
              "name": "judges",
              "type": "address[]"
            }
          ],
          "internalType": "struct Tournament.TournamentInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTournaments",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "metadataCID",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "cityId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "countryId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "nameId",
                  "type": "uint8"
                },
                {
                  "internalType": "uint8",
                  "name": "max",
                  "type": "uint8"
                },
                {
                  "internalType": "address[]",
                  "name": "participants",
                  "type": "address[]"
                },
                {
                  "internalType": "address[3]",
                  "name": "winners",
                  "type": "address[3]"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "fighter1",
                      "type": "address"
                    },
                    {
                      "internalType": "uint8",
                      "name": "wins1",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "fighter2",
                      "type": "address"
                    },
                    {
                      "internalType": "uint8",
                      "name": "wins2",
                      "type": "uint8"
                    }
                  ],
                  "internalType": "struct Tournament.Pair[]",
                  "name": "pairs",
                  "type": "tuple[]"
                },
                {
                  "internalType": "string",
                  "name": "badgeURI",
                  "type": "string"
                },
                {
                  "internalType": "uint8",
                  "name": "weaponId",
                  "type": "uint8"
                },
                {
                  "internalType": "enum Fencer.Gender",
                  "name": "gender",
                  "type": "uint8"
                }
              ],
              "internalType": "struct Tournament.Nomination[]",
              "name": "nominations",
              "type": "tuple[]"
            },
            {
              "internalType": "address[]",
              "name": "judges",
              "type": "address[]"
            }
          ],
          "internalType": "struct Tournament.TournamentInfo[]",
          "name": "result",
          "type": "tuple[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWeaponTypes",
      "outputs": [
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
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasJudges",
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
          "internalType": "address",
          "name": "_platformGovernance",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_fencer",
          "type": "address"
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "judgeLogs",
      "outputs": [
        {
          "internalType": "address",
          "name": "judge",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "action",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
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
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "nominationParticipants",
      "outputs": [
        {
          "internalType": "address",
          "name": "fighter1",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "fighter2",
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
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "nominationsNames",
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
      "name": "platformGovernance",
      "outputs": [
        {
          "internalType": "contract IPlatformGovernance",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "platformGovernanceAddress",
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
      "inputs": [
        {
          "internalType": "uint8",
          "name": "nominationId",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "registerParticipant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "judge",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "removeJudge",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "weaponTypeId",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "removeNomination",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "participantAddress",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "nominationId",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "tournamentId",
          "type": "uint256"
        }
      ],
      "name": "removeParticipant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "removeWeaponType",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_achievement",
          "type": "address"
        }
      ],
      "name": "setAchievementSBT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tournamentCount",
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
      "name": "tournaments",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "metadataCID",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "cityId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "countryId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "date",
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "weaponTypes",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]