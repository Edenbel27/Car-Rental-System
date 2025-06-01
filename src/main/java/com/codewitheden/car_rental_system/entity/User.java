package com.codewitheden.car_rental_system.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class User {
    // Getters and Setters
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String username;
        private String email;
        private String password;

        @Enumerated(EnumType.STRING)
        private Role role = Role.CUSTOMER;

        public User(Long id , String name, String email) {
            this.id = id;
            this.username = name;
            this.email = email;
        }

}

