// CarService.java
package com.codewitheden.car_rental_system.service;

import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}
