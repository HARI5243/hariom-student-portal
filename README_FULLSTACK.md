# Hariom Student Portal - Full Stack

A comprehensive student management system built with **React.js**, **Spring Boot**, and **MySQL**.

## 📋 Project Structure

```
student-portal/
├── frontend/                 # React.js Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── backend/                  # Spring Boot Backend
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── README.md
│
├── database/                 # MySQL Schema
│   └── schema.sql
│
└── README.md
```

## 🚀 Features

### Frontend
- ✅ User Authentication (Login/Register)
- ✅ Student Dashboard
- ✅ Profile Management
- ✅ Attendance Tracking
- ✅ Results Management
- ✅ Assignment Submission
- ✅ Notices Board
- ✅ Admin Dashboard

### Backend
- ✅ RESTful API
- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ Database Operations
- ✅ Error Handling
- ✅ Validation

### Database
- ✅ User Management
- ✅ Student Data
- ✅ Attendance Records
- ✅ Results Storage
- ✅ Assignment Tracking

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Axios
- React Router
- Tailwind CSS

**Backend:**
- Java 17+
- Spring Boot 3.0
- Spring Security
- Spring Data JPA
- MySQL

**Database:**
- MySQL 8.0
- JPA/Hibernate

## 📝 Setup Instructions

### Prerequisites
- Node.js 16+
- Java 17+
- MySQL 8.0
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Database Setup
```bash
mysql -u root -p < database/schema.sql
```

## 📚 API Documentation

Base URL: `http://localhost:8080/api`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Student
- `GET /student/profile` - Get student profile
- `GET /student/dashboard` - Get dashboard data
- `PUT /student/profile` - Update profile

### Attendance
- `GET /attendance` - Get attendance records
- `POST /attendance` - Mark attendance

### Results
- `GET /results` - Get results
- `POST /results` - Upload results

### Assignments
- `GET /assignments` - Get assignments
- `POST /assignments/submit` - Submit assignment

## 👨‍💻 Team

- **Developer**: Hariom Tiwari
- **Email**: tiwariohariom211@gmail.com
- **LinkedIn**: [Hariom Tiwari](https://linkedin.com/in/hariom-tiwari-913a8537a)

## 📞 Contact

📧 Email: tiwariohariom211@gmail.com
📱 Phone: +91 6206152782
📸 Instagram: [@hariom__tiwari__](https://instagram.com/hariom__tiwari__)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Last Updated**: June 09, 2026
**Version**: 1.0.0
