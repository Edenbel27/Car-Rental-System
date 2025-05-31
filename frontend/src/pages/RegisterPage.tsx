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
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-md border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} autoComplete="off">
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                name="username"
                placeholder="Your name"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
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
              Register
            </Button>
            <Link
              to="/login"
              className="ml-4 text-sm text-blue-600 hover:underline"
            >
              Already have an account?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
