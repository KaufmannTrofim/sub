package rp.akvelon.subbotnik.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventSPA {
    private Integer id;
    private String name;
    private Date date;
    private Set<ThemeSPA> themesSPA;

    public EventSPA(Event event) {
        this.id = event.getId();
        this.name = event.getName();
        this.date = event.getDate();
        themesSPA = new HashSet<>();
    }

    public void addTheme(ThemeSPA themesSPA) {
        this.themesSPA.add(themesSPA);
    }
}
