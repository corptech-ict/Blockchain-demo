const {BlockChain, Transactions} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('4a5a1c8089f1a8853f9a9d518ebaf06894b289ec049ba154cc312f2b4c669ca8');
const myWalletAddress = myKey.getPublic();

let Xcoin = new BlockChain();

const tx1 = new Transactions(myWalletAddress, 'insert public key', 10);
tx1.signTransaction(myWalletAddress);
Xcoin.addTransaction(tx1);

console.log('Starting Corptech Miner...');
console.log("[*] New Job found from 3333://corptech.co.za/mining_pool...");
Xcoin.minePendingTransactions(myWalletAddress);

console.log("[*] New Job found from 3333://corptech.co.za/mining_pool...");
Xcoin.minePendingTransactions('Murcus-address');

console.log('Getting balance of miner... \nNew balance > ' + Xcoin.getBalance(myWalletAddress));
console.log('\nGetting balance of miner... \nNew balance > ' + Xcoin.getBalance(myWalletAddress));


