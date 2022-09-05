const express = require("express");
const {
    createGroup,
    getGroup,
    getAllGroup
    //   updateComment,
    //   deleteComment,
} = require("../controllers/group");
const router = express.Router();

router.route("/:groupId/Group").get(getGroup);
router.route("/Group").get(getAllGroup);
router.route("/Group").post(createGroup);
// router.route("/Comments").put(updateComment);
// router.route("/Comments/:commentId").delete(deleteComment);

module.exports = router;