package rp.akvelon.subbotnik.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rp.akvelon.subbotnik.model.Data;
import rp.akvelon.subbotnik.model.Type;
import rp.akvelon.subbotnik.model.User;
import rp.akvelon.subbotnik.repos.UserDetailsRepo;
import rp.akvelon.subbotnik.security.UserService;

import java.util.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsRepo userDetailsRepo;

    @GetMapping("/users")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public Iterable<User> getAllUsers() {
        return userDetailsRepo.findAll();
    }

    @GetMapping("/users/{userId}")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public Optional<User> getUser(@PathVariable String userId) {
        return userDetailsRepo.findById(userId);
    }

    @PatchMapping("/users")
    @ResponseBody
    @PreAuthorize("@userService.checkAdminRole()")
    public Data updateUser(@RequestBody Set<User> users) {

        Set<String> notFoundId = new HashSet<>();

        users.forEach(user -> {
            if (!userDetailsRepo.findById(user.getId()).isPresent()) {
                notFoundId.add(user.getId());
            }
        });

        userDetailsRepo.saveAll(users);

        if (!notFoundId.isEmpty()) {
            return new Data("404", Type.NotOk);
        }
        return new Data("", Type.Ok);
    }
}
