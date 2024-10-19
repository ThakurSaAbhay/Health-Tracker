package com.example.healthtracker.controller;

import com.example.healthtracker.model.HealthData;
import com.example.healthtracker.model.HealthAnalysisResponse;
import com.example.healthtracker.repository.HealthDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/healthdata")
@CrossOrigin(origins = {"http://localhost:3000", "https://health-tracker-frontend-production.up.railway.app"})
public class HealthDataController {

    @Autowired
    private HealthDataRepository healthDataRepository;

    @GetMapping
    public List<HealthData> getAllHealthData() {
        return healthDataRepository.findAll();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getHealthDataByUserId(@PathVariable Long userId) {
        List<HealthData> healthData = healthDataRepository.findByUserId(userId);
        if (healthData.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(healthData);
    }

    @PostMapping
    public HealthData createHealthData(@RequestBody HealthData healthData) {
        System.out.println("Received HealthData: " + healthData);
        return healthDataRepository.save(healthData);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HealthData> updateHealthData(@PathVariable Long id, @RequestBody HealthData newHealthData) {
        Optional<HealthData> existingHealthData = healthDataRepository.findById(id);

        if (existingHealthData.isPresent()) {
            HealthData updatedData = existingHealthData.get();
            updatedData.setWeight(newHealthData.getWeight());
            updatedData.setHeight(newHealthData.getHeight());
            updatedData.setBloodPressure(newHealthData.getBloodPressure());
            updatedData.setHeartRate(newHealthData.getHeartRate());
            updatedData.setCholesterol(newHealthData.getCholesterol());
            updatedData.setBloodSugar(newHealthData.getBloodSugar());
            updatedData.setOxygenSaturation(newHealthData.getOxygenSaturation());

            HealthData savedData = healthDataRepository.save(updatedData);
            return ResponseEntity.ok(savedData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHealthData(@PathVariable Long id) {
        Optional<HealthData> healthData = healthDataRepository.findById(id);
        if (healthData.isPresent()) {
            healthDataRepository.delete(healthData.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<HealthData>> getHealthDataHistory(@PathVariable Long userId) {
        List<HealthData> healthDataHistory = healthDataRepository.findByUserIdOrderByTimestampDesc(userId);
        if (healthDataHistory.isEmpty()) {
            return ResponseEntity.status(404).body(null); // Return 404 if no data found
        }
        return ResponseEntity.ok(healthDataHistory);
    }

    @PostMapping("/analysis")
    public ResponseEntity<HealthAnalysisResponse> analyzeHealthData(@RequestBody HealthData healthData) {
        double bmi = healthData.getWeight() / Math.pow(healthData.getHeight(), 2);
        String bmiClassification = classifyBMI(bmi);
        String bloodPressureStatus = analyzeBloodPressure(healthData.getBloodPressure());
        String heartRateStatus = (healthData.getHeartRate() >= 60 && healthData.getHeartRate() <= 100) ? "Normal" : "Abnormal";
        String cholesterolStatus = analyzeCholesterol(healthData.getCholesterol()); // Change Double to correct type
        String bloodSugarStatus = analyzeBloodSugar(healthData.getBloodSugar()); // Change Double to correct type
        String oxygenStatus = (healthData.getOxygenSaturation() >= 95) ? "Normal" : "Low";

        HealthAnalysisResponse response = new HealthAnalysisResponse(bmi, bmiClassification, bloodPressureStatus, heartRateStatus, cholesterolStatus, bloodSugarStatus, oxygenStatus);
        return ResponseEntity.ok(response);
    }

    // Helper methods for analysis
    private String classifyBMI(double bmi) {
        if (bmi < 18.5) return "Underweight";
        else if (bmi < 24.9) return "Normal weight";
        else if (bmi < 29.9) return "Overweight";
        else return "Obesity";
    }

    private String analyzeBloodPressure(String bloodPressure) {
        String[] parts = bloodPressure.split("/");
        int systolic = Integer.parseInt(parts[0].trim());
        int diastolic = Integer.parseInt(parts[1].trim());

        if (systolic < 120 && diastolic < 80) return "Normal";
        else if (systolic < 130 && diastolic < 80) return "Elevated";
        else if (systolic < 140 || diastolic < 90) return "Hypertension Stage 1";
        else return "Hypertension Stage 2";
    }

    private String analyzeCholesterol(Double cholesterol) {
        if (cholesterol < 200) return "Normal";
        else if (cholesterol < 240) return "Borderline";
        else return "High";
    }

    private String analyzeBloodSugar(Double bloodSugar) {
        if (bloodSugar < 140) return "Normal";
        else if (bloodSugar < 200) return "Prediabetes";
        else return "Diabetes";
    }
    
    
}
