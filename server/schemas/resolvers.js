const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        .select('-__v -password')
        return userData;
      }
      throw new AuthenticationError('log in!');
    },
  },

  Mutation: {
  
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user =await User.create(args);
      const token =signToken(user);


      return {token, user};
    },
    saveBook: async (parent, { input }, { user } ) => {
        if (user) {
            const updatedUser = await User.findByIdAndUpdate(
                {_id: user._id},
                { $addToSet: { savedBooks: input } },
                { 
                    new: true,
                    runValidators: true,
                }
            )
            return updatedUser;
      }
      throw new AuthenticationError('log in!');
    },
    removeBook: async (parent, { bookId }, { user } ) => {
        if (user) {
            const updatedUser = await User.findOneAndUpdate(
                {_id: user._id},
                { $pull: { savedBooks: { bookId: bookId } } },
                { 
                    new: true,
                    runValidators: true,
                }
            )
            return updatedUser;
        }
        throw new AuthenticationError('log in!');
    },
  },
};

module.exports = resolvers;