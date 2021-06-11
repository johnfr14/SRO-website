export const calculatorAddress = "0x64d2a88F5b76AE17Df2C1cb9cA2011037C2f6181"

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
						"internalType": "int256",
						"name": "nb1",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "nb2",
						"type": "int256"
					}
				],
				"name": "add",
				"outputs": [
					{
						"internalType": "int256",
						"name": "",
						"type": "int256"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "int256",
						"name": "nb1",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "nb2",
						"type": "int256"
					}
				],
				"name": "div",
				"outputs": [
					{
						"internalType": "int256",
						"name": "",
						"type": "int256"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "int256",
						"name": "nb1",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "nb2",
						"type": "int256"
					}
				],
				"name": "mod",
				"outputs": [
					{
						"internalType": "int256",
						"name": "",
						"type": "int256"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "int256",
						"name": "nb1",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "nb2",
						"type": "int256"
					}
				],
				"name": "mul",
				"outputs": [
					{
						"internalType": "int256",
						"name": "",
						"type": "int256"
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
						"internalType": "int256",
						"name": "nb1",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "nb2",
						"type": "int256"
					}
				],
				"name": "sub",
				"outputs": [
					{
						"internalType": "int256",
						"name": "",
						"type": "int256"
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

