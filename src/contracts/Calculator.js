export const calculatorAddress = "0x18Da78627DBA05E217CF9B9d9dc5A0250E294825"

export const calculatorAbi =  [
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "sarahroAddress",
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
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "int256",
						"name": "res",
						"type": "int256"
					}
				],
				"name": "Added",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "int256",
						"name": "res",
						"type": "int256"
					}
				],
				"name": "Divided",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "int256",
						"name": "res",
						"type": "int256"
					}
				],
				"name": "Moduled",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "int256",
						"name": "res",
						"type": "int256"
					}
				],
				"name": "Muled",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "previousOwner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "newOwner",
						"type": "address"
					}
				],
				"name": "OwnershipTransferred",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "int256",
						"name": "res",
						"type": "int256"
					}
				],
				"name": "Subbed",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "int16",
						"name": "nb1",
						"type": "int16"
					},
					{
						"internalType": "int16",
						"name": "nb2",
						"type": "int16"
					}
				],
				"name": "add",
				"outputs": [
					{
						"internalType": "int16",
						"name": "",
						"type": "int16"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "int16",
						"name": "nb1",
						"type": "int16"
					},
					{
						"internalType": "int16",
						"name": "nb2",
						"type": "int16"
					}
				],
				"name": "div",
				"outputs": [
					{
						"internalType": "int16",
						"name": "",
						"type": "int16"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "int16",
						"name": "nb1",
						"type": "int16"
					},
					{
						"internalType": "int16",
						"name": "nb2",
						"type": "int16"
					}
				],
				"name": "mod",
				"outputs": [
					{
						"internalType": "int16",
						"name": "",
						"type": "int16"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "int16",
						"name": "nb1",
						"type": "int16"
					},
					{
						"internalType": "int16",
						"name": "nb2",
						"type": "int16"
					}
				],
				"name": "mul",
				"outputs": [
					{
						"internalType": "int16",
						"name": "",
						"type": "int16"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "owner",
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
				"name": "renounceOwnership",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "seeProfit",
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
						"internalType": "int16",
						"name": "nb1",
						"type": "int16"
					},
					{
						"internalType": "int16",
						"name": "nb2",
						"type": "int16"
					}
				],
				"name": "sub",
				"outputs": [
					{
						"internalType": "int16",
						"name": "",
						"type": "int16"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "newOwner",
						"type": "address"
					}
				],
				"name": "transferOwnership",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		]