import React from "react";
import "../styles/TaskCard.css";

const TaskCard = ({ task }) => {
    return (
        <div className="task-card">
            <h2 className="task-title">{task.problemTitle}</h2>
            <p className="task-desc">{task.problemDescription}</p>
            <div className="task-details">
                <span>💰 Budget: <strong>${task.budget}</strong></span>
                <span>📅 Deadline: <strong>{new Date(task.deadline).toLocaleDateString()}</strong></span>
            </div>
            <button className="apply-btn">Apply Now</button>
        </div>
    );
};

export default TaskCard;
