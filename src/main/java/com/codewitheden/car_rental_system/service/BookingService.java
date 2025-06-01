package com.codewitheden.car_rental_system.service;

import com.codewitheden.car_rental_system.entity.Booking;
import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.entity.User;
import com.codewitheden.car_rental_system.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service

public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(User user, Car car, LocalDateTime rDateTime) {
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setBookingDate(LocalDateTime.now());
        booking.setReturnDate(rDateTime);
        return bookingRepository.save(booking);
    }

    public java.util.List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
}