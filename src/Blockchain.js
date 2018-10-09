const SHA256 = require('crypto-js/sha256');
const Block = require('./Block');
const Transactions = require('./Transactions');


module.exports = class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningRewards = 100;
    }

    createGenesisBlock() {
        return new Block(Date.now().toString(), "Genesis Block", "0x00")
    }

    getLatestBlock() {
        return this.chain[this.chain.length -1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Block mined");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transactions(null, miningRewardAddress, this.miningRewards)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress == address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress == address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

}