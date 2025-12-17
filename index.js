const Blockchain = require('./src/blockchain');
const Block = require('./src/block');

async function testBlockchain() {
    const blockchain = new Blockchain();
    const block1 = new Block({ sender: "Alice", recipient: "Bob", amount: 50 });
    const block2 = new Block({ sender: "Bob", recipient: "Charlie", amount: 30 });
    const block3 = new Block({ sender: "Charlie", recipient: "Dave", amount: 20 });

    await blockchain.addBlock(block1);
    await blockchain.addBlock(block2);
    await blockchain.addBlock(block3);

    console.log("Blockchain:");
    blockchain.print();
}

testBlockchain();