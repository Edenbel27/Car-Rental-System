package com.codewitheden.car_rental_system.repository;

import com.codewitheden.car_rental_system.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
//    List<Car> findByStatus(String status);
    Car findByIdAndAvailable(Long id, boolean available);
}