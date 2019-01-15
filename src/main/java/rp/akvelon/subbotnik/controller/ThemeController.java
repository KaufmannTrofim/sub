package rp.akvelon.subbotnik.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rp.akvelon.subbotnik.model.Data;
import rp.akvelon.subbotnik.model.Theme;
import rp.akvelon.subbotnik.model.Type;
import rp.akvelon.subbotnik.model.User;
import rp.akvelon.subbotnik.repos.TagRepo;
import rp.akvelon.subbotnik.repos.ThemeRepo;
import rp.akvelon.subbotnik.security.UserService;

import java.util.*;

@RestController
public class ThemeController {

    @Autowired
    private UserService userService;

    @Autowired
    private final ThemeRepo themeRepo;

    public ThemeController(final ThemeRepo themeRepo) {
        this.themeRepo = themeRepo;
    }

    @Autowired
    private TagRepo tagRepo;

    @PostMapping("/themes")
    @ResponseBody
    @PreAuthorize("@userService.checkAuthorisation()")
    public Theme addTheme(@RequestBody Theme theme) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        theme.setProposed(user);
        if (theme.getLecturer() == null) {
            theme.setLecturer("Лектор не назначен");
        }
        return themeRepo.save(theme);
    }

    @PatchMapping("/themes")
    @ResponseBody
    @PreAuthorize("@userService.checkAuthorisation()")
    public Data updateTheme(@RequestBody Theme theme) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        theme.setProposed(user);
        themeRepo.save(theme);
        return new Data("Successfully", Type.Ok);
    }

    @GetMapping("/themes/{themeId}")
    @ResponseBody
    public Optional<Theme> getTheme(@PathVariable Integer themeId) {
        return themeRepo.findById(themeId);
    }

    @GetMapping("/themes")
    @ResponseBody
    public Iterable<Theme> getAllTheme() {
        return themeRepo.findAll();
    }

    @DeleteMapping("/themes/{themeId}")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public void deleteTheme(@PathVariable Integer themeId) {
        themeRepo.deleteById(themeId);
    }

    @DeleteMapping("/themes")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public void deleteAllThemes() {
        themeRepo.deleteAll();
    }
}
