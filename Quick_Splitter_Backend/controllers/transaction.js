const { response } = require("express");
const Transaction = require("../models/transaction");


exports.getAllTransaction = async (req, res, next) => {
    await Transaction.find({ groupId: req.params.groupId })
        .then((docs) =>
            res.status(200).json({
                code: 200,
                message:
                    Array.isArray(docs) && docs.length <= 0
                        ? "Either Group  id doesn't exist or no records found"
                        : "Transactions Fetched Successfully",

                data: docs,
            })
        )
        .catch((error) => res.json(error));
};


exports.getTransaction = async (req, res, next) => {
    await Transaction.find({ transactionId: req.params.transactionId })
        .then((docs) =>
            res.status(200).json({
                code: 200,
                message:
                    Array.isArray(docs) && docs.length <= 0
                        ? "Either Group  id doesn't exist or no records found"
                        : "Transactions Fetched Successfully",

                data: docs,
            })
        )
        .catch((error) => res.json(error));
};
exports.createTransaction = async (req, res, next) => {
    await Transaction.findOne()
        .select("transactionId")
        .sort({ transactionId: -1 })
        .then((lasttransactionId) => {
            req.body.transactionId = lasttransactionId ? lasttransactionId.transactionId + 1 : 1;
            return req;
        })
        .then((req) => {
            Transaction.create(req.body); res
                .status(201).json({ code: 200, message: "Transaction Created Succesfully" });
        })
        .catch((error) => res.json(error));
};


exports.updateTransaction = async (req, res, next) => {
    await Transaction.findOneAndUpdate({ transactionId: req.body.transactionId }, req.body, {
        new: true,
    })
        .then((response) => {
            res.status(200).json({
                code: 200,
                message: response
                    ? "Comment updated successfully"
                    : "Either Comment was not updated or commentId does not exist",
            });
        })
        .catch((err) => {
            res.json(err);
        });
};