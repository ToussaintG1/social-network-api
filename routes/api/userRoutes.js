const router = require('express').Router();
// Requiring `controllers` methods
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  addFriend,
  removeFriend,
  deleteUser
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// Add/Delete Friend
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);


module.exports = router;

