const express = require("express");
const {
  createTransaction,
  getAllTransaction,
  getTransaction,
  updateTransaction,
  //   deleteComment,
} = require("../controllers/transaction");
const router = express.Router();

router.route("/:groupId/allTransaction").get(getAllTransaction);
router.route("/:transactionId/Transaction").get(getTransaction);
router.route("/Transaction").post(createTransaction);
router.route("/Transaction").put(updateTransaction);
// router.route("/Comments/:commentId").delete(deleteComment);

module.exports = router;