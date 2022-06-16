// Model used
const Post = require("../../models/Post");

// External requires
const fs = require("fs");

// Method for modifying an existing post
exports.updatePost = async (req, res) => {
  try {
// destructuring req.body
    const {title, content, userId} = await req.body;

     // Check if file is updated and delete old one if existing
    if(req.file) {
      const post = await Post.findById({_id: req.params.id}).exec();
      const {imageUrl} = post
      const filename = imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {})
    }

    // Populate new object with new image or new datas
    const postObject = await req.file
      ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
      : {
        title: title,
        content: content,
        userId: userId,
      };

// Update post data or image
    await Post.findByIdAndUpdate({_id: req.params.id}, {
      ...postObject,
      _id: req.params.id,
      date: Date.now()
    })
    res.status(200).json({message: "Post modifié !"})

} catch(err) {
  res.status(400).json({error: err})
}
}
