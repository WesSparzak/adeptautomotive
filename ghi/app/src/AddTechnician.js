import React, {
    useState,
}from 'react'
import {useNavigate} from 'react-router-dom'



function AddTechnician() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [employeeId, setEmployeeId] = useState("")
    const navigate = useNavigate()
    const handleFirstNameChange = (e) => {
        const value = e.target.value
        setFirstName(value)
    }
    const handleLastNameChange = (e) => {
        const value = e.target.value
        setLastName(value)
    }
    const handleEmployeeIdChange = (e) => {
        const value = e.target.value
        setEmployeeId(value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {}
        data.first_name = firstName
        data.last_name = lastName
        data.technician_id = employeeId
        const technicianUrl = 'http://localhost:8080/service_rest/technicians/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(technicianUrl, fetchConfig)
        if (response.ok) {
            setFirstName('')
            setLastName('')
            setEmployeeId('')
            // navigate()
        }
}
return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Add a Technician</h1>
            <form onSubmit={handleSubmit} id="create-shoes-form">
            <div className="form-floating mb-3">
                <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
                <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
                <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleEmployeeIdChange} value={employeeId} placeholder="Employee ID" required type="text" name="employeeId" id="employeeId" className="form-control" />
                <label htmlFor="employeeId">Employee ID</label>
            </div>
            <button className="btn btn-primary" type="submit">Create</button>
            </form>
        </div>
        </div>
    </div>
)
}
export default AddTechnician
