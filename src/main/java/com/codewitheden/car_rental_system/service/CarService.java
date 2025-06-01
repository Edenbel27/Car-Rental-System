// CarService.java
package com.codewitheden.car_rental_system.service;

import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository carRepository;

    private final ApplicationEventPublisher eventPublisher;

    public CarService(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Car addCar(Car car) {
        Car savedCar = carRepository.save(car);
        eventPublisher.publishEvent(new CarChangeEvent(this, savedCar));
        return savedCar;
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

    public void updateCar(Car car) {
        Car updatedCar = carRepository.save(car);
        eventPublisher.publishEvent(new CarChangeEvent(this, updatedCar));
    }

    public void deleteCar(Car car) {
        carRepository.delete(car);
        eventPublisher.publishEvent(new CarChangeEvent(this, car));
    }

    public static class CarChangeEvent {
        private final Object source;
        private final Car car;

        public CarChangeEvent(Object source, Car car) {
            this.source = source;
            this.car = car;
        }

        public Object getSource() {
            return source;
        }

        public Car getCar() {
            return car;
        }
    }
}
