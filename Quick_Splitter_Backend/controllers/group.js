const { response } = require("express");
const Group = require("../models/groups");



exports.getGroup = async (req, res, next) => {
    await Group.find({ groupId: req.params.groupId })
        .then((docs) =>
            res.status(200).json({
                code: 200,
                message:
                    Array.isArray(docs) && docs.length <= 0
                        ? "Either Blog id doesn't exist or no records found"
                        : "Comments Fetched Successfully",

                data: docs,
            })
        )
        .catch((error) => res.json(error));
};
exports.getAllGroup = async (req, res, next) => {
    await Group.find({})
        .then((docs) =>
            res.status(200).json({
                code: 200,
                message:
                    Array.isArray(docs) && docs.length <= 0
                        ? "Either Blog id doesn't exist or no records found"
                        : "Comments Fetched Successfully",

                data: docs,
            })
        )
        .catch((error) => res.json(error));
};


exports.createGroup = async (req, res, next) => {
    await Group.findOne()
        .select("groupId")
        .sort({ groupId: -1 })
        .then((lastGroupId) => {
            //   console.log(lastGroupId);
            req.body.groupId = lastGroupId ? lastGroupId.groupId + 1 : 1;
            return req;
        })
        .then((req) => {
            Group.create(req.body);

            res.status(201).json({ code: 200, message: "Group Created Succesfully", groupId: req.body.groupId });
        })
        .catch((error) => res.json(error));
};
