const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  subject: {
    type: String,
  },
  desc: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
