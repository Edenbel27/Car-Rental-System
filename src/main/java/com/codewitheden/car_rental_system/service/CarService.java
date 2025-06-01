// CarService.java
package com.codewitheden.car_rental_system.service;

import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car findAvailableCar(Long id) {
        return carRepository.findByIdAndAvailable(id, true);
    }

    public Car getCarById(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    public void bookCar(Long carId, Long userId) {
        Car car = carRepository.findById(carId).orElse(null);
        if (car != null && car.isAvailable()) {
            car.setAvailable(false);
            carRepository.save(car);
            // Optionally, you could create a booking record here
        }
    }
}
