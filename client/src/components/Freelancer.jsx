import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const Freelancer = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${apiUrl}/tasks`);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <strong>{task.problemTitle}</strong> - {task.problemDescription} (Budget: ${task.budget}, Deadline: {new Date(task.deadline).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Freelancer;
