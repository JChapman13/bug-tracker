const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    id: String,
    description: String,
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
const TicketSchema = new Schema(
  {
    id: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignee: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reporter: [{ type: Schema.Types.ObjectId, ref: "User" }],
    priority: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    duedate: Date,
    created: Date,
    updated: Date,
    attchahment: {
      data: Buffer,
      contentType: String,
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", TicketSchema);
