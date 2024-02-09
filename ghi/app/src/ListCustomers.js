import {useState, useEffect} from 'react'


function ListCustomers() {
    const [customers, setCustomers] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers')
        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customer)
        } else {
            console.error("could not get list of customers")
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <h1>Customers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((person) => {
                        return (
                    <tr key={ person.id } className="text-lxl-center">
                    <td>{ person.first_name }</td>
                    <td>{ person.last_name }</td>
                    <td>{ person.address }</td>
                    <td>{ person.phone_number }</td>
                    </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default ListCustomers