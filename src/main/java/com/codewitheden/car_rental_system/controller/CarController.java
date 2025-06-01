// CarController.java
package com.codewitheden.car_rental_system.controller;

import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/cars")

public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Car addCar(@RequestBody Car car) {
        return carService.addCar(car);
    }
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carService.getCarById(id);
    }
}