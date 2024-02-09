import React, { useState } from 'react';

function AddManufacturer() {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8100/api/manufacturers/';
        const payload = { name };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Manufacturer added successfully');
                setName('');
            } else {
                console.error('Failed to add manufacturer');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add a Manufacturer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Manufacturer</button>
            </form>
        </div>
    );
}

export default AddManufacturer;
