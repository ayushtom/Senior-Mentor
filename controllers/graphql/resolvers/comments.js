const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../../middlewares/check-auth');
const Post = require('../../../models/Post');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context)
    {
      const { email,name } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          name,
          email,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { email } = checkAuth(context);

      const post = await Post.findById(postId);
 
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].email === email) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
    
  }
};