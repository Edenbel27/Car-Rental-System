import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { Button } from "./ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex fixed z-20 items-center justify-between w-full mx-auto px-6 py-4 bg-gradient-to-b from-neutral-950 to-black text-white shadow-md">
      <Link to={"/"} className="font-bold text-2xl tracking-wider italic">
        DigiCars
      </Link>
      <div className="[&_a.active]:underline flex gap-6 items-center">
        <NavLink
          to={"/"}
          className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
        >
          Home
        </NavLink>
        <NavLink
          to={"/rent"}
          className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
        >
          Rent Cars
        </NavLink>
        {user ? (
          <>
            <NavLink
              to={"/dashboard"}
              className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
            >
              Dashboard
            </NavLink>
            <Button
              onClick={logout}
              className="rounded-full border border-white px-5 py-1.5 cursor-pointer text-white font-medium hover:bg-white hover:text-black transition"
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <NavLink
              to={"/login"}
              className="rounded-full border border-white px-5 py-1.5 text-white font-medium hover:bg-white hover:text-black transition"
            >
              Log In
            </NavLink>
            <NavLink
              to={"/register"}
              className="rounded-full bg-white px-5 py-1.5 text-black font-medium shadow hover:bg-gray-200 transition"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
