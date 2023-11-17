const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    commentOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    parentPost: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    // Content may include the text or the text + emojies
    commentContent: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },

    commentImage: {
      type: String,
    },

    commentVideo: {
      type: String,
    },

    commentLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    commentReplies: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
