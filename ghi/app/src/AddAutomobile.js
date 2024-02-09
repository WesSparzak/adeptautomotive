import React, { useState, useEffect } from 'react';

function AddAutomobile() {
    const [models, setModels] = useState([]);
    const [formData, setFormData] = useState({
        model_id: '',
        color: '',
        year: '',
        vin: ''
    });

    useEffect(() => {
        const fetchModels = async () => {
            const response = await fetch('http://localhost:8100/api/models/');
            const data = await response.json();
            setModels(data.models);
        };

        fetchModels();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8100/api/automobiles/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Clear the form
            setFormData({
                model_id: '',
                color: '',
                year: '',
                vin: ''
            });

            alert('Automobile added successfully!');
        } catch (error) {
            console.error("Could not add the automobile:", error);
            alert('Failed to add automobile.');
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add Automobile</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="model_id" className="form-label">Model</label>
                            <select
                                id="model_id"
                                name="model_id"
                                className="form-select"
                                value={formData.model_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a Model</option>
                                {models.map(model => (
                                    <option key={model.id} value={model.id}>
                                        {model.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="color" className="form-label">Color</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                className="form-control"
                                value={formData.color}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">Year</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                className="form-control"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="vin" className="form-label">VIN (Vehicle Identification Number)</label>
                            <input
                                type="text"
                                id="vin"
                                name="vin"
                                className="form-control"
                                value={formData.vin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Automobile</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAutomobile;
