const connection = require('../config/connection');

const { Shift } = require('../models');


connection.once('open', async () => {

    Shift.insertMany(
        [
            { date: '12/7/2023' },
            { date: '01/2/2023' },
            { date: '02/4/2023' },
            { date: '03/4/2023' }
        ]
    )

})
