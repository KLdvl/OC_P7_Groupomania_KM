// Model used
const Post = require("../../models/Post");

// Method for creating a new post
exports.createPost = async (req, res) => {
  try {
    const postObject = await JSON.parse(req.body.post);
    delete postObject._id;

    await Post.create({
      ...postObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    res.status(201).json({message: "Post créé !"})
  } catch(err) {
    res.status(400).json({error : err})
  }
}
