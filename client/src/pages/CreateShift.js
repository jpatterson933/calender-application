import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SHIFT } from "../utils/mutations";

function AddShift(props) {
    const [formState, setFormState] = useState({
        date: '',
        timezone: '',
        startTime: '',
        endTime: ''
    });
    const [addShift] = useMutation(ADD_SHIFT);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formState)

            await addShift({
                variables: {
                    date: formState.date,
                    timezone: formState.timezone,
                    startTime: formState.startTime,
                    endTime: formState.endTime,
                },
            });
        } catch (error) {
            console.error("Error creating shift:", error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };


    return (
        <div className="container">
            <h2>Add new Shift</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="date">Date</label>
                <input
                    placeholder="Date"
                    name="date"
                    type="date"
                    id="date"
                    onChange={handleChange}
                />

                <label htmlFor="timezone">Timezone</label>
                <input
                    placeholder="Timezone"
                    name="timezone"
                    type="timezone"
                    id="timezone"
                    onChange={handleChange}
                />

                <label htmlFor="startTime">Start Time</label>
                <input
                    placeholder="Start Time"
                    name="startTime"
                    type="time"
                    id="startTime"
                    onChange={handleChange}
                />

                <label htmlFor="endTime">End Time</label>
                <input
                    placeholder="End Time"
                    name="endTime"
                    type="time"
                    id="endTime"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default AddShift;