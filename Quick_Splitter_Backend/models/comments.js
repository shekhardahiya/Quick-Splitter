var mongoose = require("mongoose");
var CommentsSchema = new mongoose.Schema({
    commentId: {
        type: Number,
        required: true,
        unique: true,
    },
    transactionId: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    commentedBy: {
        type: Object,
        required: true
    },
});

var Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
