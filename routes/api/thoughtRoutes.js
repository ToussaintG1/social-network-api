const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,

} = require('../../controllers/thoughtController');

// /api/courses
router.route('/').get(getThoughts).post(createThought);

// /api/students/:studentId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/students/:studentId/assignments
router.route('/:thoughtId/reactions').post(createReaction);
// deleting a reaction on the route :thoughtId/reactions/:reactionId reactions are assc with thoughts
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;


