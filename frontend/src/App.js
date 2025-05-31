// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import CarList from './components/CarList';
import AddCar from './components/AddCar';
import BookCar from './components/BookCar';
import MakePayment from './components/MakePayment';
import Login from './components/Login';
function App() {
  return (
      <Router>
        <nav>
  <Link to="/">Cars</Link> | 
  <Link to="/add-car">Add Car</Link> | 
  <Link to="/register">Register</Link> | 
  <Link to="/book">Book</Link> | 
  <Link to="/pay">Pay</Link> | 
  <Link to="/login">Login</Link>
</nav>
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/book" element={<BookCar />} />
          <Route path="/pay" element={<MakePayment />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
