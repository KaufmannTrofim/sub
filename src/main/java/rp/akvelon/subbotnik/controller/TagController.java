package rp.akvelon.subbotnik.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rp.akvelon.subbotnik.model.Data;
import rp.akvelon.subbotnik.model.Tag;
import rp.akvelon.subbotnik.model.Type;
import rp.akvelon.subbotnik.repos.TagRepo;
import rp.akvelon.subbotnik.security.UserService;

import java.util.Optional;

@RestController
public class TagController {

    @Autowired
    private final TagRepo tagRepo;

    @Autowired
    private UserService userService;


    public TagController(final TagRepo tagRepo) {
        this.tagRepo = tagRepo;
    }

    @PostMapping("/tags")
    @ResponseBody
    @PreAuthorize("@userService.checkAuthorisation()")
    public Tag addTag(@RequestBody Tag tag) {
        return tagRepo.save(tag);
    }

    @PatchMapping("/tags")
    @ResponseBody
    @PreAuthorize("@userService.checkAuthorisation()")
    public Data updateTag(@RequestBody Tag tag) {
        tagRepo.save(tag);
        return new Data("Successfully", Type.Ok);
    }

    @GetMapping("/tags/{tagId}")
    @ResponseBody
    public Optional<Tag> getTag(@PathVariable Integer tagId) {
        return tagRepo.findById(tagId);
    }

    @GetMapping("/tags")
    @ResponseBody
    public Iterable<Tag> getAllTags() {
        return tagRepo.findAll();
    }

    @DeleteMapping("/tags/{tagId}")
    @ResponseBody
    @PreAuthorize("@userService.checkAuthorisation()")
    public void deleteTag(@PathVariable Integer tagId) {
        tagRepo.deleteById(tagId);
    }

    @DeleteMapping("/tags")
    @ResponseBody
    @PreAuthorize("@userService.checkAuthorisation()")
    public void deleteAllTags() {
        tagRepo.deleteAll();
    }
}
