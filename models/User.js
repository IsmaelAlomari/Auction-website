const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema =({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password : {
        type: String,
        required: true,
        minlength: [6, "please, password can't be less than 6 charaacter"]
       
    },
    email: {
      type: String ,
       required: true,
        validate: [
        { validator: validators.notEmpty, msg: 'Email is empty' }
      , { validator: validators.isEmail, msg: 'Invalid email' }
      ]
    },
    address: {
        type: String
    },
    age: {
        type: Number ,
        min: [18, 'Age must be above 18'],
    },
    nationality:{
        type: String
    }, 
    createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      toJSON: {virutuals : true},
      toObject: {virutuals : true}

}) 

const User = mongoose.model('User', userSchema);

module.exports = User;