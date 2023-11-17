const Post = require("../models/postModel");
const User = require("../models/userModel");

//TODO: Create new post

exports.createPost = async (req, res) => {
  try {
    const postOwner = await User.findById(req.body.postOwner);

    if (!postOwner) {
      return res.status(400).json({ message: "A post, must belong to a user" });
    }

    const newPost = await Post.create({
      postOwner: req.body.postOwner,
      content: req.body.content,
    });

    res
      .status(201)
      .json({ message: "Post created successfully", data: newPost });
  } catch (err) {
    console.log(err);
  }
};

exports.likeUnlike = async (req, res) => {
  try {
    //1- Check if the post is still available
    //2- Check if the post is already liked by the user
    //2-1 If yes, remove the like from the post
    //2-2 if no, add the user to the list of the likers

    const post = await Post.findById(req.params.postID);
    if (!post)
      return res.status(404).json({ message: "Post is no longer available" });

    if (!post.likes.includes(req.body.userID)) {
      await post.updateOne({ $push: { likes: req.body.userID } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userID } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.timelinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body["currentUserID"]);
    if (!currentUser) return res.status(400).json("You must be logged in");

    const currentUserPosts = await Post.find({ postOwner: currentUser._id });

    const friendsPosts = await Promise.all(
      currentUser.following.map((friendID) => {
        return Post.find({ postOwner: friendID });
      })
    );

    const timelinePosts = currentUserPosts.concat(...friendsPosts);

    return timelinePosts.length <=0 ?
    res.status(404).json({message:"There is no posts to be displayed"}) :
    res.status(200).json(timelinePosts);
  } catch (err) {
    console.log(err);
  }
};
