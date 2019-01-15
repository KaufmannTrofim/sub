package rp.akvelon.subbotnik.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import rp.akvelon.subbotnik.model.Tag;

import java.util.Optional;

public interface TagRepo extends CrudRepository<Tag, Integer> {

    @Query("select id from Tag t where t.name = :name")
    Integer getIdByName(@Param("name") String name);
}
