const mongoose = require("mongoose");
const { Shift } = require("./index");

const { connect, clearDatabase, closeDatabase } = require("../utils/setup_db_test");



beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());


describe("Shift model test", () => {
    it("create and save a shift", async () => {
        const shiftData = {
            date: "2023-07-27",
            timezone: "eastern",
            startTime: "17:45",
            endTime: "22:00"
        }

        const validShift = new Shift(shiftData);
        const savedShift = await validShift.save();

        expect(savedShift._id).toBeDefined();

    })
})