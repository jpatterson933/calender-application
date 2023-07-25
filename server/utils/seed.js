const db = require('../config/connection');
const shiftData = require('./shiftData.json');
const { Shift } = require('../models');

// seed shift data iwth current shifts
db.once('open', async () => {

    try {
        await Shift.deleteMany({}); // empty collection
        const shifts = await Shift.create(shiftData)
        console.log('all done!');
        process.exit(0);
        // added error handling
    } catch (err) {
        throw err;
    }

})
