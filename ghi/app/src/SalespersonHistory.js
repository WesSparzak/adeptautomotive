import {useState, useEffect} from 'react'


function SalespersonHistory() {
    const [sales, setSales] = useState([])
    const [salesPerson, setSalesperson] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const getSalesData = async () => {
        const response = await fetch('http://localhost:8090/api/sales')
        if (response.ok) {
            const data = await response.json()
            setSales(data.sale)
        } else {
            console.error("could not get list of sales")
        }
    } 

    const getSalespersonData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople')
        if (response.ok) {
            const data = await response.json()
            setSalesperson(data.salespeople)
        } else {
            console.error("could not get list of salespeople")
        } 
    }
        
    const handleFilterChange = (e) => {
        setFilterValue(e.target.value)
        console.log(e.target.value)
    }

    const filteredSalesperson = sales.filter((sale) => 
        sale.salesperson.first_name.includes(filterValue) || sale.salesperson.last_name.includes(filterValue))



    useEffect(() => {
        getSalesData()
        getSalespersonData()
    }, [])
    return (
        <div>
            <h1>Salesperson History</h1>
            <form id="salesperson-filter-form">
                <div className="form-floating mb-3">
                <input onChange={handleFilterChange} placeholder="enter salesperson"  className="form-control" />
                <label htmlFor="salesperson">search sales by salesperson</label>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSalesperson
                    .map(sale => {
                        return (
                    <tr key={sale.id} className="text-lxl-center">
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
export default SalespersonHistory