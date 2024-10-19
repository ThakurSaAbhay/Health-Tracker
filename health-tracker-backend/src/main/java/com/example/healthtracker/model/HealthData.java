package com.example.healthtracker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "health_data")
public class HealthData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Double weight;

    @Column(nullable = false)
    private Double height;

    @Column
    private String bloodPressure;

    @Column
    private Integer heartRate;

    @Column
    private Double cholesterol;

    @Column
    private Double bloodSugar;

    @Column
    private Double oxygenSaturation;

    @Column
    private Double bmi;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public Integer getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }

    public Double getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(Double cholesterol) {
        this.cholesterol = cholesterol;
    }

    public Double getBloodSugar() {
        return bloodSugar;
    }

    public void setBloodSugar(Double bloodSugar) {
        this.bloodSugar = bloodSugar;
    }

    public Double getOxygenSaturation() {
        return oxygenSaturation;
    }

    public void setOxygenSaturation(Double oxygenSaturation) {
        this.oxygenSaturation = oxygenSaturation;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    @Override
    public String toString() {
        return "HealthData{" +
               "id=" + id +
               ", userId=" + userId +
               ", weight=" + weight +
               ", height=" + height +
               ", bloodPressure='" + bloodPressure + '\'' +
               ", heartRate=" + heartRate +
               ", cholesterol=" + cholesterol +
               ", bloodSugar=" + bloodSugar +
               ", oxygenSaturation=" + oxygenSaturation +
               ", bmi=" + bmi +
               ", timestamp=" + timestamp +
               '}';
    }
}
