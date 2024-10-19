package com.example.healthtracker.repository;

import com.example.healthtracker.model.HealthData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthDataRepository extends JpaRepository<HealthData, Long> {
    // Custom method to find health data by userId
    List<HealthData> findByUserId(Long userId);
    List<HealthData> findByUserIdOrderByTimestampDesc(Long userId);

}
