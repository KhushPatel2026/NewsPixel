var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	interest: String,
	state: String,
	cities: String,
	pincode: Number,
	
}),
User = mongoose.model('User', userSchema);

module.exports = User;