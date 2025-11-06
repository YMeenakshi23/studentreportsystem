package com.report.studentsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.report.studentsystem.config.JwtUtil;
import com.report.studentsystem.dto.AuthRequestDto;
import com.report.studentsystem.model.User;
import com.report.studentsystem.service.UserService;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // We need to inject the AuthenticationManager and JwtUtil
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    // Endpoint for any new user to register as a STUDENT
    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody AuthRequestDto registerRequest) {
        try {
            return ResponseEntity.ok(userService.registerStudent(registerRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: Username might already be taken.");
        }
    }

    // NEW: Endpoint for any user to log in
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequestDto authRequest) throws Exception {
        // Authenticate the user with username and password
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (Exception e) {
            // If authentication fails, throw an exception
            throw new Exception("Incorrect username or password", e);
        }

        // If authentication is successful, find the user details
        final User user = userService.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new Exception("User not found"));

        // Generate a JWT for the user
        final String jwt = jwtUtil.generateToken(user);

        // Return the token in the response
        return ResponseEntity.ok(Map.of("token", jwt));
    }
}