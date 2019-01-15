package rp.akvelon.subbotnik;

import com.google.common.collect.Iterables;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import rp.akvelon.subbotnik.controller.ThemeController;
import rp.akvelon.subbotnik.model.Theme;
import rp.akvelon.subbotnik.repos.ThemeRepo;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.*;

import static org.assertj.core.api.Java6Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ThemeControllerTest {

    @Autowired
    private ThemeController controller;

    @Autowired
    private ThemeRepo themeRepo;

    @Test
    public void contexLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void addTheme() {
        Theme theme = controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система", "Иван И. И.", false));
        assertEquals(theme, themeRepo.findById(theme.getId()).get());
    }

    @Test
    public void updateTheme() {
        Theme theme = controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система", "Иван И. И.", false));

        theme.setTopic("Тема1");
        controller.updateTheme(theme);
        assertEquals(theme, themeRepo.findById(theme.getId()).get());

        Set<String> tags = new HashSet<>();
        tags.add("Тег1");
        tags.add("Тег2");
        theme.addTags(tags);
        controller.updateTheme(theme);
        assertEquals(theme, themeRepo.findById(theme.getId()).get());

        theme.setDescription("Описание");
        theme.setLecturer("Иванов И. И.");
        theme.setConfirmed(true);
        controller.updateTheme(theme);
        assertEquals(theme, themeRepo.findById(theme.getId()).get());
    }

    @Test
    public void getTheme() {
        Theme theme = controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система", "Иван И. И.", false));
        assertEquals(themeRepo.findById(theme.getId()), controller.getTheme(theme.getId()));
    }

    @Test
    public void getAllTheme() {
        Integer size = Iterables.size(themeRepo.findAll());

        controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система", "Иван И. И.", false));
        controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система", "Иван И. И.", false));
        controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система", "Иван И. И.", false));
        controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система", "Иван И. И.", false));

        assertTrue(Iterables.size(controller.getAllTheme()) == size + 4);
    }

    @Test
    public void deleteTheme() {
        Theme theme = controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система", "Иван И. И.", false));
        assertTrue(themeRepo.findById(theme.getId()).isPresent());

        controller.deleteTheme(theme.getId());
        assertFalse(themeRepo.findById(theme.getId()).isPresent());
    }

    @Test
    public void deleteAllThemes() {
        controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система","Иван И. И.", false));
        controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система","Иван И. И.", false));
        controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система","Иван И. И.", false));
        controller.addTheme(new Theme("Elasticsearch", "Тиражируемая свободная программная поисковая система","Иван И. И.", false));

        assertThat(themeRepo.findAll()).doesNotContainNull();

        controller.deleteAllThemes();

        assertThat(themeRepo.findAll()).isEmpty();
    }
}