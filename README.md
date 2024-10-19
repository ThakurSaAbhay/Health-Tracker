# Health Tracker 🚀 [</>](https://health-tracker-frontend-production.up.railway.app/)
  [![Code size](https://img.shields.io/github/languages/code-size/ThakurSaAbhay/Sage?style=for-the-badge)](https://github.com/ThakurSaAbhay/Health-Tracker)
  [![Issues](https://img.shields.io/github/issues/ThakurSaAbhay/Sage?style=for-the-badge&label=Issues)](https://github.com/ThakurSaAbhay/Health-Tracker)
  [![GitHub last commit](https://img.shields.io/github/last-commit/ThakurSaAbhay/Sage?style=for-the-badge&logo=git)](https://github.com/ThakurSaAbhay/Health-Tracker) 

A **Health Tracker Application** to log, track, and analyze health data such as weight, blood pressure, heart rate, cholesterol levels, blood sugar, BMI, and more. It provides detailed trends and insights for users to monitor their health over time. Built using **React**, **Spring-Boot** and **mySQL**

## 🏥 **Features**

- **User Authentication**: Login and Registration system to store and track health data.
- **Health Data Logging**: Users can input various health metrics such as:
  - Weight
  - Blood Pressure
  - Heart Rate
  - Cholesterol
  - Blood Sugar
  - BMI
  - Oxygen Saturation
- **Health Trends**: View trends and charts for each health metric to monitor progress over time.
- **Health Insights**: Recommendations based on health data inputs.
- **Dockerized**: Helps to containerize the services making it easily deployable on each machine.
- **Mobile Friendly**: Responsive design that works seamlessly on mobile devices.


## 🎯 **Tech Stack**

### Frontend
- **React.js**: UI for the health tracker app.
- **CSS3**: For modern, responsive styling.
- **Chart.js**: For rendering data trends and visualizations.
- **React Router**: For smooth page transitions within the app.

### Backend
- **Spring Boot**: RESTful API for handling requests.
- **MySQL**: Storing user and health data.
- **Docker**: Containerization of the backend service.
- **Railway**: Deployment of the frontend and backend services.
  
## 🛢 **Structure**
![Screenshot 2024-10-19 164222](https://github.com/user-attachments/assets/ab113284-9a79-4044-9507-d862831406f6)


## 🚀 **Getting Started**

### Prerequisites

Before you start, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [MySQL](https://www.mysql.com/)

### Frontend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/username/health-tracker-frontend.git
    cd health-tracker-frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm start
    ```

4. **Build the production build:**

    ```bash
    npm run build
    ```

5. **Run the Docker container:**

    ```bash
    docker build -t health-tracker-frontend .
    docker run -p 8080:80 health-tracker-frontend
    ```

### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/username/health-tracker-backend.git
    cd health-tracker-backend
    ```

2. **Build and Run the backend:**

    ```bash
    mvn clean install
    java -jar target/health-tracker-backend.jar
    ```

3. **Run using Docker:**

    ```bash
    docker build -t health-tracker-backend .
    docker run -p 8080:8080 health-tracker-backend
    ```


## 🖼️ **Screenshots**

### Landing Page
![Screenshot 2024-10-19 170913](https://github.com/user-attachments/assets/715c8686-2c33-48f5-86e2-767b5a69de40)


### Login Page
![Screenshot 2024-10-19 171133](https://github.com/user-attachments/assets/69a1dab0-3412-4c2e-b5f5-5fb999ee97d0)


### Health Trends
![Screenshot 2024-10-19 171223](https://github.com/user-attachments/assets/dc26a0d1-1260-46a0-aecc-47d85d9ef02d)


## 🛠️ **API Endpoints**

### User API
- `POST /users/login`: User login
- `POST /users/register`: User registration

### Health Data API
- `GET /healthdata/{id}`: Get user health data
- `POST /healthdata`: Post new health data
- `GET /healthdata/trends`: Get health data trends for graphs

## 🗒️ **Future Improvements**

- **Voice Integration**: Use voice commands for data logging and insights.
- **Health Insights with AI**: Generate personalized health recommendations using machine learning.
- **Integration with Smart Devices**: Sync data from wearable devices.

## 💻 **Contributing**

We welcome contributions! Please fork this repository and submit pull requests for improvements, new features, or bug fixes.

## 🛡️ **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 **Acknowledgements**

- Thanks to the open-source community for amazing libraries and frameworks.
- Special thanks to the developers of React, Spring Boot, and MySQL.
