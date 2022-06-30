const { User, Thought } = require("../models")

const userController = {
    createUser(req, res){
        User.create(req.body)
            .then((userData) => {
                res.json(userData)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    deleteUser(req, res){
        User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user exists' })
          : User.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and thoughts deleted!' }))
          .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res){
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

    findOneUser(req, res){
        User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },

    findAllUsers(req, res){
        User.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    addFriend(req,res){
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
}

module.exports = userController;