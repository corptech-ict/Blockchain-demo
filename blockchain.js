const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transactions{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey){

        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error('You cannot sign transactions for other wallets!');
        }
        
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');

    }

    isTransactionValid(){
        if(this.fromAddress !== null) return false;

        if(!this.signature || this.signature.length == 0){
            throw new Error('There is no signature in this transaction!');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);


    }
}

class Block{
    //create a constructor to store blockchain data
    constructor(transactions, timestamp, previousHash = " "){
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0
        
    }

    calculateHash(){
        //this is a method to calculate the hash key for your blocks
        //pretty simple, the hash is made up off the data of a block
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("\n[+] Mined block > " + this.hash + "\n");
    }

    hasValidTransaction(){
        for(const tx of this.transactions){
            if(!tx.isTransactionValid()){
                return false;
            }
        }

        return true;
    }

}

class BlockChain{
    constructor(){
        //create an array called chain to store to your blockchain
        //have a genesis block as the index of your block chain
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningReward = 23;
    }
    
    createGenesisBlock(){
        //this a method that returns the Genesis Block data
        return new Block([], Date.parse("2021-03-01") , "0");
    }

    getLatestBlock(){
        //this is a method to get the previous block's data from the blockchain
        //can be used to retrieve the previous hash.
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        const rewardTx =  new Transactions(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(this.pendingTransactions, Date.now(), this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("[+] Block successfully mined!!! \n[+] Xcoin Share found at block > Accepted\n");
        this.chain.push(block);
        
        //
        this.pendingTransactions = [];

    }

    addTransaction(transaction){
        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error('Transaction must include from and to address!');
        }

        if(!transaction.isTransactionValid()){
            throw new Error('Transaction must valid to be added to the blockchain!');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalance(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){

                if(trans.fromAddress === address){
                    balance -= trans.amount;
                } 
                if(trans.toAddress === address){
                    balance += trans.amount;
                }

            }
        }

        return balance;
    }

   /* addBlock(newBlock){
        //this is a method of adding a new block in the block chain
        //a block consist of three variables: the previous hash, the new hash, 
        //and the data that's being sent
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    } */

    isChainValid(){
        //this is a method to provide temper protection to your blockchain
        //create a for loop for the blockchain and check if the chain is valid
        for(let i = 1; i < this.chain.length; i++){
            //get the positions of the current block and the previous block from your blockchain
            //store the values of the blocks in a constant variables
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidTransaction){
                return false;
            }

            //first check if the current block hash is the same as the calculated hash
            //return false if its not the same
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            //now check if the previous hash on the current block matches the previous block's hash
            //return false if the hash is not the same
            if(previousBlock.hash !== currentBlock.previousHash){
                return false;
            }

        }

        return true;
    }
}

module.exports.BlockChain = BlockChain;
module.exports.Transactions = Transactions; 
module.exports.Block = Block;