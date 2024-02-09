import React, { useState, useEffect } from 'react';

function ListTechnicians() {
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const fetchTechnicians = async () => {
            const url = 'http://localhost:8080/service_rest/technicians/';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTechnicians(data.technicians); 
            } catch (error) {
                console.error("Could not fetch technicians:", error);
            }
        };

        fetchTechnicians();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Technician List</h1>
                    <div className="list-group">
                        {technicians.map(technician => (
                            <a href="#" className="list-group-item list-group-item-action" key={technician.technician_id}>
                                <h5 className="mb-1">{technician.first_name} {technician.last_name}</h5>
                                <p className="mb-1">Technician ID: {technician.technician_id}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListTechnicians;
