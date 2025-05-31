import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { loading, login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(user);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex mt-6 flex-col gap-2">
            <Button
              className="w-full bg-black text-white hover:bg-black/20 hover:text-black/70 cursor-pointer"
              type="submit"
            >
              {loading === "logging" ? "Logging..." : "Login"}
            </Button>
            <Link
              to="/register"
              className="ml-4 text-sm text-blue-600 hover:underline"
            >
              Don't have an account?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
