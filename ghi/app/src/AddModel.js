import React, { useState } from 'react';

function AddModel() {
    const [name, setName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [manufacturerId, setManufacturerId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8100/api/models/';
        const payload = { name, picture_url: pictureUrl, manufacturer_id: manufacturerId };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Model added successfully');
                setName('');
                setPictureUrl('');
                setManufacturerId('');
            } else {
                console.error('Failed to add model');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add a Vehicle Model</h2>
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
                <div>
                    <label>Picture URL:</label>
                    <input
                        type="text"
                        value={pictureUrl}
                        onChange={(e) => setPictureUrl(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Manufacturer ID:</label>
                    <input
                        type="number"
                        value={manufacturerId}
                        onChange={(e) => setManufacturerId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Model</button>
            </form>
        </div>
    );
}

export default AddModel;
