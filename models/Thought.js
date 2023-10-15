const { Schema, Types, model, Mongoose, default:  mongoose } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: 'Email address is required',
        unique: true,
        match: [/.+@.+\..+/, "Email must match formatting: abc@email.com"],
      },
      reactions: [
        reactionSchema
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;