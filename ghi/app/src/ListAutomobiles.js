import React, { useState, useEffect } from 'react';

function ListAutomobiles() {
    const [automobiles, setAutomobiles] = useState([]);

    useEffect(() => {
        const fetchAutomobiles = async () => {
            const url = 'http://localhost:8100/api/automobiles/';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAutomobiles(data.autos);
            } catch (error) {
                console.error("Could not fetch automobiles:", error);
            }
        };

        fetchAutomobiles();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Automobile List</h1>
                    <div className="list-group">
                        {automobiles.map(auto => (
                            <a href="#" className="list-group-item list-group-item-action" key={auto.vin}>
                                <h5 className="mb-1">{auto.model.name} - {auto.color} ({auto.year})</h5>
                                <p className="mb-1">VIN: {auto.vin}</p>
                                <p className="mb-1">Manufacturer: {auto.model.manufacturer.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListAutomobiles;
