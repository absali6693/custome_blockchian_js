const Block = require('./Block');
const Blockchain = require('./Blockchain');
const Transactions = require('./Transactions');


module.exports = class Main {

    constructor() {
        let chain = new Blockchain();
        chain.createTransaction(new Transactions('address1', 'address2', 100));
        chain.createTransaction(new Transactions('address2', 'address1', 50));

        console.log("Starting a miner...");
        chain.minePendingTransactions('abc');

        console.log('Balance', chain.getBalanceOfAddress('abc'));

        console.log("Starting a miner...");
        chain.minePendingTransactions('abc');

        console.log('Balance', chain.getBalanceOfAddress('abc'));
    }
}
