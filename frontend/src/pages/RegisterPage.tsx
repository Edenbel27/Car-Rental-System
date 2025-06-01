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
import apiClient from "../api/apiClient";

const RegisterPage = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/api/users/register", {
        username: user.username.trim(),
        email: user.email.trim(),
        password: user.password,
      });
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.data?.message || "Registration failed");
      }
      alert("User registered");
      setUser({ username: "", email: "", password: "" });
    } catch (err: any) {
      alert(
        err.response?.data?.message || err.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black flex flex-col items-center justify-center px-4 transition-colors duration-300">
      <section className="flex flex-col items-center justify-center w-full max-w-md mx-auto pb-20">
        <Card className="w-full max-w-md rounded-xl shadow-2xl border-none bg-neutral-100/90 dark:bg-neutral-800/90 backdrop-blur-md transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-black dark:text-white font-bold mb-2">
              Register
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <CardContent className="space-y-6">
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200"
                  htmlFor="name"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="username"
                  placeholder="Your name"
                  value={user.username}
                  onChange={handleChange}
                  required
                  className="rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200"
                  htmlFor="email"
                >
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
                  className="rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200"
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
                  className="rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                />
              </div>
            </CardContent>
            <CardFooter className="flex mt-6 flex-col gap-2">
              <Button
                className="w-full rounded-full bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-200 dark:to-gray-400 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition"
                type="submit"
              >
                Register
              </Button>
              <Link
                to="/login"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
              >
                Already have an account?
              </Link>
            </CardFooter>
          </form>
        </Card>
      </section>
    </div>
  );
};

export default RegisterPage;
