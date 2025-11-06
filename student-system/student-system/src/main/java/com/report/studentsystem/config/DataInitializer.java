package com.report.studentsystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.report.studentsystem.model.Role;
import com.report.studentsystem.model.User;
import com.report.studentsystem.repository.UserRepository;
@Component
public class DataInitializer implements CommandLineRunner {

 @Autowired
 private UserRepository userRepository;

 @Autowired
 private PasswordEncoder passwordEncoder;

 @Override
 public void run(String... args) {
     // Create an admin user if one doesn't exist
     if (userRepository.findByUsername("admin").isEmpty()) {
         User admin = new User(
             "admin",
             passwordEncoder.encode("admin123"), // Use a strong password in production!
             Role.ADMIN
         );
         userRepository.save(admin);
         System.out.println("✅ Admin user created successfully!");
     }
 }
}