import React, { useState, useEffect } from 'react';

function ListModels() {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            const url = 'http://localhost:8100/api/models/'; // Ensure this matches your API endpoint
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setModels(data.models); // Adjust according to your API response structure
            } catch (error) {
                console.error("Could not fetch models:", error);
            }
        };

        fetchModels();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Vehicle Model List</h1>
                    <div className="list-group">
                        {models.map(model => (
                            <a href="#" className="list-group-item list-group-item-action" key={model.id}>
                                <h5 className="mb-1">{model.name}</h5>
                                <p className="mb-1">Manufacturer: {model.manufacturer.name}</p>
                                {/* Add more details here if needed */}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListModels;
