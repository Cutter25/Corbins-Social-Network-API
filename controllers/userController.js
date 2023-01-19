const { User, Thought } = require('../models');

module.exports = {

  // Get all users

  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user

  getUsersById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and associated posts

  deleteUsers(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and all posts deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    friends.create(req.body)
      .then((friend) => {
        return User.findOneAndUpdate(
          { _id: req.body.friendId },
          { $addToSet: { freinds: friend._id } },
          { new: true }
        );
      })
      .then((friend) =>
        !friend
          ? res
              .status(404)
              .json({ message: 'Cannot add friend' })
          : res.json('Friend added!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteFriend(req, res) {
    friends.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'friend not deleted' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
};

