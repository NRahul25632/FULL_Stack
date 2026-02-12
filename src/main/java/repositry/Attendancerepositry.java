package com.example.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.attendance.model.Attendance;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
}
