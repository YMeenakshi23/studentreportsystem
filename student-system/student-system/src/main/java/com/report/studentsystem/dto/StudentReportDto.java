package com.report.studentsystem.dto;

public class StudentReportDto {
    private String grades;
    private Integer attendance;
    private String remarks;

    // Add Getters and Setters
    public String getGrades() { return grades; }
    public void setGrades(String grades) { this.grades = grades; }
    
    public Integer getAttendance() { return attendance; }
    public void setAttendance(Integer attendance) { this.attendance = attendance; }
    
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}