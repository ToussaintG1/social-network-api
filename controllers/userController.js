const { User } = require('../models');

const numberOfFriends = async () =>
  User.aggregate()
    .count('numberOfFriends')
    .then((numberOfFriends) => numberOfFriends);

module.exports = {
  // GET ALL users
  getUsers(req,res) {
    User.find()
    .then(async (users) => {
        const userObj = {
            users,
            numberOfFriends: await numberOfFriends(),
        };
        return res.json(userObj);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},

  // get single user by id 
  getSingleUser(req,res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then(async (user) => 
    !user 
        ? res.status(404).json({message: 'No User with that id found'})
        : res.json({
            user
        })
    ) 
    .catch((err) => {
        console.log(err)
        return res.status(500).json(err);
    })
},

  // create a new post
  createUser(req,res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err)
    });
},

//   update user by id
updateUser(req,res) {
  User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
  )
  .then((user) =>
  !user
    ? res.status(404).json({ message: 'No user with this id!' })
    : res.json(user)
)
.catch((err) => res.status(500).json(err));
},

   // delete user by id 
   deleteUser(req,res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : User.deleteOne({ _id: req.params.User })
    )
    .then(() => res.json({ message: 'User and friends deleted!' }))
    .catch((err) => res.status(500).json(err));
},
addFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
removeFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
};

