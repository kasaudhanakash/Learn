# ShikshaHub — Online Learning Platform

A full-stack online learning platform built with **React**, **Spring Boot**, and **MySQL-compatible TiDB Cloud**. Students can register, log in, browse courses, enroll, track lesson completion, and submit course reviews.

> **Status:** Local development and cloud database integration completed. Public live deployment is pending.

## Features

- Student registration and JWT-based login
- BCrypt password hashing with Spring Security
- Course catalogue with title search and category filtering
- Course enrollment and saved lesson progress
- Course ratings and written reviews
- Student dashboard with enrolled courses and progress summaries
- Profile-name and password updates

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, JavaScript, CSS |
| Backend | Java 21, Spring Boot, Spring Web |
| Security | Spring Security, JWT (JJWT), BCrypt |
| Persistence | Spring Data JPA, Hibernate |
| Database | TiDB Cloud (MySQL compatible) |
| Build tools | npm, Maven Wrapper |

## Repository Structure

```text
ShikshaHub/
├── frontend/                  # React + Vite application
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/                   # Spring Boot REST API
│   ├── src/main/java/backend/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── mvnw / mvnw.cmd
├── docs/
│   ├── LOCAL_SETUP.md
│   └── DEPLOYMENT.md
├── .gitignore
└── README.md
```

## Run Locally

### Prerequisites

- Java 21
- Node.js and npm
- MySQL Server or TiDB Cloud credentials

### 1. Create a database

```sql
CREATE DATABASE shikshahub;
```

### 2. Configure the backend

Copy the example configuration to your private local configuration file.

**Windows PowerShell**

```powershell
Copy-Item backend/src/main/resources/application-example.properties backend/src/main/resources/application.properties
```

**macOS/Linux**

```bash
cp backend/src/main/resources/application-example.properties backend/src/main/resources/application.properties
```

Configure your database URL, username, password, and a private JWT secret using environment variables. Never commit credentials or secrets.

Start the backend:

**Windows**

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**macOS/Linux**

```bash
cd backend
./mvnw spring-boot:run
```

The backend runs at `http://localhost:8080`.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

### 4. Try the application

1. Register a test student account.
2. Log in.
3. Search and filter the course catalogue.
4. Enroll in a course and mark lessons complete.
5. Check the dashboard for saved progress.
6. Submit a course review.
7. Test profile-name and password updates.

## API Overview

Authenticated requests use `Authorization: Bearer <token>`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a student |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/users/me` | Get current user's profile |
| PUT | `/api/users/me` | Update profile name |
| PUT | `/api/users/me/password` | Change password |
| GET | `/api/progress` | Get current user's progress |
| PUT | `/api/progress/{courseId}` | Save enrollment/progress |
| GET | `/api/reviews/{courseId}` | Read course reviews |
| POST | `/api/reviews/{courseId}` | Submit a course review |

## Screenshots

Add real, non-sensitive screenshots under `docs/images/` (homepage, course catalogue, course details, login/register, dashboard). Do not show real email addresses, passwords, tokens, or private data.

## Documentation

- [Local setup](docs/LOCAL_SETUP.md)
- [Deployment readiness](docs/DEPLOYMENT.md)

## Security

- Keep `application.properties` and `.env` files out of Git.
- Use a unique, random JWT signing secret for each environment.
- Use a restricted database user and HTTPS in production.
- Configure frontend API URL and backend CORS origin for each deployment environment.

## Future Improvements

- Automated frontend/backend tests and CI
- Course content managed by the backend/database
- Public deployment and screenshots
- Improved course discovery and learning features

## Author

**Akash Gupta** — [GitHub](https://github.com/kasaudhanakash)