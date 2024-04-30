const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const validator = require("validator");
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
   },
   password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [128, 'Password must be less than 128 characters long']
   }
});

const User = mongoose.model("user", userSchema);

const validate = (user) => {
    const schema = Joi.object({
        //name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = { User, validate };
