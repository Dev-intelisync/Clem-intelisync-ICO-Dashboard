import ContractAddress from "./contract"
const url = 'https://liberty10.shardeum.org/';
const Web3 = require('web3');
var web3 = new Web3(url);
const contract = new web3.eth.Contract(ContractAddress.abi, ContractAddress.contractAddress)
var data = contract.methods.buyWithUSDC("front-end-value-require").send({from: useraddress});
console.log(data.txHash, "tx hash");