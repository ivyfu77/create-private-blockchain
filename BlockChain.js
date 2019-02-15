/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.db = new LevelSandbox.LevelSandbox();

        this.genesisBlock = this.generateGenesisBlock()
          .then((result) => {
            console.log(JSON.parse(result));
          });
    }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock(){
      let self = this;
      return self.getBlockchainHeight()
        .then((count) => {
          if (count === 0) {
            return self.addBlock(new Block.Block('First block in the chain - Genesis block'));
          }
        })
    }

    // Get block height, it is a helper method that return the height of the blockchain
    getBlockchainHeight() {
      return this.db.getBlocksCount()
    }

    // Add new block
    addBlock(newBlock) {
      let self = this;
      return self.getBlockchainHeight()
        .then((count) => {
          const chainLength = count;
          // Block height
          newBlock.height = chainLength;
          // UTC timestamp
          newBlock.time = new Date().getTime().toString().slice(0,-3);
          // Block hash with SHA256 using newBlock and converting to a string
          newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

          if(chainLength > 0){
            return self.getBlock(chainLength - 1)
              .then((result) => {
                if (result && JSON.parse(result).hash) {
                  newBlock.previousBlockHash = JSON.parse(result).hash;
                }
                return newBlock;
              });
          } else {
            return newBlock;
          }
        })
        .then((newBlock) => {
          return self.db.addLevelDBData(newBlock.height, JSON.stringify(newBlock).toString());
        })
    }

    // Get Block By Height
    getBlock(height) {
      return this.db.getLevelDBData(height)
        .then((result) => {
          return result
        })
    }

    // Validate if Block is being tampered by Block Height
    validateBlock(height) {
        // Add your code here
    }

    // Validate Blockchain
    validateChain() {
        // Add your code here
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            self.db.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }

}

module.exports.Blockchain = Blockchain;
