const Post = require("./Post");
const User = require("./user");
const Comment = require("./Comment");

Comment.belongsTo(Post);

Post.hasMany(Comment);

Comment.belongsTo(User);

User.hasMany(Comment);

User.hasMany(Post);

Post.belongsTo(User);

module.exports = { Post, User, Comment };
