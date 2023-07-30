const mongoose = require("mongoose");
const { Shift } = require("./index");
const { convertTime } = require('./Shift');

const { connect, clearDatabase, closeDatabase } = require("../utils/setup_db_test");



beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());


describe("converTime function for Shift model", () => {
    it("should take a string that is time, and keep it the same for pacific", () => {
        let timeString = "12:00";
        let timezoneOffset = 0;

        const convertedTime = convertTime(timeString, timezoneOffset);

        expect(convertedTime).toBe("12:00");
        expect(convertedTime).not.toBe("11:00");
    });

    it("should take a string that is time, and an timezone offset and convert it mountain", () => {
        let timeString = "12:00";
        let timezoneOffset = 1;

        const convertedTime = convertTime(timeString, timezoneOffset);

        expect(convertedTime).toBe("11:00");
        expect(convertedTime).not.toBe("12:00");
    });

    it("should take a string that is time, and an timezone offset and convert it central", () => {
        let timeString = "12:00";
        let timezoneOffset = 2;

        const convertedTime = convertTime(timeString, timezoneOffset);

        expect(convertedTime).toBe("10:00");
        expect(convertedTime).not.toBe("12:00");
    });

    it("should take a string that is time, and an timezone offset and convert it to eastern", () => {
        let timeString = "12:00";
        let timezoneOffset = 3;

        const convertedTime = convertTime(timeString, timezoneOffset);

        expect(convertedTime).toBe("9:00");
        expect(convertedTime).not.toBe("12:00");
    });

    it("should take a string that is time, and an timezone offset and convert it GMT/BST", () => {
        let timeString = "12:00";
        let timezoneOffset = 9;

        const convertedTime = convertTime(timeString, timezoneOffset);

        expect(convertedTime).toBe("3:00");
        expect(convertedTime).not.toBe("12:00");
    });

});


describe("Shift model test", () => {

    it("create and save a shift", async () => {
        const shiftData = {
            date: "2023-07-27",
            timezone: "eastern", // testing failing here // that is a good thing
            startTime: "17:45", // testing failing here // that is a good thing
            endTime: "22:00" // testing failing here // that is a good thing
        };

        const validShift = new Shift(shiftData);
        const savedShift = await validShift.save();
        const convertedStartTime = convertTime(shiftData.startTime, 3);
        const convertedEndTime = convertTime(shiftData.endTime, 3);

        expect(savedShift._id).toBeDefined();
        expect(savedShift.date).toBe(shiftData.date);

        expect(savedShift.timezone).toBe(`converted|${shiftData.timezone}`);
        expect(savedShift.startTime).toBe(convertedStartTime);
        expect(savedShift.endTime).toBe(convertedEndTime);

        expect(savedShift.timezone).not.toBe(shiftData.timezone);
        expect(savedShift.startTime).not.toBe(shiftData.startTime);
        expect(savedShift.endTime).not.toBe(shiftData.endTime);

    });
});