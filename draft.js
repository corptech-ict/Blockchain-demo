/*private key: 4a5a1c8089f1a8853f9a9d518ebaf06894b289ec049ba154cc312f2b4c669ca8

Public key: 04420160ae7599fd04b6b1921d9522955ba670685911c2bfa5ea7e489ec7f143a81c06395525f78e997f50fe21edc9487d43147b3575a43072e290bbe30c5aa9d3


console.log('Starting Corptech Miner...');
console.log("[*] New Job found from 3333://corptech.co.za/mining_pool...");
Xcoin.minePendingTransactions('Murcus-address');

Xcoin.createTransaction(new Transactions('address 1', 'address 2', 50));
Xcoin.createTransaction(new Transactions('address 2', 'address 3', 150));
Xcoin.createTransaction(new Transactions('address 4', 'address 2', 500));
Xcoin.createTransaction(new Transactions('address 5', 'address 1', 350));

//console.log('Getting balance of miner... \nNew balance > ' + Xcoin.getBalance('Murcus-address'));
console.log("Mining block 1...")
Xcoin.addBlock(new Block(1, "02/03/2021", { amount: 10 }));

console.log("Mining block 2...")
Xcoin.addBlock(new Block(2, "02/03/2021", { amount: 25 }));

console.log("Mining block 3...")
Xcoin.addBlock(new Block(3, "03/03/2021", { amount: 50 }));

console.log("Mining block 4...")
Xcoin.addBlock(new Block(4, "05/03/2021", { amount: 125 }));

Xcoin.chain[1].data = { amount: 10000 };
Xcoin.chain[1].hash = Xcoin.chain[1].calculateHash();


console.log("[*] New Job found from 3333://corptech.co.za/mining_pool...");
Xcoin.minePendingTransactions('Murcus-address');

console.log('Getting balance of miner... \nNew balance > ' + Xcoin.getBalance('Murcus-address'));

if(Xcoin.isChainValid() == true){
    console.log("is the blockchain valid?... > " + Xcoin.isChainValid())
    console.log(JSON.stringify(Xcoin, null, 4));
}
else(
    console.log("is the blockchain valid?... > " + Xcoin.isChainValid() + "\n" +
    "Please stop trying to destroy my coin. Or you'll face unruly consequences."+"\nTemper this coin at your own risk!!")
)*/