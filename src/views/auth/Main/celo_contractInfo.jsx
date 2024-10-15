export const tokenInfo = {
	address: "0x663F81e8d049EF52E2e15BD2F947aEceEAad5f24",
	abi:[
		{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
		},
		{
		"anonymous": false,
		"inputs": [
		{
		"indexed": true,
		"internalType": "address",
		"name": "owner",
		"type": "address"
		},
		{
		"indexed": true,
		"internalType": "address",
		"name": "spender",
		"type": "address"
		},
		{
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
		}
		],
		"name": "Approval",
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
		"name": "from",
		"type": "address"
		},
		{
		"indexed": true,
		"internalType": "address",
		"name": "to",
		"type": "address"
		},
		{
		"indexed": false,
		"internalType": "uint256",
		"name": "value",
		"type": "uint256"
		}
		],
		"name": "Transfer",
		"type": "event"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "owner",
		"type": "address"
		},
		{
		"internalType": "address",
		"name": "spender",
		"type": "address"
		}
		],
		"name": "allowance",
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
		"name": "spender",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "approve",
		"outputs": [
		{
		"internalType": "bool",
		"name": "",
		"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "account",
		"type": "address"
		}
		],
		"name": "balanceOf",
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
		"name": "decimals",
		"outputs": [
		{
		"internalType": "uint8",
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
		"internalType": "address",
		"name": "spender",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "subtractedValue",
		"type": "uint256"
		}
		],
		"name": "decreaseAllowance",
		"outputs": [
		{
		"internalType": "bool",
		"name": "",
		"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "spender",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "addedValue",
		"type": "uint256"
		}
		],
		"name": "increaseAllowance",
		"outputs": [
		{
		"internalType": "bool",
		"name": "",
		"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "to",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "name",
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
		"name": "symbol",
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
		"name": "totalSupply",
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
		"name": "to",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "transfer",
		"outputs": [
		{
		"internalType": "bool",
		"name": "",
		"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "address",
		"name": "from",
		"type": "address"
		},
		{
		"internalType": "address",
		"name": "to",
		"type": "address"
		},
		{
		"internalType": "uint256",
		"name": "amount",
		"type": "uint256"
		}
		],
		"name": "transferFrom",
		"outputs": [
		{
		"internalType": "bool",
		"name": "",
		"type": "bool"
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
}
export const contractInfo = {
	address: "0xab7D9CDAb013996fC54BBb587D597f16d6445981",
	abi: [
		{
		"inputs": [
		{
		"internalType": "uint256",
		"name": "amountinusdc",
		"type": "uint256"
		},
		{
		"internalType": "uint256",
		"name": "amountinGR",
		"type": "uint256"
		}
		],
		"name": "BuyGR",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [
		{
		"internalType": "uint256",
		"name": "_slotId",
		"type": "uint256"
		}
		],
		"name": "buyWithUSDC",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		},
		{
		"inputs": [
		{
		"internalType": "contract IERC20",
		"name": "_usdc",
		"type": "address"
		},
		{
		"internalType": "contract IERC20",
		"name": "_GauRaksha",
		"type": "address"
		},
		{
		"internalType": "address payable",
		"name": "_ownersAddress",
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
		"internalType": "uint256[]",
		"name": "price",
		"type": "uint256[]"
		}
		],
		"name": "setslotPriceInUSDC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "withdrawGauRaksha",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
		},
		{
		"stateMutability": "payable",
		"type": "receive"
		},
		{
		"inputs": [],
		"name": "BNB",
		"outputs": [
		{
		"internalType": "contract IERC20",
		"name": "",
		"type": "address"
		}
		],
		"stateMutability": "view",
		"type": "function"
		},
		{
		"inputs": [],
		"name": "GauRaksha",
		"outputs": [
		{
		"internalType": "contract IERC20",
		"name": "",
		"type": "address"
		}
		],
		"stateMutability": "view",
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
		"name": "ownersAddress",
		"outputs": [
		{
		"internalType": "address payable",
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
		}
		],
		"name": "slotId",
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
		"name": "slotPriceInUSDC",
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
		"name": "usdc",
		"outputs": [
		{
		"internalType": "contract IERC20",
		"name": "",
		"type": "address"
		}
		],
		"stateMutability": "view",
		"type": "function"
		}
		]	,
  };