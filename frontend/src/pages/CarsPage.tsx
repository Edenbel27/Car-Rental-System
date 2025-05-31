import { useEffect, useMemo, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useAuth } from "../provider/AuthProvider";
import { Skeleton } from "../components/ui/skeleton.tsx";
import apiClient from "../api/apiClient.ts";

interface Car {
  id: number;
  model: string;
  make: string;
  pricePerDay: number;
  available: boolean;
}

const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [search, setSearch] = useState("");

  const { user } = useAuth();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8080/ws/cars");
    wsRef.current.onopen = () => console.log("Car WebSocket connected");
    wsRef.current.onclose = () => console.log("Car WebSocket disconnected");
    wsRef.current.onerror = (e) => console.error("Car WebSocket error", e);
    wsRef.current.onmessage = (event) => {
      try {
        const carsData = JSON.parse(event.data);
        setCars(carsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to parse cars data.");
        setLoading(false);
      }
    };
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const filteredCars = useMemo(
    () =>
      cars.filter(
        (car) =>
          car.model.toLowerCase().includes(search.toLowerCase()) ||
          car.make.toLowerCase().includes(search.toLowerCase())
      ),
    [cars, search]
  );

  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Available Cars
      </h1>
      <div className="w-full max-w-3xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by brand or model..."
          className="w-full md:w-96 rounded-md px-4 py-2 bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <Card
              key={idx}
              className="bg-neutral-800 text-white flex flex-col shadow-lg border-0 animate-pulse"
            >
              <CardHeader>
                <Skeleton className="h-6 w-32 mx-auto mb-2 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-48 mb-4 rounded border border-neutral-900" />
                <Skeleton className="h-4 w-24 mb-2 rounded" />
                <Skeleton className="h-4 w-20 mb-2 rounded" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full rounded-full" />
              </CardFooter>
            </Card>
          ))
        ) : filteredCars.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-20">
            No cars found.
          </div>
        ) : (
          filteredCars.map((car) => (
            <Card
              key={car.id}
              className="bg-neutral-800 text-white flex flex-col shadow-lg border-0"
            >
              <CardHeader>
                <CardTitle className="text-xl text-center font-semibold">
                  {car.make} {car.model}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={"/car.jpg"}
                  alt={car.model}
                  className="w-full h-48 object-cover rounded mb-4 border border-neutral-900"
                />
                <div className="mb-2 text-gray-300">
                  Price/Day:{" "}
                  <span className="font-medium text-white">
                    ${car.pricePerDay}
                  </span>
                </div>
                <div className="mb-2 text-gray-300">
                  Status:{" "}
                  <span
                    className={
                      car.available ? "text-green-400" : "text-red-400"
                    }
                  >
                    {car.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-black text-white hover:bg-white hover:text-black transition rounded-full font-semibold"
                  disabled={!car.available}
                  onClick={() => setSelectedCar(car)}
                >
                  {car.available ? "Choose This Car" : "Not Available"}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {selectedCar && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-black relative shadow-2xl">
            <button
              className="absolute top-2 right-4 text-2xl hover:text-red-500"
              onClick={() => setSelectedCar(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Confirm Your Choice
            </h2>
            <img
              src={"/car.jpg"}
              alt={selectedCar.model}
              className="w-full h-40 object-cover rounded mb-4 border border-neutral-200"
            />
            <div className="mb-2 font-semibold text-center">
              {selectedCar.make} {selectedCar.model}
            </div>
            <div className="mb-2 text-center">
              Price/Day:{" "}
              <span className="font-medium">${selectedCar.pricePerDay}</span>
            </div>
            <Button
              className="w-full mt-4 bg-black text-white hover:bg-neutral-800 rounded-full font-semibold"
              onClick={async () => {
                try {
                  if (
                    wsRef.current &&
                    wsRef.current.readyState === WebSocket.OPEN
                  ) {
                    wsRef.current.send(
                      JSON.stringify({
                        action: "book",
                        userId: user?.id,
                        carId: selectedCar.id,
                      })
                    );
                    alert(
                      `Successfully booked the ${selectedCar.make} ${selectedCar.model}!`
                    );
                    // Optionally update car list to reflect booking
                    setCars((prev) =>
                      prev.map((car) =>
                        car.id === selectedCar.id
                          ? { ...car, available: false }
                          : car
                      )
                    );
                    // Notify the WebSocket to refresh cars list
                    wsRef.current.send(JSON.stringify({ action: "refresh" }));
                  } else {
                    alert("WebSocket not connected. Please try again.");
                  }
                } catch (err) {
                  alert("Failed to book the car. Please try again.");
                }
                setSelectedCar(null);
              }}
            >
              Confirm Selection
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsPage;
