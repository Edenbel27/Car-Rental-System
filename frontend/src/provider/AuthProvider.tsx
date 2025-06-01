import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import apiClient from "../api/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface AuthContextType {
  loading: "logging" | "registering" | "ready";
  user: User | null;
  login: (user: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<"logging" | "registering" | "ready">(
    "ready"
  );

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (user: { email: string; password: string }) => {
    setLoading("logging");
    try {
      const res = await apiClient.post<User>("/api/users/login", user);
      setUser(res.data);
      localStorage.setItem("auth_user", JSON.stringify(res.data));
      toast.success("Logged in successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading("ready");
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast.info("Logged out.");
  };

  return (
    <AuthContext.Provider value={{ loading, user, login, logout }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        className="font-[poppins]"
        pauseOnHover
        aria-label="Notification"
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
