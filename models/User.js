const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'please enter a username',
      trim: true,
    },
    email: {
      type: String,
      required: 'Email address is required',
      unique: true,
      match: [/.+@.+\..+/, "Email must match formatting: abc@email.com"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length
    })
const User = model('User', userSchema);

module.exports = User;
