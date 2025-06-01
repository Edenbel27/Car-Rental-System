import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton.tsx";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

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

  const wsRef = useRef<WebSocket | null>(null);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black py-12 px-4 flex flex-col items-center transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-8">
        Available Cars
      </h1>
      <div className="w-full max-w-3xl mb-10 flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by brand or model..."
          className="w-full md:w-96 rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow transition-colors duration-300"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <Card
              key={idx}
              className="bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white flex flex-col shadow-lg border-0 animate-pulse transition-colors duration-300"
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
              className="bg-neutral-100 z-10 dark:bg-neutral-800 text-black dark:text-white overflow-clip flex flex-col shadow-lg border-0 transition-colors duration-300 relative rounded-2xl"
            >
              {/* Car image as background */}
              <div className="relative w-full -z-10 flex items-center justify-center">
                <img
                  src={"/car.jpg"}
                  alt={car.model}
                  className="w-full h-50 -mt-7 object-cover z-0"
                />
                <div className="flex z-10 absolute top-0 left-3 justify-between items-start mb-2">
                  <div className="flex gap-2">
                    {car.available && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white shadow">
                        Available
                      </span>
                    )}
                    {!car.available && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white shadow">
                        Rented
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Top badges */}
              <div className="px-4 pb-2 flex flex-col gap-1 relative z-10">
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {car.make}
                </div>
                <div className="text-lg font-bold text-black dark:text-white">
                  {car.model}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold text-black dark:text-white">
                    ${car.pricePerDay.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    /day
                  </span>
                </div>
              </div>
              <CardFooter>
                <Button
                  className="w-full bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white transition rounded-full font-semibold"
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
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 max-w-md w-full text-black dark:text-white relative shadow-2xl transition-colors duration-300">
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
              className="w-full mt-4 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white rounded-full font-semibold"
              onClick={() => navigate(`/car/${selectedCar.id}`)}
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
