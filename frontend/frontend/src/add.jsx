import React, { useState, useEffect } from "react";
import axios from "axios";

const Habit = () => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [datal, setDatal] = useState([]);
    const [selectedId, setSelectedId] = useState(null); // For update and delete operations

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/records");
            setDatal(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/api/records/save", {
                name,
                title,
                description
            });
            fetchData(); // Refresh data after submit
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async () => {
        if (selectedId) {
            try {
                await axios.put(`http://localhost:3000/api/habit/${selectedId}`, {
                    name,
                    title,
                    description
                });
                fetchData(); // Refresh data after update
                setSelectedId(null); // Clear selected ID
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/habit/${id}`);
            fetchData(); // Refresh data after delete
        } catch (error) {
            console.error(error);
        }
    };

    const handleSoftDelete = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/habit/soft-delete/${id}`);
            fetchData(); // Refresh data after soft delete
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Habit</button>
            <button onClick={handleUpdate} disabled={!selectedId}>Update Habit</button>
            <div>
                {datal.map((item) => (
                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <button onClick={() => {
                            setName(item.name);
                            setTitle(item.title);
                            setDescription(item.description);
                            setSelectedId(item.id);
                        }}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                        <button onClick={() => handleSoftDelete(item.id)}>Soft Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Habit;
