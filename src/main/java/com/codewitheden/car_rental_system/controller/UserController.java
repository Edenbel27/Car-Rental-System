// UserController.java
package com.codewitheden.car_rental_system.controller;

import com.codewitheden.car_rental_system.entity.User;
import com.codewitheden.car_rental_system.repository.UserRepository;
import com.codewitheden.car_rental_system.service.UserService;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.codewitheden.car_rental_system.entity.Booking;
import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

@PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody User user) {
    if (user.getEmail() == null) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body("Email is required.");
    }
    if (userRepository.findByEmail(user.getEmail()) != null) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body("User with this email already exists.");
    }
    try {
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    } catch (Exception e) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Registration failed: " + e.getMessage());
    }
}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        User user = userService.login(email, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

     @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/{user_id}/cars")
    public List<Car> getCarsRentedByUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream()
                .map(Booking::getCar)
                .collect(Collectors.toList());
    }

   @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
