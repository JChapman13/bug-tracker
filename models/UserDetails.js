const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: { type: String, default: "Unassigned" },
    tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("User", UserSchema);
