const express = require('express');
const router = express.Router();

const { 
    fetchThoughts, 
    getThoughtById, 
    createThought, 
    updateThought,
    removeThought,
    addReaction,
    removeReaction

} = require('../../controllers/thoughts-controller');

router.route('/').get(fetchThoughts);
router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought); 
router.route('/:userId').post(createThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
