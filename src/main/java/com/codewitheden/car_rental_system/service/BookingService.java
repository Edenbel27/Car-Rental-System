package com.codewitheden.car_rental_system.service;

import com.codewitheden.car_rental_system.entity.Booking;
import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.entity.Payment;
import com.codewitheden.car_rental_system.entity.User;
import com.codewitheden.car_rental_system.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(User user, Car car) {
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setBookingDate(LocalDateTime.now());
        return bookingRepository.save(booking);
}
}