const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {
    constructor(data) {
        this.hash = null;
        this.height = 0;
        this.body = Buffer.from(JSON.stringify(data).toString('hex'));
        this.time = 0;
        this.previousBlockHash = null;
    }

    validate() {
        const self = this;
        return new Promise((resolve, reject) => {
            let currentHash = self.hash;
            self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString();
            if (currentHash === self.hash) {
                resolve(true);
            } else {
                resolve(false);
            }
        }
        );
    }
    getBlockData() {
        const self = this;
        return new Promise((resolve, reject) => {
            if (self.height === 0) {
                reject(new Error("Genesis block does not contain data"));
            } else {
                let encodedData = self.body;
                let decodedData = hex2ascii(encodedData);
                let dataObject = JSON.parse(decodedData);
                resolve(dataObject);
            }
        });
    }

    toString() {
        const {hash, height, body, time, previousBlockHash} = this;
        return `Block -
        Hash: ${hash}
        Height: ${height}
        Body: ${body}
        Time: ${time}
        Previous Block Hash: ${previousBlockHash}`;
    }
}

module.exports = Block;