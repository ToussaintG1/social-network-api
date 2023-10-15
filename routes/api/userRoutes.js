const router = require('express').Router();
// Requiring `controllers` methods
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
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


module.exports = router;

