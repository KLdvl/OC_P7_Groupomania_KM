const Post = require("../../../models/Post");

exports.dislikePost = async (req, res) => {
  try {
    // Destructuring
    const {like, userId} = req.body;
    // Creating a dislike
      if(like === -1) {
      await Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {dislikes: +1}, $push: {usersDisliked: userId}})
      res.status(200).json({message: "Je dislike ce post"})
    }
      // Withdrawing a dislike
      if(like === 0) {
        const post = await Post.findById({_id: req.params.id})
        const {usersDisliked} = post;
        if (usersDisliked.includes(userId)) {
          await Post.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: userId}})
          res.status(200).json({message: "Je retire mon dislike"})
        }
      }
  } catch(err) {
    res.status(400).json({error : err})
  }
}
