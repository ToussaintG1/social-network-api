const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
        objectId: new mongoose.Schema.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
        virtuals: true,
    },
    id: false,
  }
);


module.exports = Reaction;