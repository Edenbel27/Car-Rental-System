import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../provider/AuthProvider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton.tsx";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        My Rented Cars
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Card
              key={idx}
              className="bg-neutral-800 text-white flex flex-col shadow-lg border-0 animate-pulse"
            >
              <CardHeader>
                <Skeleton className="h-6 w-32 mx-auto mb-2 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-40 mb-4 rounded border border-neutral-900" />
                <Skeleton className="h-4 w-24 mb-2 rounded" />
                <Skeleton className="h-4 w-20 mb-2 rounded" />
              </CardContent>
            </Card>
          ))
        ) : bookings.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-20">
            You have not rented any cars yet.
          </div>
        ) : (
          bookings.map((booking) => (
            <Card
              key={booking.id}
              className="bg-neutral-800 text-white flex flex-col shadow-lg border-0"
            >
              <CardHeader>
                <CardTitle className="text-xl text-center font-semibold">
                  {booking.car.make} {booking.car.model}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src="/car.jpg"
                  alt={booking.car.model}
                  className="w-full h-40 object-cover rounded mb-4 border border-neutral-900"
                />
                <div className="mb-2 text-gray-300">
                  Price/Day:{" "}
                  <span className="font-medium text-white">
                    ${booking.car.pricePerDay}
                  </span>
                </div>
                <div className="mb-2 text-gray-300">
                  Booking Date:{" "}
                  <span className="font-medium text-white">
                    {new Date(booking.bookingDate).toLocaleString()}
                  </span>
                </div>
                <div className="mb-2 text-gray-300">
                  Return Date:{" "}
                  <span className="font-medium text-white">
                    {booking.returnDate
                      ? new Date(booking.returnDate).toLocaleString()
                      : "Not returned yet"}
                  </span>
                </div>
              </CardContent>
              <div className="p-4 border-t border-neutral-700 flex justify-end">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const amount = booking.car.pricePerDay;
                    try {
                      await apiClient.post("/api/payments", {
                        amount,
                        bookingId: booking.id,
                      });
                      alert("Payment successful!");
                      // Remove the booking from the UI after successful payment
                      setBookings((prev) =>
                        prev.filter((b) => b.id !== booking.id)
                      );
                    } catch {
                      alert("Payment failed.");
                    }
                  }}
                  className="w-full flex gap-2"
                >
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold w-full"
                  >
                    Pay ${booking.car.pricePerDay}
                  </button>
                </form>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
