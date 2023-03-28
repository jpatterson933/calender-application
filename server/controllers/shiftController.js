const { Shift } = require('../models');

module.exports = {

    getShifts(req, res) {
        Shift.find()
            .then((shift) => res.json(shift))
            .catch((err) => res.status(500).json(err));
    },
    createShift(req, res) {
        Shift.create(req, body)
            .then((dbShiftData) => res.json(dbShiftData))
            .catch((err) => { res.status(500).json(err) });
    }
}