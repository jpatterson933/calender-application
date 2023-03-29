const db = require('../config/connection');
const shiftData = require('./shiftData.json');
const { Shift } = require('../models');


db.once('open', async () => {

    await Shift.deleteMany({}); // empty collection
    const shifts = await Shift.insertMany(shiftData)
    console.log('all done!');
    process.exit(0);
})
