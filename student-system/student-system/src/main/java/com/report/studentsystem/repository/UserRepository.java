package com.report.studentsystem.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.report.studentsystem.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

 // Spring Data JPA automatically creates the query for us based on the method name
 Optional<User> findByUsername(String username);
}
