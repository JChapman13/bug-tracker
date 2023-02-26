const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const TeamSchema = new Schema({
  name: String,
  leader: String,
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  project: [ProjectSchema],
});

module.exports = mongoose.model("Team", TeamSchema);
