const { SHA256 } = require('crypto-js');
const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    async initializeChain() {
        if (this.height === -1) {
            const block = new Block({ data: 'Genesis Block' });
            await this.addBlock(block);
        }

    }

    addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {

                block.height = this.chain.length;
                block.time = new Date().getTime().toString().slice(0, -3);

                if (this.chain.length > 0) {
                    block.previousBlockHash = this.chain[this.chain.length - 1].hash;
                }
                let errors = await this.validateChain();
                if (errors.length > 0) {
                    return reject(new Error("The chain is invalid: " + errors));
                }

                block.hash = SHA256(JSON.stringify(block)).toString();
                self.chain.push(block);
                resolve(block);

        });
    }

    validateChain() {
        let self = this;
        let errors = [];  
    }
}

module.exports = Blockchain;