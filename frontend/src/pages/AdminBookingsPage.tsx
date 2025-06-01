import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { Table as T, IdCard } from "lucide-react";
import { useAuth } from "../provider/AuthProvider";
import { Input } from "../components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../components/ui/table";

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
  const [filter, setFilter] = useState("");
  const [viewMode, setViewMode] = useState("card");

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    setLoading(true);
    apiClient
      .get<Booking[]>("/api/bookings/all")
      .then((res) => setBookings(res.data))
      .catch(() => setError("Failed to load bookings."))
      .finally(() => setLoading(false));
  }, [user]);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.car.make.toLowerCase().includes(filter.toLowerCase()) ||
      booking.car.model.toLowerCase().includes(filter.toLowerCase()) ||
      booking.user.username.toLowerCase().includes(filter.toLowerCase())
  );

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black py-12 px-4 flex flex-col items-center transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-8">
        All Bookings
      </h1>
      <div className="mb-6 w-full max-w-6xl flex justify-between items-center">
        <Input
          type="text"
          placeholder="Filter by car make, model, or username"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
        />
        <button
          onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
          className="ml-4 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {viewMode === "card" ? <T /> : <IdCard />}
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div className="text-black dark:text-white">Loading...</div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No bookings found.
        </div>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white p-6 rounded shadow-lg flex flex-col gap-2"
            >
              <div className="font-semibold">
                {booking.car.make} {booking.car.model}
              </div>
              <div>
                Booked by: {booking.user.username} ({booking.user.email})
              </div>
              <div>Price/Day: ${booking.car.pricePerDay}</div>
              <div>
                Booking Date: {new Date(booking.bookingDate).toLocaleString()}
              </div>
              <div>
                Return Date:{" "}
                {booking.returnDate
                  ? new Date(booking.returnDate).toLocaleString()
                  : "Not returned yet"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table className="w-full max-w-6xl">
          <TableHeader>
            <TableRow>
              <TableCell>Car</TableCell>
              <TableCell>Booked By</TableCell>
              <TableCell>Price/Day</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Return Date</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {booking.car.make} {booking.car.model}
                </TableCell>
                <TableCell>
                  {booking.user.username} ({booking.user.email})
                </TableCell>
                <TableCell>${booking.car.pricePerDay}</TableCell>
                <TableCell>
                  {new Date(booking.bookingDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  {booking.returnDate
                    ? new Date(booking.returnDate).toLocaleString()
                    : "Not returned yet"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminBookingsPage;
