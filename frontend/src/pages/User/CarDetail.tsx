import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../provider/AuthProvider";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [mainImg, setMainImg] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Booking state
  const [pickup, setPickup] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const { user } = useAuth();

  // WebSocket ref for booking
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiClient
      .get(`/api/cars/${id}`)
      .then((res) => {
        setCar(res.data);
        setMainImg(res.data.imageUrl || "/car.jpg");
      })
      .catch(() => {
        setError("Failed to load car details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8080/ws/cars");
    return () => {
      wsRef.current?.close();
    };
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!car) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 px-2 md:px-8 flex flex-col items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Car details and gallery */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-6 flex flex-col gap-6">
          <div className="relative rounded-xl overflow-hidden mb-4">
            <img
              src={mainImg}
              alt={car.model}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="absolute top-4 left-4 flex gap-2">
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
          <div className="flex gap-2 mb-4">
            {(car.images || [car.imageUrl || "/car.jpg"]).map(
              (img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  className={`w-20 h-14 object-cover rounded-lg border-2 cursor-pointer ${
                    mainImg === img ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setMainImg(img)}
                />
              )
            )}
          </div>
          <div className="mb-2 text-gray-500 dark:text-gray-400 text-sm font-medium">
            {car.make}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-black dark:text-white">
              {car.model}
            </span>
            <span className="text-yellow-400 text-xl">★ {car.rating || 5}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Model</span>
              <span className="font-semibold text-black dark:text-white">
                {car.model}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Make</span>
              <span className="font-semibold text-black dark:text-white">
                {car.make}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Price Per Day</span>
              <span className="font-semibold text-black dark:text-white">
                ${car.pricePerDay?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Available</span>
              <span className="font-semibold text-black dark:text-white">
                {car.available ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
        {/* Right: Booking and map (static) */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg text-black dark:text-white">
                Booking car
              </span>
              <span className="font-bold text-xl text-black dark:text-white">
                ${car.pricePerDay?.toFixed(2) || car.price?.toFixed(2) || "-"}
                <span className="text-base text-gray-500 font-normal">
                  {" "}
                  / day
                </span>
              </span>
            </div>
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src={car.imageUrl || "/car.jpg"}
                alt="map"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">
                  Return Date
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-md px-3 py-2 border border-gray-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between">
                <span>Total Day</span>
                <span>
                  {pickup
                    ? (() => {
                        const now = new Date();
                        const returnDate = new Date(pickup);
                        const diffMs = returnDate.getTime() - now.getTime();
                        const diffDays = Math.max(
                          0,
                          Math.ceil(diffMs / (1000 * 60 * 60 * 24))
                        );

                        return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
                      })()
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <span>
                  {pickup && car.pricePerDay
                    ? (() => {
                        const now = new Date();
                        const returnDate = new Date(pickup);
                        const diffMs = returnDate.getTime() - now.getTime();
                        const diffDays = Math.max(
                          1,
                          Math.ceil(diffMs / (1000 * 60 * 60 * 24))
                        );
                        const subtotal = car.pricePerDay * diffDays;
                        return `$${subtotal.toFixed(2)}`;
                      })()
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>$15.20</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance</span>
                <span>$60</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 font-bold text-lg">
              <span>Total price</span>
              <span>
                {pickup && car.pricePerDay
                  ? (() => {
                      const now = new Date();
                      const returnDate = new Date(pickup);
                      const diffMs = returnDate.getTime() - now.getTime();
                      const diffDays = Math.max(
                        1,
                        Math.ceil(diffMs / (1000 * 60 * 60 * 24))
                      );
                      const subtotal = car.pricePerDay * diffDays;
                      const total = subtotal + 15.2 + 60;
                      return `$${total.toFixed(2)}`;
                    })()
                  : "-"}
              </span>
            </div>
            {bookingError && (
              <div className="text-red-500 text-sm mb-2">{bookingError}</div>
            )}
            {bookingSuccess && (
              <div className="text-green-600 text-sm mb-2">
                {bookingSuccess}
              </div>
            )}
            <button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 font-semibold transition disabled:opacity-60"
              disabled={bookingLoading || !pickup || !user?.id}
              onClick={async () => {
                setBookingError("");
                setBookingSuccess("");
                setBookingLoading(true);
                try {
                  // Book via WebSocket if connected
                  if (
                    wsRef.current &&
                    wsRef.current.readyState === WebSocket.OPEN
                  ) {
                    wsRef.current.send(
                      JSON.stringify({
                        action: "book",
                        userId: user?.id,
                        carId: car.id,
                        rDateTime: pickup, // ISO string, backend should parse
                      })
                    );
                    setBookingSuccess("Booking sent via WebSocket!");
                  } else {
                    setBookingError(
                      "WebSocket not connected. Please try again."
                    );
                  }
                } catch (err: any) {
                  setBookingError("Booking failed");
                } finally {
                  setBookingLoading(false);
                }
              }}
            >
              {bookingLoading ? "Processing..." : "Rent car (WebSocket)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
