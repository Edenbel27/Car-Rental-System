import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useAuth } from "../provider/AuthProvider";

interface Booking {
  id: number;
  car: {
    id: number;
    make: string;
    model: string;
    pricePerDay: number;
  };
  bookingDate: string;
  returnDate: string | null;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}

const AdminBookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    setLoading(true);
    apiClient
      .get<Booking[]>("/api/bookings/all")
      .then((res) => setBookings(res.data))
      .catch(() => setError("Failed to load bookings."))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">All Bookings</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-20">No bookings found.</div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-neutral-800 text-white p-6 rounded shadow-lg flex flex-col gap-2">
              <div className="font-semibold">{booking.car.make} {booking.car.model}</div>
              <div>Booked by: {booking.user.username} ({booking.user.email})</div>
              <div>Price/Day: ${booking.car.pricePerDay}</div>
              <div>Booking Date: {new Date(booking.bookingDate).toLocaleString()}</div>
              <div>Return Date: {booking.returnDate ? new Date(booking.returnDate).toLocaleString() : "Not returned yet"}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBookingsPage;
