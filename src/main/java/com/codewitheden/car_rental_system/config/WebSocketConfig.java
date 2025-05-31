package com.codewitheden.car_rental_system.config;

import com.codewitheden.car_rental_system.websockethandler.BookingSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private BookingSocketHandler bookingSocketHandler;

    @Override
    public void registerWebSocketHandlers(@NonNull WebSocketHandlerRegistry registry) {
        registry.addHandler(bookingSocketHandler, "/ws/bookings").setAllowedOrigins("*");
        registry.addHandler(
                applicationContext.getBean(com.codewitheden.car_rental_system.websockethandler.CarSocketHandler.class),
                "/ws/cars").setAllowedOrigins("*");
    }
}
