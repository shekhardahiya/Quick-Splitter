var mongoose = require("mongoose");
var GroupSchema = new mongoose.Schema({
  groupId: {
    type: Number,
    required: true,
    unique: true,
  },
  groupName:{
    type:String,
    required:true
  },
  members:{
    type:Array,
    required:true
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

var Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
