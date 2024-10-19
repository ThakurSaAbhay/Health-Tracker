package com.example.healthtracker.controller;

import com.example.healthtracker.model.User;
import com.example.healthtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:3000", "https://health-tracker-frontend-production.up.railway.app"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        // Check if the email is already in use
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        // Save the new user if email is unique
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByEmail(loginUser.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.ok(user.get());  // Successful login
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
