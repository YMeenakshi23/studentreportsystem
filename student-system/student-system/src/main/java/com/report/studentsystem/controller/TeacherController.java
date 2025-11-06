package com.report.studentsystem.controller;

import com.report.studentsystem.dto.StudentReportDto;
import com.report.studentsystem.model.User;
import com.report.studentsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private UserService userService;

    // Endpoint to get a list of all students
    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        List<User> students = userService.findAllStudents();
        students.forEach(student -> student.setPassword(null)); // Don't send passwords
        return ResponseEntity.ok(students);
    }

    // Endpoint to update a student's report
    @PutMapping("/students/{id}/report")
    public ResponseEntity<User> updateStudentReport(@PathVariable Long id, @RequestBody StudentReportDto reportDto) {
        try {
            User updatedStudent = userService.updateStudentReport(id, reportDto);
            updatedStudent.setPassword(null);
            return ResponseEntity.ok(updatedStudent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/students")
    public ResponseEntity<User> createStudent(@RequestBody User studentDetails) {
        try {
            User newStudent = userService.createStudentByTeacher(studentDetails);
            newStudent.setPassword(null); // Never send password back
            return ResponseEntity.ok(newStudent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}