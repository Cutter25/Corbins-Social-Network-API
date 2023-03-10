const { Thought, User } = require('../models');

module.exports = {

// gets all thoughts

    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },

    // gets one thought

    getThoughtsById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => !thought
            ? res.status(404).json({ message: 'Sorry! try searching for something else!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // creates thought

    createThoughts(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }, 
            );
        })
        .then((thought) => !thought
            ? res.status(404).json({
                message: 'Thought has been uploaded but no user id has been found',
            })
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    // updates one thought

    updateThoughts(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No post found!' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      // deletes one thought

      deleteThoughts(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No post found!' })
              : User.findOneAndUpdate(
                  { thoughts: req.params.thoughtId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Post deleted but no user with this id!',
                })
              : res.json({ message: 'Post successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },

      // creates one reaction

      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No post found' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Removes one reaction
      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No post found' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
      },
};