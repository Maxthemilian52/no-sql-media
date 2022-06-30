const { User, Thought } = require("../models")

const thoughtController = {
    findOneThought(req, res){
      Thought.findOne({ id: req.params.userId })
      .select('-__v')
      .then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    findAllThoughts(req, res){
      Thought.find()
      .select('-__v')
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
    },
  
  createThought(req, res){
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  //   User.findOneAndUpdate(
  //     { _id: req.body.userId },
  //     { $addToSet: { thoughts: res.id } },
  //     { runValidators: true, new: true }
  //   )
  //   .then((user) =>
  //   !user
  //     ? res
  //         .status(404)
  //         .json({ message: 'No user found with that ID :(' })
  //     : res.json(user)
  // )
  // .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : User.deleteMany({ _id: { $in: thought.use } })
          )
          .then(() => res.json({ message: 'Thought deleted!' }))
          .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thoughts) =>
          !thoughts
            ? res
                .status(404)
                .json({ message: 'No thoughts found with that ID :(' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { runValidators: true, new: true }
        
      ) 
        .then((reaction) =>
          !reaction
            ? res
                .status(404)
                .json({ message: 'No reaction found with that ID :(' })
            : res.json(reaction)
        )
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = thoughtController;