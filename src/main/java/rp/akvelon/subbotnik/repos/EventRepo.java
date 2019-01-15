package rp.akvelon.subbotnik.repos;

import org.springframework.data.repository.CrudRepository;
import rp.akvelon.subbotnik.model.Event;

public interface EventRepo extends CrudRepository<Event, Integer> {
}
