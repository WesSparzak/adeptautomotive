import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddServiceAppointment() {
    const [dateAndTime, setDateAndTime] = useState('');
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('');
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [technicianId, setTechnicianId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            date_time: dateAndTime,
            reason: reason,
            status: 'pending',
            vin: vin,
            customer: customer,
            technician_id: technicianId
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
                            <input type="text" className="form-control" id="technicianId" value={technicianId} onChange={e => setTechnicianId(e.target.value)} placeholder="Technician ID" required />
                            <label htmlFor="technicianId">Technician ID</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddServiceAppointment;
