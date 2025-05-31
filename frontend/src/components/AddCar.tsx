import {type FormEvent, useState} from 'react';

function AddCar() {
    const [car, setCar] = useState({ model: '', available: true });

    const handleChange = (e:any) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        await fetch('/api/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car),
        });
        alert('Car added');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Car</h3>
            <input name="model" placeholder="Model" onChange={handleChange} required />
            <button type="submit">Add Car</button>
        </form>
    );
}

export default AddCar;
