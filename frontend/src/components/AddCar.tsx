import { type FormEvent, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import apiClient from "../api/apiClient";

function AddCar() {
  const [car, setCar] = useState({
    model: "",
    make: "",
    pricePerDay: 0,
    available: true,
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]:
        name === "pricePerDay"
          ? parseFloat(value)
          : name === "available"
          ? value === "true"
          : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await apiClient
      .post("/api/cars", car)
      .then(() => alert("added"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gradient-to-b dark:from-neutral-900 dark:to-black flex flex-col items-center justify-center px-4 transition-colors duration-300">
      <section className="flex flex-col items-center justify-center w-full max-w-md mx-auto pb-20">
        <Card className="w-full max-w-md rounded-xl shadow-2xl border-none bg-neutral-100/90 dark:bg-neutral-800/90 backdrop-blur-md transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-black dark:text-white font-bold mb-2">
              Add Car
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <CardContent className="space-y-6">
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200"
                  htmlFor="model"
                >
                  Model
                </label>
                <Input
                  id="model"
                  name="model"
                  placeholder="Model"
                  onChange={handleChange}
                  required
                  className="rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200"
                  htmlFor="make"
                >
                  Make
                </label>
                <Input
                  id="make"
                  name="make"
                  placeholder="Make"
                  onChange={handleChange}
                  required
                  className="rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200"
                  htmlFor="pricePerDay"
                >
                  Price Per Day
                </label>
                <Input
                  id="pricePerDay"
                  name="pricePerDay"
                  type="number"
                  placeholder="Price Per Day"
                  onChange={handleChange}
                  required
                  className="rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200"
                  htmlFor="imageUrl"
                >
                  Image URL
                </label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Image URL"
                  onChange={handleChange}
                  required
                  className="rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200"
                  htmlFor="available"
                >
                  Available
                </label>
                <select
                  id="available"
                  name="available"
                  onChange={handleChange}
                  value={car.available.toString()}
                  className="rounded-md px-4 py-2 bg-neutral-200 dark:bg-neutral-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="flex mt-6 flex-col gap-2">
              <Button
                className="w-full rounded-full bg-gradient-to-b from-gray-200 to-gray-400 dark:from-gray-200 dark:to-gray-400 text-black font-semibold shadow hover:from-white hover:to-gray-300 transition"
                type="submit"
              >
                Add Car
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </div>
  );
}

export default AddCar;
