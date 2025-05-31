package com.codewitheden.car_rental_system.websockethandler;

import com.codewitheden.car_rental_system.entity.Car;
import com.codewitheden.car_rental_system.service.CarService;
import com.codewitheden.car_rental_system.service.UserService;
import com.codewitheden.car_rental_system.service.BookingService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.web.socket.CloseStatus;

@Component
public class CarSocketHandler extends TextWebSocketHandler {
    private final CarService carService;
    private final UserService userService;
    private final BookingService bookingService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Set<WebSocketSession> sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());

    @Autowired
    public CarSocketHandler(CarService carService, UserService userService, BookingService bookingService) {
        this.carService = carService;
        this.userService = userService;
        this.bookingService = bookingService;
    }

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
        sessions.add(session);
        List<Car> cars = carService.getAllCars();
        String carsJson = objectMapper.writeValueAsString(cars);
        session.sendMessage(new TextMessage(carsJson));
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws Exception {
        String payload = message.getPayload();
        try {
            // Parse the action from the payload
            com.fasterxml.jackson.databind.JsonNode node = objectMapper.readTree(payload);
            String action = node.has("action") ? node.get("action").asText() : null;
            if ("refresh".equals(action)) {
                broadcastCars();
            } else if ("book".equals(action)) {
                Long userId = node.has("userId") ? node.get("userId").asLong() : null;
                Long carId = node.has("carId") ? node.get("carId").asLong() : null;
                if (userId != null && carId != null) {
                    com.codewitheden.car_rental_system.entity.User user = userService.findById(userId);
                    com.codewitheden.car_rental_system.entity.Car car = carService.findAvailableCar(carId);
                    if (car == null || !car.isAvailable()) {
                        session.sendMessage(new TextMessage("{\"error\":\"Car is not available\"}"));
                        return;
                    }
                    car.setAvailable(false);
                    carService.addCar(car);
                    bookingService.createBooking(user, car);
                    broadcastCars();
                }
            }
        } catch (Exception e) {
            session.sendMessage(new TextMessage("{\"error\":\"Invalid action\"}"));
        }
    }

    private void broadcastCars() throws Exception {
        List<Car> cars = carService.getAllCars();
        String carsJson = objectMapper.writeValueAsString(cars);
        for (WebSocketSession sess : sessions) {
            if (sess.isOpen()) {
                sess.sendMessage(new TextMessage(carsJson));
            }
        }
    }
}
