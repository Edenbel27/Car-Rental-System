import { useEffect, useState } from 'react';

interface Car {
    id: number;
    model: string;
    available: boolean;
}

function CarList() {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        fetch('/api/cars')
            .then(res => res.json())
            .then(data => setCars(data));
    }, []);

    return (
        <div>
            <h3>Available Cars</h3>
            <ul>
                {cars.map(car => (
                    <li key={car.id}>{car.model} - {car.available ? 'Available' : 'Unavailable'}</li>
                ))}
            </ul>
        </div>
    );
}

export default CarList;
