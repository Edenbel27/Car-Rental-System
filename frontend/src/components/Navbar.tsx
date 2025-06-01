import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useTheme } from "../provider/ThemeProvider";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="fixed z-20 w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-black dark:text-white shadow-md transition-colors duration-300">
      <div className="flex items-center justify-between mx-auto px-6 py-4">
        <Link to="/" className="font-bold text-2xl tracking-wider italic">
          DigiCars
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex [&_a.active]:underline gap-6 items-center">
          <button
            onClick={toggleTheme}
            className="rounded-full border px-4 py-1.5 text-black dark:text-white font-medium hover:bg-black/10 dark:hover:bg-white/10 transition mr-2"
            aria-label="Toggle dark/light mode"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
              >
                Dashboard
              </NavLink>
              {user.role === "ADMIN" && (
                <>
                  <NavLink
                    to={"/admin/bookings"}
                    className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
                  >
                    All Bookings
                  </NavLink>
                  <NavLink
                    to={"/admin/add-car"}
                    className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
                  >
                    Add Car
                  </NavLink>
                </>
              )}
              <NavLink
                to="/rent"
                className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
              >
                Rent Cars
              </NavLink>
              <Button
                onClick={logout}
                className="rounded-full border border-white px-5 py-1.5 cursor-pointer text-white font-medium dark:text-black hover:bg-white hover:text-black transition"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
              >
                Home
              </NavLink>
              <NavLink
                to="/rent"
                className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
              >
                Rent Cars
              </NavLink>
              <NavLink
                to="/login"
                className="rounded-full border dark:border-white px-5 py-1.5 dark:text-white font-medium hover:bg-black/10 dark:hover:bg-white dark:hover:text-black transition"
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-white px-5 py-1.5 text-black font-medium shadow hover:bg-gray-200 transition"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-black/10 dark:hover:bg-white/10 transition"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white dark:bg-neutral-900 shadow-lg transform transition-transform duration-300 md:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <span className="font-bold text-2xl tracking-wider italic">
            DigiCars
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <button
            onClick={() => {
              toggleTheme();
              setDrawerOpen(false);
            }}
            className="rounded-full border dark:border-white px-4 py-1.5 text-black dark:text-white font-medium hover:bg-black/10 dark:hover:bg-white/10 transition"
            aria-label="Toggle dark/light mode"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <NavLink
            to="/"
            className="px-4 py-2 font-medium hover:text-gray-300 transition"
            onClick={() => setDrawerOpen(false)}
          >
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="px-4 py-2 font-medium hover:text-gray-300 transition"
                onClick={() => setDrawerOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/rent"
                className="px-4 py-2 font-medium hover:text-gray-300 transition"
                onClick={() => setDrawerOpen(false)}
              >
                Rent Cars
              </NavLink>
              {user.role === "ADMIN" && (
                <>
                  <NavLink
                    to={"/admin/bookings"}
                    className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
                  >
                    All Bookings
                  </NavLink>
                  <NavLink
                    to={"/admin/add-car"}
                    className="px-4 py-1.5 font-medium hover:text-gray-300 transition"
                  >
                    Add Car
                  </NavLink>
                </>
              )}
              <Button
                onClick={() => {
                  logout();
                  setDrawerOpen(false);
                }}
                className="rounded-full border border-white px-5 py-2 cursor-pointer text-white font-medium dark:text-black hover:bg-white hover:text-black transition"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-full border dark:border-white px-5 py-2 dark:text-white font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                onClick={() => setDrawerOpen(false)}
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full bg-white px-5 py-2 text-black font-medium shadow hover:bg-gray-200 transition"
                onClick={() => setDrawerOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
