import React, { useState, useEffect } from 'react';

function ListManufacturers() {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        const fetchManufacturers = async () => {
            const url = 'http://localhost:8100/api/manufacturers/'; // Update this URL to the correct endpoint
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setManufacturers(data.manufacturers); // Assuming the API returns an object with a manufacturers array
            } catch (error) {
                console.error("Could not fetch manufacturers:", error);
            }
        };

        fetchManufacturers();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Manufacturer List</h1>
                    <div className="list-group">
                        {manufacturers.map(manufacturer => (
                            <a href="#" className="list-group-item list-group-item-action" key={manufacturer.id}>
                                <h5 className="mb-1">{manufacturer.name}</h5>
                                {/* Add more manufacturer details here if needed */}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListManufacturers;
