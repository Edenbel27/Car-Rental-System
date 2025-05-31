import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [location]);
  
  return (
    <div className="font-[poppins]">
      <Navbar />
      <div className="pt-16">
        <Outlet />
      </div>
      {/* Footer */}
      <footer className="w-full bg-neutral-900 border-t border-neutral-800 py-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4 text-center md:text-left">
          <div className="text-white font-bold text-lg">DigiCars</div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DigiCars. All rights reserved.
          </div>
          <div className="flex gap-4 justify-center md:justify-end">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
