import React, {
    useEffect,
    useState,
} from 'react'
import {useNavigate} from 'react-router-dom'

function AddSale() {
    const[autos, setAutos] = useState([])
    const[vin, setVin] = useState('')
    const[salesPeople, setSalesPeople] = useState([])
    const[seller, setSeller] = useState('')
    const[customer, setCustomer] = useState([])
    const[buyer, setBuyer] = useState('')
    const[price, setPrice] = useState('')
    
    const fetchAutosData = async () => {
        const autosUrl = 'http://localhost:8100/api/automobiles'
        const response = await fetch(autosUrl)
        if (response.ok) {
            const data = await response.json()
            setAutos(data.autos)
        } 
    }
    const fetchSalespeopleData = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople'
        const response = await fetch(salespeopleUrl)
        if (response.ok) {
            const data = await response.json()
            setSalesPeople(data.salesperson)
        }
    }
    const fetchCustomersData = async () => {
        const customersUrl = 'http://localhost:8090/api/customers'
        const response = await fetch(customersUrl)
        if (response.ok) {
            const data = await response.json()
            setCustomer(data.customer)
        }
    }
    const handlePriceChange = (e) => {
        const value = e.target.value
        setPrice(value)
    }
    const handleVinChange = (e) => {
        const value = e.target.value
        setVin(value)
    }

    const handleSellerChange = (e) => {
        const value = e.target.value
        setSeller(value)
    }

    const handleBuyerChange = (e) => {
        const value = e.target.value
        setBuyer(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {}
        data.automobile = vin
        data.salesperson = seller
        data.customer = buyer
        data.price = price
        const saleUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(saleUrl, fetchConfig)
        if (response.ok) {
            setVin('')
            setSeller('')
            setBuyer('')
            setPrice('')
            // Navigate('/')
        }
    }
    useEffect(() => {
        fetchAutosData()
        fetchSalespeopleData()
        fetchCustomersData()
    }, [])


return (
    <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
            <form onSubmit={handleSubmit} id="record-sale-form">
            <div className="mb-3">
                <select onChange={handleVinChange} value={vin} required name="vin" id="vin" className="form-select">
                    <option value=''>Automobile VIN</option>
                    {autos.map((car) => {
                    return (
                        <option key={car.id} value={car.vin}>{car.vin}</option> 
                    )
                    })}
                </select>
            </div>
            <div className="mb-3">
                <select onChange={handleSellerChange} value={seller} required name="seller" id="seller" className="form-select">
                    <option value=''>Salesperson</option>
                    {salesPeople.map((seller) => {
                    return (
                        <option key={seller.id} value={seller.id}>ID {seller.employee_id} - {seller.first_name} {seller.last_name}</option> 
                    )
                    })}
                </select>
            </div>
            <div className="mb-3">
                <select onChange={handleBuyerChange} value={buyer} required name="buyer" id="buyer" className="form-select">
                    <option value=''>Customer</option>
                    {customer.map((buyer) => {
                    return (
                        <option key={buyer.id} value={buyer.id}> {buyer.lastName}{buyer.first_name}</option> 
                    )
                    })}
                </select>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handlePriceChange} value={price} placeholder="price" required type="number" name="price" id="price" className="form-control" />
                <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
            </form>
        </div>
        </div>
    </div>
)

}
export default AddSale