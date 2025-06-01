import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CarList from "./components/CarList.tsx";
import AddCar from "./components/AddCar.tsx";
import RegisterUser from "./components/RegisterUser.tsx";
import BookCar from "./components/BookCar.tsx";
import MakePayment from "./components/MakePayment.tsx";
import { ThemeProvider } from "./provider/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <nav>
          <Link to="/">Cars</Link> | <Link to="/add-car">Add Car</Link> |{" "}
          <Link to="/register">Register</Link> | <Link to="/book">Book</Link> |{" "}
          <Link to="/pay">Pay</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/book" element={<BookCar />} />
          <Route path="/pay" element={<MakePayment />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
