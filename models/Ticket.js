const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		id: String,
		description: String,
		user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
);

const TicketSchema = new Schema(
	{
		id: String,
		title: String,
		description: String,
		assigned: String,
		submitter: String,
		type: String,
		priority: String,
		status: String,
		created: String,
		updated: String,
		comments: [CommentSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Ticket', TicketSchema);
