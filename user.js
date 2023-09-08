const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: String,
   email: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const newUser = new User({
   username: 'exampleUser',
   email: 'user@example.com',
});

newUser.save()
   .then(_savedUser => {})
   .catch(_error => {});