import React, {
    useEffect, 
    useState,
} from 'react'
import {useNavigate} from 'react-router-dom'

function AddCustomer() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate()

    const handleFirstNameChange = (e) => {
        const value = e.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (e) => {
        const value = e.target.value
        setLastName(value)
    }

    const handleAddressChange = (e) => {
        const value = e.target.value
        setAddress(value)
    }

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value
        setPhoneNumber(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {}
        data.first_name = firstName
        data.last_name = lastName
        data.address = address
        data.phone_number = phoneNumber
        const customerUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(customerUrl, fetchConfig)
        if (response.ok) {
            setFirstName('')
            setLastName('')
            setAddress('')
            setPhoneNumber('')
            navigate("/customers")
        }
}


return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Add a Customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
                <input onChange={handleFirstNameChange} value={firstName} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
                <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
                <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleAddressChange} value={address} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Home Address</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handlePhoneNumberChange} value={phoneNumber} placeholder="phoneNumber" required type="text" name="phoneNumber" id="phoneNumber" className="form-control" />
                <label htmlFor="phoneNumber">Phone Number - <i>(XXX) XXX-XXXX</i> - <strong>US PHONE NUMBERS ONLY</strong></label>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
            </form>
        </div>
        </div>
    </div>
)
}
export default AddCustomer
