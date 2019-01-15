package rp.akvelon.subbotnik.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rp.akvelon.subbotnik.model.*;
import rp.akvelon.subbotnik.repos.TagRepo;
import rp.akvelon.subbotnik.repos.ThemeRepo;
import rp.akvelon.subbotnik.security.UserService;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashSet;
import java.util.Set;

@RestController
@ApiIgnore
public class ThemeControllerSPA {

    @Autowired
    private ThemeController themeController;

    @Autowired
    private TagRepo tagRepo;

    @Autowired
    private ThemeRepo themeRepo;

    @Autowired
    private UserService userService;

    @PostMapping("/themes/spa")
    @ResponseBody
    @PreAuthorize("@userService.checkAuthorisation()")
    public ThemeSPA addTheme(@RequestBody ThemeSPA themeSPA) {
        Set<Integer> tagsId = new HashSet<>();

        themeSPA.getTags().forEach(tag -> {
            if (tag.getId() == null) {
                Integer id = tagRepo.getIdByName(tag.getName());
                if (id == null) {
                    tagsId.add(tagRepo.save(new Tag(tag.getName())).getId());
                } else {
                    tagsId.add(id);
                }
            } else {
                tagsId.add(tag.getId());
            }
        });

        Theme theme = new Theme(themeSPA.getTopic(), themeSPA.getDescription(),
                themeSPA.getLecturer(), tagsId, themeSPA.getConfirmed());
        themeSPA.setId(themeController.addTheme(theme).getId());
        return themeSPA;
    }

    @GetMapping("/themes/spa")
    @ResponseBody
    public Iterable<ThemeSPA> getAllTheme() {
        Set<ThemeSPA> themesSPA = new HashSet<>();

        Iterable<Theme> themes = themeController.getAllTheme();
        themes.forEach(theme -> {
            ThemeSPA themeSPA = new ThemeSPA(theme.getId(), theme.getTopic(), theme.getDescription(),
                    theme.getCreatedAt(), new HashSet<>(), theme.getLecturer(),
                    theme.getAssigned(), theme.getConfirmed());
            theme.getTagsId().forEach(tag -> {
                try {
                    themeSPA.addTag(tagRepo.findById(tag).get());
                } catch (Exception e) {

                }
            });

            themesSPA.add(themeSPA);
        });

        return themesSPA;
    }

    @GetMapping("/themes/spa/{themeId}")
    @ResponseBody
    public ThemeSPA getThemeSPA(@PathVariable Integer themeId) {
        Theme theme = themeRepo.findById(themeId).get();
        ThemeSPA themeSPA = new ThemeSPA(theme.getId(), theme.getTopic(), theme.getDescription(),
                theme.getCreatedAt(), new HashSet<>(), theme.getLecturer(),
                theme.getAssigned(), theme.getConfirmed());

        theme.getTagsId().forEach(id -> {
            try {
                themeSPA.addTag(tagRepo.findById(id).get());
            } catch (Exception e) {

            }
        });

        return themeSPA;
    }

    @PatchMapping("/themes/spa")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public Data updateTheme(@RequestBody ThemeSPA themeSPA) {
        Set<Integer> tagsId = new HashSet<>();

        themeSPA.getTags().forEach(tag -> {
            if (tag.getId() == null) {
                Integer id = tagRepo.getIdByName(tag.getName());
                if (id == null) {
                    tagsId.add(tagRepo.save(new Tag(tag.getName())).getId());
                } else {
                    tagsId.add(id);
                }
            } else {
                tagsId.add(tag.getId());
            }
        });

        Theme theme = new Theme(themeSPA.getTopic(), themeSPA.getDescription(),
                themeSPA.getLecturer(), tagsId, themeSPA.getConfirmed());
        theme.setId(themeSPA.getId());
        themeController.updateTheme(theme);
        return new Data("Successfully", Type.Ok);
    }
}
