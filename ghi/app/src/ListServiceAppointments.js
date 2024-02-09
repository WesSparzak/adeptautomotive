import React, { useState, useEffect } from 'react';

function ListServiceAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const url = 'http://localhost:8080/service_rest/appointments/';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // thank you so much for teaching us about filtering RIGHT when I needed it -Wes
            const activeAppointments = data.appointments.filter(appointment => appointment.status !== 'finished' && appointment.status !== 'cancelled');
            setAppointments(activeAppointments);
        } catch (error) {
            console.error("Could not fetch appointments:", error);
        }
    };


    async function updateAppointmentStatus(newStatus, appointmentId) {
        const url = `http://localhost:8080/service_rest/appointments/${appointmentId}/update_status/`;
        const fetchConfig = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        };
        try {
            const response = await fetch(url, fetchConfig);
            if (!response.ok) {
                throw new Error(`Failed to update appointment status: ${response.statusText}`);
            }
            console.log(`Successfully updated appointment ${appointmentId} to ${newStatus}`);
            await fetchAppointments(); // Reload the appointments list
        } catch (error) {
            console.error("Could not update the appointment status:", error);
        }
    }



    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Service Appointments List</h1>
                    <ul className="list-group">
                        {appointments.map(appointment => (
                            <li className="list-group-item" key={appointment.id}>
                                <h5 className="mb-1">Appointment for {appointment.customer}</h5>
                                <p className="mb-1">Date & Time: {appointment.date_time}</p>
                                <p className="mb-1">Status: {appointment.status}</p>
                                <p className="mb-1">Reason: {appointment.reason}</p>
                                <p className="mb-1">Technician ID: {appointment.technician_id}</p>
                                <p className="mb-1">VIN: {appointment.vin}</p>
                                <button className="btn btn-success me-2" onClick={()=>{updateAppointmentStatus('finished', appointment.id)}}>Set to Finished</button>
                                <button className="btn btn-danger" onClick={() => updateAppointmentStatus('cancelled', appointment.id)}>Cancel</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ListServiceAppointments;






// const updateAppointmentStatus = async (appointmentId, newStatus) => {
//     const url = `http://localhost:8080/service_rest/appointments/${appointmentId}/update_status/`;
//     console.log(`Updating appointment ${appointmentId} to ${newStatus}`);
//     try {
//         const response = await fetch(url, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ status: newStatus }),
//         });
//         if (!response.ok) {
//             throw new Error(`Failed to update appointment status: ${response.statusText}`);
//         }
//         console.log(`Successfully updated appointment ${appointmentId} to ${newStatus}`);
//         fetchAppointments();
//     } catch (error) {
//         console.error("Could not update the appointment status:", error);
//     }
// };
