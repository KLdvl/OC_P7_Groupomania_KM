const Post = require("../../../models/Post");

exports.likePost = async (req, res, next) => {
  try {
    // Destructuring
    const {like, userId} = req.body;
    // Creating a like
    if(like === 1) {
      await Post.findByIdAndUpdate({_id: req.params.id}, {$inc: {likes: +1}, $push: {usersLiked: userId}})
      res.status(200).json({message: "Je like ce post"})
    }
    // Withdrawing a like
    if(like === 0) {
      const post = await Post.findById({_id: req.params.id})
      const {usersLiked} = post;
      if (usersLiked.includes(userId)) {
        await Post.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: userId}})
        res.status(200).json({message: "Je retire mon like"})
      }
    }
  } catch(err) {
    res.status(400).json({error : err})
  }
  next()
}
