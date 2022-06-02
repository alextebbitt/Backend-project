const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your a title"],
    },
    body: {
      type: String,
      required: [true, "At least write something"],
    },
    comments: [
      {
        userId: { type: ObjectId, ref: "User" },
        comment: String,
      },
    ],
    userIds: [{ type: ObjectId, ref: "User" }],
    likes: [{ type: ObjectId }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
