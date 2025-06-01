import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useAuth } from "../../provider/AuthProvider";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../../components/ui/table";

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
  const [viewMode, setViewMode] = useState("card");

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    apiClient
      .get<Booking[]>(`/api/bookings/user/${user.id}`)
      .then((res) => {
        console.log(res.data);

        setBookings(res.data);
      })
      .catch((err) => {
        setError("Failed to load your bookings.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const diffDays = (booking: Booking) => {
    const bookingDate = new Date(booking.bookingDate);
    const today = new Date();
    const diffTime = today.getTime() - bookingDate.getTime();
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    return diffDays;
  };

  const handlePay = async (booking: Booking) => {
    const amount = booking.car.pricePerDay * diffDays(booking);
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
        Discover the freedom and flexibility of renting a car! Whether you need
        a vehicle for a weekend getaway, a business trip, or simply want to
        explore new places at your own pace, our car rental service offers a
        convenient and affordable solution tailored to your needs.
      </p>

      <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-8">
        My Rented Cars
      </h3>
      <div className="mb-6">
        <Button
          onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
          className="w-full rounded-full bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-200 dark:to-gray-400 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition"
        >
          {viewMode === "card" ? "Switch to Table View" : "Switch to Card View"}
        </Button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white p-6 rounded shadow-lg flex flex-col gap-2"
            >
              <div className="font-semibold text-lg">
                {booking.car.make} {booking.car.model}
              </div>
              <div className="text-sm text-gray-500">
                Booking ID: #{booking.id}
              </div>
              <div className="text-sm">
                Booking Date:{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </div>
              <div className="text-sm">
                Price/Day: ${booking.car.pricePerDay}
              </div>
              <div className="text-sm">
                Total Amount: ${diffDays(booking) * booking.car.pricePerDay}
              </div>
              <div className="flex flex-wrap gap-2 justify-between mt-4">
                <Button className="w-full rounded-full bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-200 dark:to-gray-400 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition">
                  View
                </Button>
                <Button
                  onClick={() => handlePay(booking)}
                  className="w-full rounded-full bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-200 dark:to-gray-400 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition"
                >
                  Pay
                </Button>
              </div>
            </div>
          ))}
          {bookings.length === 0 && !loading && (
            <div className="text-center text-gray-400 py-4">
              You have not rented any cars yet.
            </div>
          )}
          {loading &&
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white p-6 rounded shadow-lg animate-pulse"
              ></div>
            ))}
        </div>
      ) : (
        <Table className="w-full text-left border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow>
              <TableCell>Booking Number</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Maker</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>#{booking.id}</TableCell>
                <TableCell>
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{booking.car.model}</TableCell>
                <TableCell>{booking.car.make}</TableCell>
                <TableCell>
                  ${diffDays(booking) * booking.car.pricePerDay}
                </TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button className="w-full rounded-full bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-200 dark:to-gray-400 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition">
                      View
                    </Button>
                    <Button
                      onClick={() => handlePay(booking)}
                      className="w-full rounded-full bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-200 dark:to-gray-400 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition"
                    >
                      Pay
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && !loading && (
              <TableRow>
                <TableCell>
                  <div className="text-center text-gray-400 py-4">
                    You have not rented any cars yet.
                  </div>
                </TableCell>
              </TableRow>
            )}
            {loading &&
              Array.from({ length: 3 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="bg-neutral-100 rounded-none dark:bg-neutral-800 text-black dark:text-white flex flex-col border-0 animate-pulse transition-colors duration-300"></div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserDashboard;
