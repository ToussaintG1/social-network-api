const router = require('express').Router();
// Requiring `controllers` methods
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleterUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

