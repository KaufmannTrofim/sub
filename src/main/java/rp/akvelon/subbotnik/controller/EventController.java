package rp.akvelon.subbotnik.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rp.akvelon.subbotnik.model.*;
import rp.akvelon.subbotnik.repos.EventRepo;
import rp.akvelon.subbotnik.repos.UserDetailsRepo;
import rp.akvelon.subbotnik.security.UserService;

import java.util.Optional;

@RestController
public class EventController {

    @Autowired
    private UserService userService;

    @Autowired
    private final EventRepo eventRepo;

    @Autowired
    UserDetailsRepo userDetailsRepo;

    @Autowired
    public EventController(final EventRepo eventRepo) {
        this.eventRepo = eventRepo;
    }

    @PostMapping("/events")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public Event addEvent(@RequestBody Event event) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        event.setCreated(user);
        return eventRepo.save(event);
    }

    @PatchMapping("/events")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public Data updateEvent(@RequestBody Event event) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        event.setCreated(user);
        eventRepo.save(event);
        return new Data("", Type.Ok);
    }

    @GetMapping("/events/{eventId}")
    @ResponseBody
    public Optional<Event> getEvent(@PathVariable Integer eventId) {
        return eventRepo.findById(eventId);
    }

    @GetMapping("/events")
    @ResponseBody
    public Iterable<Event> getAllEvent() {
        return eventRepo.findAll();
    }

    @DeleteMapping("/events/{eventId}/themes/{themeId}")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public void deleteThemeFromEvent(@PathVariable Integer eventId,
                                     @PathVariable Integer themeId) {
        Optional<Event> eventOptional = eventRepo.findById(eventId);
        Event event = eventOptional.get();
        event.deleteThemeById(themeId);
        eventRepo.save(event);
    }

    @DeleteMapping("/events/{eventId}")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public void deleteEvent(@PathVariable Integer eventId) {
        eventRepo.deleteById(eventId);
    }

    @DeleteMapping("/events")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public void deleteAllEvents() {
        eventRepo.deleteAll();
    }

    @DeleteMapping("/events/themes")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public void deletAllThemesFromEvent(@RequestParam Integer id) {
        Optional<Event> eventOptional = eventRepo.findById(id);
        Event event = eventOptional.get();
        event.deleteAllThemes();
        eventRepo.save(event);
    }
}
