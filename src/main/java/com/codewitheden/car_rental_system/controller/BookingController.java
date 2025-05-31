// BookingController.java
package com.codewitheden.car_rental_system.controller;

import com.codewitheden.car_rental_system.entity.Booking;
import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.entity.User;
import com.codewitheden.car_rental_system.service.BookingService;
import com.codewitheden.car_rental_system.service.CarService;
import com.codewitheden.car_rental_system.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;

    @PostMapping("/book")
    public Booking bookCar(@RequestParam Long userId, @RequestParam Long carId) {
        User user = userService.findById(userId); // You need to implement this method
        Car car = carService.findAvailableCar(carId);
        if (car == null || !car.isAvailable()) {
            throw new RuntimeException("Car is not available");
        }
        car.setAvailable(false);
        carService.addCar(car);
        return bookingService.createBooking(user, car);
    }
}