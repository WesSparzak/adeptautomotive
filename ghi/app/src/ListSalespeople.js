import {useState, useEffect} from 'react'


function ListSalespeople() {
    const [salesPeople, setSalesPeople] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople')
        if (response.ok) {
            const data = await response.json()
            setSalesPeople(data.salesperson)
        } else {
            console.error("could not get list of salespeople")
        }
    }
    useEffect(() => {
        getData()
    }, [])
console.log(salesPeople)
    async function handleDelete(id) {
        const url = `http://localhost:8090/api/salespeople/${id}/`
        const fetchConfig = {
            method: "DELETE"
        }
        await fetch(url, fetchConfig)
        alert("remove this salesperson from the list?")
        await getData()
    } 
    return (
        <div>
            <h1>Salespeople</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salesPeople.map((person) => {
                        return (
                    <tr key={ person.id } className="text-lxl-center">
                        <td>{ person.employee_id }</td>
                        <td>{ person.first_name }</td>
                        <td>{ person.last_name }</td>
                    </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default ListSalespeople