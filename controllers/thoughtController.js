const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
      console.log("Getting Thoughts")
      Thought.find({})
      .then((thoughtDB) => {
          res.json(thoughtDB);
      })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
  },

  async getSingleThought(req, res) {
    try {
      Thought.findOne({ _id: req.params.thoughtId })
      .then(async (thoughtDB) =>
      !thoughtDB
          ? res.status(404).json({ message: 'No thought found!' })
          : res.json({ thoughtDB })
      )
  } catch(err)  {
          console.log(err);
          return res.status(500).json(err);
      };
  },

  async createThought(req, res) {
    try {
      Thought.create(req.body)
      .then((thoughtDB) => {
          return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thoughtDB._id } },
              { runValidators: true, new: true }
          )
      })

      .then((userDatabase) =>
          !userDatabase
              ? res
                  .status(404)
                  .json({ message: 'No user found!' })
              : res.json(userDatabase)
      )
    } catch(err) { res.status(400).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
      )
          .then((thoughtDB) =>
              !thoughtDB
                  ? res.status(404).json({ message: 'No thought found!' })
                  : res.json(thoughtDB)
          )
      }catch(err) { res.status(500).json(err);
      }
  },

  async deleteThought(req, res) {
    try {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thoughtDB) =>
              !thoughtDB
                  ? res.status(404).json({ message: 'No thought found with that ID' })
                  : User.findOneAndUpdate(
                      { thoughts: req.params.thoughtId },
                      { $pull: { thoughts: req.params.thoughtId } },
                      { new: true }
                  )
          )
          .then((userDatabase) =>
              !userDatabase
                  ? res.status(404).json({
                      message: 'Thought deleted',
                  })
                  : res.json({ message: 'Thought successfully deleted' })
          )
                } catch(err) {
              console.log(err);
              res.status(500).json(err);
          };
  },

  async createReaction(req, res) {
    try {
      console.log('create reaction');
      console.log(req.body);
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
      )
          .then((thoughtDB) =>
          !thoughtDB
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID' })
              : res.json(thoughtDB)
          )
      } catch(err) { res.status(500).json(err);
      }
  },

   removeReaction(req, res) {
    try {
      console.log('delete reaction');
      Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          {$pull: { reactions: { reactions: req.params.reactionId } } },
          { runValidators: true, new: true }
      )
          .then((thoughtDB) =>
              !thoughtDB
                  ? res
                      .status(404)
                      .json({ message: 'No thought found with that ID' })
                  :res.json(thought)
          )
      } catch(err) {  res.status(500).json(err);
      }
  },
};


