package com.report.studentsystem.controller;

import com.report.studentsystem.model.User;
import com.report.studentsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private UserService userService;

    // Endpoint for a student to get their own report
    @GetMapping("/my-report")
    public ResponseEntity<User> getMyReport(Authentication authentication) {
        // Get the username of the currently logged-in user
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();

        // Find the user's data and return it
        User student = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        student.setPassword(null); // Never send the password
        return ResponseEntity.ok(student);
    }
}