package rp.akvelon.subbotnik.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import rp.akvelon.subbotnik.model.Role;
import rp.akvelon.subbotnik.model.User;
import rp.akvelon.subbotnik.repos.UserDetailsRepo;

@Service
public class UserService {

    @Autowired
    UserDetailsRepo userDetailsRepo;

    public boolean checkAdminRole() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userDetailsRepo.findById(currentUser.getId()).get();
        if (user.getRoles() != null) {
            return user.getRoles().contains(Role.ROLE_ADMIN);
        }
        return  false;
    }

    public boolean checkAuthorisation() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() == "anonymousUser") {
            return false;
        }
        return true;
    }
}
