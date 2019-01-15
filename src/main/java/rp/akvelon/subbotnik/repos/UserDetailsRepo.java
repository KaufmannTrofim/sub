package rp.akvelon.subbotnik.repos;

import org.springframework.data.repository.CrudRepository;
import rp.akvelon.subbotnik.model.User;

public interface UserDetailsRepo extends CrudRepository<User, String> {
}
