package rp.akvelon.subbotnik;

import com.google.common.collect.Iterables;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import rp.akvelon.subbotnik.controller.EventController;
import rp.akvelon.subbotnik.model.Event;
import rp.akvelon.subbotnik.model.Theme;
import rp.akvelon.subbotnik.repos.EventRepo;
import rp.akvelon.subbotnik.repos.ThemeRepo;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.*;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EventControllerTest {

    @Autowired
    EventController controller;

    @Autowired
    EventRepo eventRepo;

    @Autowired
    ThemeRepo themeRepo;

    @Test
    public void contexLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void addEvent() {
        Event event = controller.addEvent(new Event("Событие", "18.10.25"));
        assertEquals(event, eventRepo.findById(event.getId()).get());
    }

    @Test
    public void updateEvent() {
        Event event = eventRepo.save(new Event("Тема", "18.10.25"));

        Set<Integer> themesId = new HashSet<>();
        themesId.add(themeRepo.save(new Theme("Elasticsearch1", "Тиражируемая свободная программная поисковая система", "Крылов И. И.", false)).getId());
        themesId.add(themeRepo.save(new Theme("Elasticsearch2", "Тиражируемая свободная программная поисковая система", "Крылов И. И.", false)).getId());

        assertEquals(event, controller.getEvent(event.getId()).get());

        event.setThemesId(themesId);

        controller.updateEvent(event);
        assertEquals(event, controller.getEvent(event.getId()).get());

        event.setName("Тема1");
        event.setDate("19.10.25");
        event.setName("Событие");
        controller.updateEvent(event);
        assertEquals(event, controller.getEvent(event.getId()).get());
    }

    @Test
    public void getEventById() {
        Event event = eventRepo.save(new Event("Тема", "18.10.25"));
        assertEquals(event, controller.getEvent(event.getId()).get());
    }

    @Test
    public void getAllEvent() {
        eventRepo.deleteAll();

        eventRepo.save(new Event("Тема", "18.10.25"));
        eventRepo.save(new Event("Тема", "18.10.25"));
        eventRepo.save(new Event("Тема", "18.10.25"));
        eventRepo.save(new Event("Тема", "18.10.25"));

        assertTrue(Iterables.size(controller.getAllEvent()) == 4);
    }

    @Test
    public void deleteThemeByIdFromEvent() {
        Event event = eventRepo.save(new Event("Тема", "18.10.25"));
        assertThat(eventRepo.findById(event.getId()));

        Integer themeId = themeRepo.save(new Theme("Elasticsearch1", "Тиражируемая свободная программная поисковая система", "Крылов И. И.", false)).getId();
        event.setThemesId(new HashSet<Integer>(themeId));
        controller.updateEvent(event);

        controller.deleteThemeFromEvent(event.getId(), themeId);

        assertTrue(!eventRepo.findById(event.getId()).get().getThemesId().contains(themeId));
    }

    @Test
    public void deleteEventById() {
        Event event = eventRepo.save(new Event("Тема", "18.10.25"));
        assertThat(eventRepo.findById(event.getId()));

        controller.deleteEvent(event.getId());
        assertTrue(!eventRepo.findById(event.getId()).isPresent());
    }

    @Test
    public void deleteAllEvents() {
        eventRepo.save(new Event("Тема", "18.10.25"));
        eventRepo.save(new Event("Тема", "18.10.25"));

        assertThat(eventRepo.findAll()).doesNotContainNull();

        controller.deleteAllEvents();

        assertThat(eventRepo.findAll()).isEmpty();
    }

    @Test
    public void deletAllThemes() {
        Event event = eventRepo.save(new Event("Тема", "18.10.25"));
        Set<Integer> themesId = new HashSet<>();
        themesId.add(themeRepo.save(new Theme("Elasticsearch1", "Тиражируемая свободная программная поисковая система", "Крылов И. И.", false)).getId());
        themesId.add(themeRepo.save(new Theme("Elasticsearch2", "Тиражируемая свободная программная поисковая система", "Крылов И. И.", false)).getId());
        themesId.add(themeRepo.save(new Theme("Elasticsearch3", "Тиражируемая свободная программная поисковая система", "Крылов И. И.", false)).getId());
        event.setThemesId(themesId);

        controller.deletAllThemesFromEvent(event.getId());
        assertTrue(eventRepo.findById(event.getId()).get().getThemesId().isEmpty());
    }
}