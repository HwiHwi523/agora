package com.agora.server.sse.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;


@Service
@RequiredArgsConstructor
@Slf4j
public class PublishService {

    private final Map<String, List<SseEmitter>> roomEmitterMap;

    private final RedisMessageListenerContainer redisMessageListenerContainer;


    public SseEmitter subscribe(String roomId) {

        List<SseEmitter> roomSseEmitters = roomEmitterMap.getOrDefault(roomId, new CopyOnWriteArrayList<>());

//        SseEmitter emitter = new SseEmitter(60 * 1000L);
        SseEmitter emitter = new SseEmitter(0L);
        roomSseEmitters.add(emitter);

        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data("connected!"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        log.info("new emitter added: {}", emitter);
        log.info("emitter list size: {}", roomSseEmitters.size());
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            roomSseEmitters.remove(emitter);    // 만료되면 리스트에서 삭제
        });
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });

        MessageListener messageListener = ((message, pattern) -> {
            String roomMessage = message.toString();
            try {
                emitter.send(SseEmitter.event().data(roomMessage));
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        redisMessageListenerContainer.addMessageListener(messageListener, new ChannelTopic("room:" + roomId));

        roomEmitterMap.put(roomId,roomSseEmitters);
        return emitter;
    }


}
