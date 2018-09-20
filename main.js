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

        return new Block(0, "20/09/2018", "Genesis block", 0);
    }
}