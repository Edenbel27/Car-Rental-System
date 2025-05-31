import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex fixed z-20 items-center justify-between w-full mx-auto px-6 py-4 bg-gradient-to-b from-neutral-950 to-black text-white shadow-md">
      <Link to={"/"} className="font-bold text-2xl tracking-wider italic">
        DigiCars
      </Link>
      <div className="flex gap-6 items-center">
        <Link
          to={"/"}
          className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
        >
          Home
        </Link>
        <Link
          to={"/rent"}
          className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
        >
          Rent Cars
        </Link>
        <Link
          to={"/login"}
          className="rounded-full border border-white px-5 py-1.5 text-white font-medium hover:bg-white hover:text-black transition"
        >
          Log In
        </Link>
        <Link
          to={"/register"}
          className="rounded-full bg-white px-5 py-1.5 text-black font-medium shadow hover:bg-gray-200 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
