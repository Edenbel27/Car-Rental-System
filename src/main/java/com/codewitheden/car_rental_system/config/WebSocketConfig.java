package com.codewitheden.car_rental_system.config;

import com.codewitheden.car_rental_system.websockethandler.BookingSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new BookingSocketHandler(), "/ws/bookings").setAllowedOrigins("http://localhost:5173");
    }
}
