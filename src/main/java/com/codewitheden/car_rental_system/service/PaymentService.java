package com.codewitheden.car_rental_system.service;

import com.codewitheden.car_rental_system.entity.Payment;
import com.codewitheden.car_rental_system.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Async
    public Payment processPayment(Payment payment) {
        // Simulating payment processing
        payment.setPaymentStatus("SUCCESS"); // Here you could integrate with a payment API
        return paymentRepository.save(payment);
    }
}
