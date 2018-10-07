const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		validate :{
			validator : (name) =>name.length >2,
			message : 'User Name must be longer than 2 characters'
		},
		required : [true, 'User Name is required']
	},
	postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;