const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
      },
      password: {
        type: String,
        required: true,
        minlength: 6  // You can enforce stronger rules if needed
      }      
}, {timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User;