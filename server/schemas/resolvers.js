
const { Shift } = require('../models');

const resolvers = {
    Query: {
        shifts: async () => {
            return await Shift.find({})
        }
    },
    Mutation: {
        addShift: async (parent, args) => {
            const shift = await Shift.create(args);
            return { shift }
        }
    }




}

module.exports = resolvers;