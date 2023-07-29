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
            timezone: "eastern", // testing failing here // that is a good thing
            startTime: "17:45", // testing failing here // that is a good thing
            endTime: "22:00" // testing failing here // that is a good thing
        }

        const validShift = new Shift(shiftData);
        const savedShift = await validShift.save();

        expect(savedShift._id).toBeDefined();
        expect(savedShift.date).toBe(shiftData.date);
        expect(savedShift.timezone).toBe(shiftData.timezone);
        expect(savedShift.startTime).toBe(shiftData.startTime);
        expect(savedShift.endTime).toBe(shiftData.endTime);

    })
})