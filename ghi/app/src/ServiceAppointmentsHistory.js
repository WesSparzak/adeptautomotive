import React, { useState } from 'react';

function ServiceHistory() {
    const [vin, setVin] = useState('');
    const [appointments, setAppointments] = useState([]);

    const handleVinChange = (e) => {
        setVin(e.target.value);
    };

    const searchAppointmentsByVin = async () => {

        const url = `http://localhost:8080/service_rest/appointments/search_appointments_by_vin/?vin=${vin}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error("Could not fetch appointments:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mt-3">
                    <h2>Service History</h2>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter VIN"
                            value={vin}
                            onChange={handleVinChange}
                        />
                        <button className="btn btn-outline-secondary" onClick={searchAppointmentsByVin}>Search</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ul className="list-group">
                        {appointments.map((appointment) => (
                            <li key={appointment.id} className="list-group-item">
                                <p>Date & Time: {appointment.date_time}</p>
                                <p>Reason: {appointment.reason}</p>
                                <p>Status: {appointment.status}</p>
                                <p>Technician ID: {appointment.technician_id}</p>
                                <p>VIN: {appointment.vin}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ServiceHistory;
