const { User, Thought } = require('../models');

userController = {
  // GET ALL users
  async getUsers(req, res) {
    try {
    console.log("Getting Users")
    User.find()
      .select('-__v')
      .then((userDB) => {
        res.json(userDB);
      })
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
  },

  // get single user by id 
  async getSingleUser(req, res) {
    try {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((userDB) => {
        if(userDB) {
          res.json({ userDB })
        } else{
          res.status(404).json({ message: 'User not found' })
        }
      })
    } catch(err)  {
        console.log(err);
        res.status(500).json(err);
      };
  },
  // create a new post
  async createUser(req, res) {
    try {
    console.log("CREATE USER")
    User.create(req.body)
    console.log(req.body, "REQ BODY")
      .then((userDB) => res.json(userDB))
      // console.log(userDB)
    } catch(err) { res.status(500).json(err);
    }
  },

//   update user by id
  async updateUser(req, res) {
    try {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      // return user data if not return the err
      .then((userDB) => {
        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        res.json(userDB);
      })
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
  },
   // delete user by id 
   async deleteUser(req, res) {
    try {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userDB) => {
        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        // deleting all the thoughts associated with user id
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and the thought associated are deleted' });
      })
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
  },

  // add friend 
  async addFriend(req, res) {
    try {
    User.findOneAndUpdate({ _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true })
      .then((userDB) => {
        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        res.json(userDB);
      })
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
  },
  // remove friend associated with a specific user
  async removeFriend(req, res) {
    try {
    User.findOneAndUpdate({ _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true })
      .then((userDB) => {
        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        res.json(userDB);
      })
    } catch(err)  {
        console.log(err);
        res.status(500).json(err);
      };
  },
};

module.exports = userController;
