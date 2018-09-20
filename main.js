//Adding from crypto-js library
const SHA256 = require('crypto-js/sha256');

class Block{

    //the index is opcional, it tells us where the block is on the chain 
    //the timestamp will tell us when the block was created 
    //data any type of data you want to be associated with this block
    //previousHash is a string that contains the hash of the block before this one (this is important and it ensures the itegrity for our blockchain)
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash(); 
    }
    
    //We have to use a libary for this
    //we install crypto-js by npm install --save crypto-js
    calculateHash(){
        
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }
}

class Blockchain{
    constructor(){

        //this.chain will be an array of blocks 
        this.chain = [this.createGenesisBlock()];
    }

    //The first block of the chain is called GENESIS and it has to be added manually
    //Will create a methoth for this 

    createGenesisBlock(){

        return new Block(0, "18/08/2018", "Genesis block", 0);
    }

    getLatestBlock(){

        return this.chain[this.chain.length - 1];

    }

    addBlock(newBlock){

        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }

    //TO VERIFY IF TE CHAIN IS VALID 
    
    isChainValid(){

        //not putting index in 0 cause GENESIS is the 0
        for(let i = 1; i <this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i -1];

            //check if the propely block  are link together
            //1.- if the hash of the block still valid  
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;  
            }

            if(currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}


//to test it we need to create a instance of the blockchain

let savjeeCoin = new Blockchain
savjeeCoin.addBlock(new Block(1, "20/08/2018", {amount: 4}));
savjeeCoin.addBlock(new Block(2, "23/08/2018", {amount: 7}));

console.log("Is block chain valid?" + savjeeCoin.isChainValid());


//See how the blockchain looks like 
// console.log(JSON.stringify(savjeeCoin, null, 4))


