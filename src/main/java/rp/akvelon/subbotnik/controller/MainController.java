package rp.akvelon.subbotnik.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import rp.akvelon.subbotnik.model.User;
import rp.akvelon.subbotnik.repos.UserDetailsRepo;

import java.time.LocalDateTime;

@RestController
public class MainController {

    @Autowired
    UserDetailsRepo userDetailsRepo;

    @GetMapping("/user")
    @ResponseBody
    public User GetUser(@AuthenticationPrincipal User currentUser) {
        if (currentUser != null) {
            User user = userDetailsRepo.findById(currentUser.getId()).get();
            user.setLastVisit(LocalDateTime.now());
            userDetailsRepo.save(user);
            return user;
        }
        return null;
    }
}
