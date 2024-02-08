import {useState, useEffect} from 'react'


function ListSales() {
    const [sales, setSales] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales')
        if (response.ok) {
            const data = await response.json()
            setSales(data.sale)
        } else {
            console.error("could not get list of sales")
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div>
            <h1>Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson employee ID</th>
                        <th>Salesperson name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => {
                        return (
                    <tr key={sale.id} className="text-lxl-center">
                        <td>{sale.salesperson.employee_id}</td>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>${sale.price}</td>
                    </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default ListSales