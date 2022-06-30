const router = require("express").Router();

const {
    findOneThought,
    findAllThoughts,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require("../../controllers/thought-controller")

router.route('/')
.post(createThought)
.delete(deleteThought)
.get(findAllThoughts)


router.route('/:thoughtId')
.get(findOneThought)
.put(updateThought)

router.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction)

module.exports = router