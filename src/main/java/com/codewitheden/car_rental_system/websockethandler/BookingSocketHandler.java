package com.codewitheden.car_rental_system.websockethandler;

import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
public class BookingSocketHandler  extends TextWebSocketHandler {
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Logic after connection established, e.g., sending a welcome message
    }
}
