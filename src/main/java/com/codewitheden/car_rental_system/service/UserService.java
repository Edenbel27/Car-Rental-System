// UserService.java
package com.codewitheden.car_rental_system.service;

import com.codewitheden.car_rental_system.entity.User;
import com.codewitheden.car_rental_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public User register(User user) {
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }

    public User login(String email, String password) {
    User user = userRepository.findByEmail(email);
    if (user != null && user.getPassword().equals(password)) {
        return user;
    }
    return null;
}
    public User findById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}