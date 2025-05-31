import { useState } from 'react';

function BookCar() {
    const [userId, setUserId] = useState('');
    const [carId, setCarId] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        await fetch(`/api/bookings/book?userId=${userId}&carId=${carId}`, {
            method: 'POST',
        });
        alert('Car booked');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Book a Car</h3>
            <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            <input placeholder="Car ID" value={carId} onChange={(e) => setCarId(e.target.value)} required />
            <button type="submit">Book</button>
        </form>
    );
}

export default BookCar;
