const { response } = require("express");
const Comments = require("../models/comments");


exports.getAllComments = async (req, res, next) => {
    await Comments.find({ transactionId: req.params.transactionId })
        .then((docs) =>
            res.status(200).json({
                code: 200,
                message:
                    Array.isArray(docs) && docs.length <= 0
                        ? "Either Transaction  id doesn't exist or no records found"
                        : "Comments Fetched Successfully",

                data: docs,
            })
        )
        .catch((error) => res.json(error));
};


exports.createComment = async (req, res, next) => {
    await Comments.findOne()
        .select("commentId")
        .sort({ commentId: -1 })
        .then((lastcommentId) => {
            req.body.commentId = lastcommentId ? lastcommentId.commentId + 1 : 1;
            return req;
        })
        .then((req) => {
            Comments.create(req.body); res
                .status(201).json({ code: 200, message: "Comment Created Succesfully" });
        })
        .catch((error) => res.json(error));
};
