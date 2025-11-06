🎓 Student Grading System
🧩 Overview

The Student Grading System is a full-stack web application designed to manage and automate student grading with role-based access control.
It allows Admins, Teachers, and Students to interact through dedicated roles with specific privileges.

🚀 Tech Stack

Frontend: React.js

Backend: Spring Boot

Database: MySQL

Version Control: Git & GitHub

👥 User Roles & Permissions
🧑‍💼 Admin

Has full system access.

Can create teacher accounts.

Can view, edit, or delete any teacher or student record.

Oversees all grading activity.

👩‍🏫 Teacher

Can log in using credentials provided by Admin.

Can add new students.

Can grade students and update marks.

Can view student reports.

🎓 Student

Can log in using their credentials.

Can view their grades and performance reports.

🛠️ Features

Secure role-based authentication.

CRUD operations for teachers and students.

Dynamic grading system managed by teachers.

MySQL database integration for data persistence.

Spring Boot REST API backend.

React UI for responsive and user-friendly interaction.

⚙️ How to Run
Backend (Spring Boot)

Open backend in your IDE (Eclipse/IntelliJ).

Configure application.properties with your MySQL credentials:

spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=yourpassword


Run the application as Spring Boot App.

Frontend (React)

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the React app:

npm start

📜 License

This project is developed for academic and learning purposes under an open license.
