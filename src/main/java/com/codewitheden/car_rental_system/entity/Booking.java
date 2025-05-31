package com.codewitheden.car_rental_system.entity;
//import javax.persistence.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
   @JoinColumn(name = "car_id")
    private Car car;

    @ManyToOne
   @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime bookingDate;
    private LocalDateTime returnDate;



//    public Booking(Car car, User user, LocalDateTime bookingDate) {
//        this.car = car;
//        this.user = user;
//        this.bookingDate = bookingDate;
//    }

}
