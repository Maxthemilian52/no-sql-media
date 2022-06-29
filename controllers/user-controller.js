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
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((course) =>
              !course
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },

    findOneUser(req, res){
        User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },

    findAllUsers(req, res){
        User.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
}

module.exports = userController;