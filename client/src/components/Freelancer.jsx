import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";

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
        <div className="task-list">
            {/* <h1>Available Tasks</h1> */}
            <div className="task-container">
                {tasks.map((task, index) => (
                    <TaskCard key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Freelancer;
