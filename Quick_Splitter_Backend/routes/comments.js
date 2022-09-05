const express = require("express");
const {
    createComment,
    getAllComments,

    //   updateComment,
    //   deleteComment,
} = require("../controllers/comments");
const router = express.Router();

router.route("/:transactionId/allComments").get(getAllComments);
router.route("/Comment").post(createComment);
// router.route("/Comments").put(updateComment);
// router.route("/Comments/:commentId").delete(deleteComment);

module.exports = router;