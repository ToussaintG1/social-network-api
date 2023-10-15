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
      match: [/.+@.+\..+/, "Email must match formatting: example@email.com"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
