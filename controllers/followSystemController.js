const User = require("../models/userModel");

exports.follow_Unfollow = async (req, res) => {
  try {
    //1: Check if the user to be followed is different then the current user
    //2: Check if both the current user, and the user to be followed already exists
    //3: Check if the current user is not following the second one already

    if (req.params.id !== req.body.currentUserId) {
      try {
        const currentUser = await User.findById(req.body.currentUserId);
        if (!currentUser) {
          return res
            .status(400)
            .json({ message: "Please login before you start this request" });
        }

        const userToBeFollowed = await User.findById(req.params.id);

        if (!userToBeFollowed) {
          return res
            .status(404)
            .json({ message: "User to be followed is not found" });
        }

        if (!userToBeFollowed.followers.includes(req.body.currentUserId)) {
          await userToBeFollowed.updateOne({
            $push: { followers: req.body.currentUserId },
          });

          await currentUser.updateOne({ $push: { following: req.params.id } });

          res.status(200).json("You are now following this user");
        } else {
          await userToBeFollowed.updateOne({
            $pull: { followers: req.body.currentUserId },
          });

          await currentUser.updateOne({ $pull: { following: req.params.id } });

          return res.status(200).json("User has been unfollowed");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return res
        .status(409)
        .json({ message: "You cannot follow/unfollow yourself" });
    }
  } catch (err) {
    console.log(err);
  }
};
