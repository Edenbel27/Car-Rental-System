package com.codewitheden.car_rental_system.service;

import com.codewitheden.car_rental_system.entity.Payment;
import com.codewitheden.car_rental_system.repository.PaymentRepository;
import com.codewitheden.car_rental_system.repository.BookingRepository;
import com.codewitheden.car_rental_system.entity.Booking;
import com.codewitheden.car_rental_system.entity.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private CarService carService;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Async
    public Payment processPayment(Payment payment) {
        // Simulating payment processing
        payment.setPaymentStatus("SUCCESS"); // Here you could integrate with a payment API
        Payment savedPayment = paymentRepository.save(payment);

        // Remove booking and set car available
        if (payment.getBookingId() != null) {
            Booking booking = bookingRepository.findById(payment.getBookingId()).orElse(null);
            if (booking != null) {
                Car car = booking.getCar();
                if (car != null) {
                    car.setAvailable(true);
                    carService.updateCar(car);
                    // Publish car change event
                    eventPublisher.publishEvent(new CarService.CarChangeEvent(this, car));
                }
                bookingRepository.deleteById(booking.getId());
            }
        }
        return savedPayment;
    }
}
