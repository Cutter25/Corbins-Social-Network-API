const router = require('express').Router();

const { getAllThoughts, getThoughtsById, createThoughts, updateThoughts, 
    deleteThoughts, addReaction, deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThoughts);

router.route('/:thoughtId').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

// router.route('/:id').post(createThoughts);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;