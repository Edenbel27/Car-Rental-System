import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import {
  Card
} from "../../components/ui/card";
import { useAuth } from "../../provider/AuthProvider";

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
}

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    apiClient
      .get<Booking[]>(`/api/bookings/user/${user.id}`)
      .then((res) => setBookings(res.data))
      .catch(() => setError("Failed to load your bookings."))
      .finally(() => setLoading(false));
  }, [user]);

  const handlePay = async (booking: Booking) => {
    const amount = booking.car.pricePerDay;
    try {
      await apiClient.post("/api/payments", {
        amount,
        bookingId: booking.id,
      });
      alert("Payment successful!");
      // Remove the booking from the UI after successful payment
      setBookings((prev) => prev.filter((b) => b.id !== booking.id));
    } catch {
      alert("Payment failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black py-12 px-4 flex flex-col transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
        Welcome{user?.username ? `, ${user.username}` : ""}!
      </h2>
      <p className="mb-8 text-shadow-md text-shadow-white/10 text-neutral-700 dark:text-neutral-300 max-w-2xl">
        Discover the freedom and flexibility of renting a car! Whether you need a vehicle for a weekend getaway, a business trip, or simply want to explore new places at your own pace, our car rental service offers a convenient and affordable solution tailored to your needs.
      </p>

      <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-8">
        My Rented Cars
      </h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-[80%]">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-neutral-400 text-xs">
              <th className="p-2">Booking Number</th>
              <th className="p-2">Booking Date</th>
              <th className="p-2">Model</th>
              <th className="p-2">Maker</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="dark:bg-neutral-800 bg-neutral-800/10 rounded-xl"
              >
                <td className="p-2 font-mono text-xs">#{booking.id}</td>
                <td className="p-2">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="p-2">{booking.car.model}</td>
                <td className="p-2">{booking.car.make}</td>
                <td className="p-2">${booking.car.pricePerDay}</td>
                <td className="p-2 space-x-2">
                  <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1 rounded font-semibold text-xs">
                    View
                  </button>
                  <button
                    onClick={() => handlePay(booking)}
                    className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1 rounded font-semibold text-xs"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-4">
                  You have not rented any cars yet.
                </td>
              </tr>
            )}
            {loading &&
              Array.from({ length: 3 }).map((_, idx) => (
                <tr>
                  <td key={idx} colSpan={6}>
                    <Card className="bg-neutral-100 rounded-none dark:bg-neutral-800 text-black dark:text-white flex flex-col border-0 animate-pulse transition-colors duration-300"></Card>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
