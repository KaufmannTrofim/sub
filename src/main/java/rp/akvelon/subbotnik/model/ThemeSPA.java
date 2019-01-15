package rp.akvelon.subbotnik.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThemeSPA {
    private Integer id;
    private String topic;
    private String description;
    private Date createdAt = new Date();
    private Set<Tag> tags;
    private String lecturer;
    private Set<String> assigned;
    private Boolean confirmed;

    public void addTag(Tag tag) {
        this.tags.add(tag);
    }
}
