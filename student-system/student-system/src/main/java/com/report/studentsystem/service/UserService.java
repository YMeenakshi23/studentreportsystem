package com.report.studentsystem.service;

import com.report.studentsystem.dto.AuthRequestDto;
import com.report.studentsystem.dto.StudentReportDto; // Add this import
import com.report.studentsystem.model.Role;
import com.report.studentsystem.model.User;
import com.report.studentsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Add this import

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- Existing Methods ---

    public User registerStudent(AuthRequestDto authRequest) {
        User newUser = new User();
        newUser.setUsername(authRequest.getUsername());
        newUser.setPassword(passwordEncoder.encode(authRequest.getPassword()));
        newUser.setRole(Role.STUDENT);
        return userRepository.save(newUser);
    }

    public User createTeacher(User teacherDetails) {
        teacherDetails.setRole(Role.TEACHER);
        teacherDetails.setPassword(passwordEncoder.encode(teacherDetails.getPassword()));
        return userRepository.save(teacherDetails);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAllTeachers() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.TEACHER)
                .collect(Collectors.toList());
    }

    public User updateTeacher(Long id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        existingUser.setFirstName(userDetails.getFirstName());
        existingUser.setLastName(userDetails.getLastName());
        existingUser.setEmail(userDetails.getEmail());
        // ... update other fields as needed
        return userRepository.save(existingUser);
    }

    public void deleteTeacher(Long id) {
        userRepository.deleteById(id);
    }

    // --- NEW METHODS REQUIRED BY TeacherController ---

    /**
     * Finds all users with the STUDENT role.
     */
    public List<User> findAllStudents() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.STUDENT)
                .collect(Collectors.toList());
    }

    /**
     * Updates a student's report details (grades, attendance, remarks).
     */
    @Transactional
    public User updateStudentReport(Long studentId, StudentReportDto reportDto) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));

        if (student.getRole() != Role.STUDENT) {
            throw new RuntimeException("User is not a student.");
        }

        student.setGrades(reportDto.getGrades());
        student.setAttendance(reportDto.getAttendance());
        student.setRemarks(reportDto.getRemarks());

        return userRepository.save(student);
    }

    /**
     * Creates a new student account (typically called by a teacher).
     */
    public User createStudentByTeacher(User studentDetails) {
        studentDetails.setRole(Role.STUDENT);
        studentDetails.setPassword(passwordEncoder.encode(studentDetails.getPassword()));
        return userRepository.save(studentDetails);
    }
}