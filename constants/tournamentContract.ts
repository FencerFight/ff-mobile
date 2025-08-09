export const TOURNAMENT_ADDRESS = process.env.EXPO_PUBLIC_TOURNAMENT as string

export const TOURNAMENT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userRegistry",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
          "indexed": true,
          "internalType": "uint256",
          "name": "weaponId",
          "type": "uint256"
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
          "name": "startTime",
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
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "badges",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "image",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "weaponId",
          "type": "uint256"
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
          "internalType": "uint256",
          "name": "win1",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "win2",
          "type": "uint256"
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
          "internalType": "uint16",
          "name": "_startTime",
          "type": "uint16"
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
      "name": "fightCountPerNom",
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
      "name": "fightIdCounter",
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
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "fighterFightIds",
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
          "internalType": "uint256",
          "name": "nominationId",
          "type": "uint256"
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
          "internalType": "enum UserRegistry.Gender",
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
              "internalType": "uint16",
              "name": "startTime",
              "type": "uint16"
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
                  "internalType": "uint8",
                  "name": "weaponId",
                  "type": "uint8"
                },
                {
                  "internalType": "enum UserRegistry.Gender",
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
              "internalType": "uint16",
              "name": "startTime",
              "type": "uint16"
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
                  "internalType": "uint8",
                  "name": "weaponId",
                  "type": "uint8"
                },
                {
                  "internalType": "enum UserRegistry.Gender",
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
          "name": "_achievement",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialized",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "nominationId",
          "type": "uint256"
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
        },
        {
          "internalType": "uint16",
          "name": "startTime",
          "type": "uint16"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "userRegistry",
      "outputs": [
        {
          "internalType": "contract UserRegistry",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]