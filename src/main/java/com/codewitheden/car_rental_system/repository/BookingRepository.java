package com.codewitheden.car_rental_system.repository;

import com.codewitheden.car_rental_system.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
   List<Booking> findByUserId(Long userId);
}