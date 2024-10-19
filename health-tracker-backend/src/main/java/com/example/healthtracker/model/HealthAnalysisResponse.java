package com.example.healthtracker.model;

public class HealthAnalysisResponse {
    private double bmi;
    private String bmiClassification;
    private String bloodPressureStatus;
    private String heartRateStatus;
    private String cholesterolStatus;
    private String bloodSugarStatus;
    private String oxygenStatus;

    public HealthAnalysisResponse(double bmi, String bmiClassification, String bloodPressureStatus,
                                  String heartRateStatus, String cholesterolStatus, 
                                  String bloodSugarStatus, String oxygenStatus) {
        this.bmi = bmi;
        this.bmiClassification = bmiClassification;
        this.bloodPressureStatus = bloodPressureStatus;
        this.heartRateStatus = heartRateStatus;
        this.cholesterolStatus = cholesterolStatus;
        this.bloodSugarStatus = bloodSugarStatus;
        this.oxygenStatus = oxygenStatus;
    }

    public double getBmi() {
        return bmi;
    }

    public void setBmi(double bmi) {
        this.bmi = bmi;
    }

    public String getBmiClassification() {
        return bmiClassification;
    }

    public void setBmiClassification(String bmiClassification) {
        this.bmiClassification = bmiClassification;
    }

    public String getBloodPressureStatus() {
        return bloodPressureStatus;
    }

    public void setBloodPressureStatus(String bloodPressureStatus) {
        this.bloodPressureStatus = bloodPressureStatus;
    }

    public String getHeartRateStatus() {
        return heartRateStatus;
    }

    public void setHeartRateStatus(String heartRateStatus) {
        this.heartRateStatus = heartRateStatus;
    }

    public String getCholesterolStatus() {
        return cholesterolStatus;
    }

    public void setCholesterolStatus(String cholesterolStatus) {
        this.cholesterolStatus = cholesterolStatus;
    }

    public String getBloodSugarStatus() {
        return bloodSugarStatus;
    }

    public void setBloodSugarStatus(String bloodSugarStatus) {
        this.bloodSugarStatus = bloodSugarStatus;
    }

    public String getOxygenStatus() {
        return oxygenStatus;
    }

    public void setOxygenStatus(String oxygenStatus) {
        this.oxygenStatus = oxygenStatus;
    }

    @Override
    public String toString() {
        return "HealthAnalysisResponse{" +
                "bmi=" + bmi +
                ", bmiClassification='" + bmiClassification + '\'' +
                ", bloodPressureStatus='" + bloodPressureStatus + '\'' +
                ", heartRateStatus='" + heartRateStatus + '\'' +
                ", cholesterolStatus='" + cholesterolStatus + '\'' +
                ", bloodSugarStatus='" + bloodSugarStatus + '\'' +
                ", oxygenStatus='" + oxygenStatus + '\'' +
                '}';
    }
}
