const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  sendinvite
  //   deleteComment,
} = require("../controllers/user");
const router = express.Router();

router.route("/LoginUser").post(getUser);
router.route("/User").post(createUser);
router.route("/User").put(updateUser);
router.route("/sendmail").post(sendinvite);
// router.route("/Comments/:commentId").delete(deleteComment);

module.exports = router;