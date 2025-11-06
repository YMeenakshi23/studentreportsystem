package com.report.studentsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.report.studentsystem.model.User;
import com.report.studentsystem.service.UserService;
import java.util.List; // Import List

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    // Create teacher
    @PostMapping("/create-teacher")
    public ResponseEntity<?> createTeacher(@RequestBody User teacherDetails) {
        try {
            return ResponseEntity.ok(userService.createTeacher(teacherDetails));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: Could not create teacher account.");
        }
    }

    // Update teacher
    @PutMapping("/teachers/{id}")
    public ResponseEntity<?> updateTeacher(@PathVariable Long id, @RequestBody User updatedTeacher) {
        try {
            User updated = userService.updateTeacher(id, updatedTeacher);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update teacher.");
        }
    }

    // Delete teacher
    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable Long id) {
        try {
            userService.deleteTeacher(id);
            return ResponseEntity.ok("Teacher deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete teacher.");
        }
    }

    // Get all teachers
    @GetMapping("/teachers")
    public ResponseEntity<List<User>> getAllTeachers() {
        return ResponseEntity.ok(userService.findAllTeachers());
    }
}


// Admin Controller