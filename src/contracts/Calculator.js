export const calculatorAddress = "0x9738F3D26793e52573CF8Ed94bF5fe175380e1Ac"

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
				"name": "Operation",
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