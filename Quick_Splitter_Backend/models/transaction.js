var mongoose = require("mongoose");
var TransactionSchema = new mongoose.Schema({
    transactionId: {
        type: Number,
        required: true,
        unique: true,
    },
    groupId: {
        type: Number,
        required: true
    },
    transactionName: {
        type: String,
        required: true
    },
    initiatedBy: {
        type: Object,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    membersOfTransaction: {
        type: Array,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    upiId: {
        type: String
    }
});

var Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
