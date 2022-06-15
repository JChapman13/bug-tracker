const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  department: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  project: [ProjectSchema],
});

const ProjectSchema = new Schema(
  {
    name: String,
    created: String,
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Team", TeamSchema);
