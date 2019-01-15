package rp.akvelon.subbotnik.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String topic;

    @NonNull
    private String description;

    @NonNull
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @ElementCollection(targetClass = Integer.class, fetch = FetchType.EAGER)
    private Set<Integer> tagsId;

    private String lecturer;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    private Set<String> assigned;

    private Boolean confirmed;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User proposed;

    public void addTags(Set<Integer> tagsId) {
        this.tagsId.addAll(tagsId);
    }

    public Theme(String topic, String description, String lecturer, Boolean confirmed) {
        this.topic = topic;
        this.description = description;
        this.createdAt = new Date();
        this.tagsId = new HashSet<Integer>();
        this.lecturer = lecturer;
        this.assigned = new HashSet<>();
        this.confirmed = confirmed;
    }


    public Theme(String topic, String description, String lecturer, Set<Integer> tagsId, Boolean confirmed) {
        this.topic = topic;
        this.description = description;
        this.createdAt = new Date();
        this.tagsId = tagsId;
        this.lecturer = lecturer;
        this.assigned = new HashSet<>();
        this.confirmed = confirmed;
    }

}
