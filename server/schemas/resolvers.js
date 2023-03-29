
const { Shift } = require('../models');

const resolvers = {
    Query: {
        shifts: async () => {
            return await Shift.find({})
        }
    }



    
}

module.exports = resolvers;