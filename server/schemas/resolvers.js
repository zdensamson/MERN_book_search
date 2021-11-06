const { User } = require('../models');

const resolvers = {
    Query: {
        users: () => {
            return User.find()
                .select('-__v -password')
                .populate('bookSchema');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        },
        login: async () => {

        }
    }
};

module.exports = resolvers;