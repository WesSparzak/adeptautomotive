import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddServiceAppointment() {
    const [dateAndTime, setDateAndTime] = useState('');
    const [reason, setReason] = useState('');
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [technicians, setTechnicians] = useState([]);
    const [selectedTechnicianId, setSelectedTechnicianId] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchTechnicians = async () => {
            const url = 'http://localhost:8080/service_rest/technicians/';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch technicians');
                } 
                const data = await response.json();
                setTechnicians(data.technicians);
            } catch (error) {
                console.error("Could not fetch technicians:", error);
            }
        };
        fetchTechnicians();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            date_time: dateAndTime,
            reason: reason,
            status: 'pending', // pending is going to be my default status so that I can view all appointments in my appointments list when they're created
            vin: vin,
            customer: customer,
            technician_id: selectedTechnicianId
        };
        const appointmentUrl = 'http://localhost:8080/service_rest/appointments/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(appointmentUrl, fetchConfig);
            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }
            navigate('/serviceappointments');
        } catch (error) {
            console.error("Could not create the appointment:", error);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add Service Appointment</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="form-floating mb-3">
                            <input type="datetime-local" className="form-control" id="dateAndTime" value={dateAndTime} onChange={e => setDateAndTime(e.target.value)} required />
                            <label htmlFor="dateAndTime">Date & Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="reason" value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason" required />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="vin" value={vin} onChange={e => setVin(e.target.value)} placeholder="VIN" required />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="customer" value={customer} onChange={e => setCustomer(e.target.value)} placeholder="Customer Name" required />
                            <label htmlFor="customer">Customer Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select
                                className="form-control"
                                id="technician"
                                value={selectedTechnicianId}
                                onChange={e => setSelectedTechnicianId(e.target.value)}
                                required
                            >
                                <option value="">Select Technician</option>
                                {technicians.map(technician => (
                                    <option key={technician.technician_id} value={technician.technician_id}>
                                        {technician.first_name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="technician">Technician</label>
                        </div>

                        <button type="submit" className="btn btn-primary">Create Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddServiceAppointment;
