import React, { useState } from 'react';
import axios from 'axios';
import "../styles/PostTask.css";

const PostTask = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('API URL:', import.meta.env.VITE_API_URL);

    const [formData, setFormData] = useState({
        problemTitle: '',
        problemDescription: '',
        budget: '',
        deadline: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            // Make sure the backend endpoint matches what you defined ("/add-task")
            const response = await axios.post(`${apiUrl}/add-task`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log('Response:', response.data);
            setSuccess(response.data);
            setFormData({
                problemTitle: '',
                problemDescription: '',
                budget: '',
                deadline: ''
            });
        } catch (error) {
            setError(error.response?.data?.error || 'Error adding task');
        }
        setLoading(false);
    };

    return (
        <div className="form-container">
            <h1>Post Task</h1>
            <p>This is where you can post a new task.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="problemTitle">Task Title</label>
                    <input
                        type="text"
                        id="problemTitle"
                        name="problemTitle"
                        value={formData.problemTitle}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="problemDescription">Description</label>
                    <textarea
                        id="problemDescription"
                        name="problemDescription"
                        value={formData.problemDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="budget">Budget ($)</label>
                    <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="deadline">Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default PostTask;
