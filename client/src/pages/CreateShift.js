import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SHIFT } from "../utils/mutations";

function AddShift(props) {
    const [formState, setFormState] = useState({
        date: '',
        timezone: 'pacific',
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

            setFormState({
                date: '',
                timezone: 'pacific',
                startTime: '',
                endTime: ''
            })
        } catch (error) {
            console.error("Error creating shift:", error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "startTime") {
            console.log(value, 'starttime?')
        }

        if (name === "date") {
            const selectedDate = new Date(value);
            const day = selectedDate.getDay();

            if (day === 5 || day === 6) {
                alert('Saturdays and Sundays are not allowed') // should bring in a module component that pops up and can be dismissed
                setFormState({
                    ...formState,
                    [name]: '' // clear the date input
                });
                return
            }
        }
        console.log(name, value, "checking state")

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
                    value={formState.date}
                />

                <label htmlFor="timezone">Timezone</label>
                <select id="timezone" name="timezone" value={formState.timezone} onChange={handleChange}>
                    <option value="pacific">Pacific</option>
                    <option value="central">Central</option>
                    <option value="mountain">Mountain</option>
                    <option value="eastern">Eastern</option>
                    <option value="GMT/BST">GMT/BST</option>
                </select>

                <label htmlFor="startTime">Start Time</label>
                <input
                    placeholder="Start Time"
                    name="startTime"
                    type="time"
                    id="startTime"
                    onChange={handleChange}
                    value={formState.startTime}
                />

                <label htmlFor="endTime">End Time</label>
                <input
                    placeholder="End Time"
                    name="endTime"
                    type="time"
                    id="endTime"
                    onChange={handleChange}
                    value={formState.endTime}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default AddShift;