package rp.akvelon.subbotnik.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import rp.akvelon.subbotnik.model.*;
import rp.akvelon.subbotnik.repos.ThemeRepo;
import rp.akvelon.subbotnik.security.UserService;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@ApiIgnore
public class EventControllerSPA {

    @Autowired
    private UserService userService;

    @Autowired
    private EventController eventController;

    @Autowired
    private ThemeControllerSPA themeControllerSPA;

    @Autowired
    private ThemeRepo themeRepo;

    @PostMapping("events/spa")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public EventSPA addEvent(@RequestBody EventSPA eventSPA) {
        Set<Integer> themesId = new HashSet<>();

        eventSPA.getThemesSPA().forEach(theme -> {
            themesId.add(theme.getId());
        });

        Event event = new Event(eventSPA.getName(), eventSPA.getDate(), themesId);
        eventSPA.setId(eventController.addEvent(event).getId());
        return eventSPA;
    }


    @GetMapping("events/spa")
    @ResponseBody
    public Iterable<EventSPA> getAllEvent() {
        Set<EventSPA> eventsSPA = new HashSet<>();

        Iterable<Event> events = eventController.getAllEvent();
        events.forEach(event -> {
            EventSPA eventSPA = new EventSPA(event);

            event.getThemesId().forEach(themeId -> {
                try {
                    eventSPA.addTheme(themeControllerSPA.getThemeSPA(themeId));
                } catch (Exception e) {

                }
            });

            eventsSPA.add(eventSPA);
        });

        return eventsSPA;
    }

    @GetMapping("events/spa/{eventId}")
    @ResponseBody
    public EventSPA getEvent(@PathVariable Integer eventId) {

        Event event = eventController.getEvent(eventId).get();
        EventSPA eventSPA = new EventSPA(event);

        event.getThemesId().forEach(themeId -> {
            try {
                eventSPA.addTheme(themeControllerSPA.getThemeSPA(themeId));
            } catch (Exception e) {

            }
        });

        return eventSPA;
    }

    @PatchMapping("/events/spa")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public Data updateEvent(@RequestBody EventSPA eventSPA) {
        Set<Integer> themesId = new HashSet<>();

        eventSPA.getThemesSPA().forEach(theme -> {
            themesId.add(theme.getId());
        });

        Event event = new Event(eventSPA.getName(), eventSPA.getDate(), themesId);
        event.setId(eventSPA.getId());
        eventController.updateEvent(event);
        return new Data("Successfully", Type.Ok);
    }
}
