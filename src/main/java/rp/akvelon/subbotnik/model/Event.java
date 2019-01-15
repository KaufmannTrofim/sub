package rp.akvelon.subbotnik.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    private String name;

    @NonNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private Date date;

    @ElementCollection(targetClass = Integer.class, fetch = FetchType.EAGER)
    private Set<Integer> themesId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User created;

    public Event(String name, Date date) {
        this.name = name;
        this.date = date;
        this.themesId = new HashSet<>();
    }

    public Event(String name, Date date, Set<Integer> themesId) {
        this.name = name;
        this.date = date;
        this.themesId = themesId;
    }

    public void addTheme(Integer themeId) {
        themesId.add(themeId);
    }

    public void addThemes(Set<Integer> themesId) {
        this.themesId.addAll(themesId);
    }

    public void deleteThemeById(Integer id) {
        themesId.remove(id);
    }

    public void deleteAllThemes() {
        themesId.clear();
    }


}
