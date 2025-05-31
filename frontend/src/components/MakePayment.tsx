import { useState } from 'react';

function MakePayment() {
    const [payment, setPayment] = useState({ amount: '', bookingId: '' });

    const handleChange = (e:any) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        await fetch('/api/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment),
        });
        alert('Payment processed');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Make Payment</h3>
            <input name="bookingId" placeholder="Booking ID" onChange={handleChange} required />
            <input name="amount" placeholder="Amount" onChange={handleChange} required />
            <button type="submit">Pay</button>
        </form>
    );
}

export default MakePayment;
