# ShikshaHub – Local Setup Guide

Follow these steps to run ShikshaHub on your local machine.

## 1. Create the database

Create a MySQL-compatible database named `shikshahub`:

```sql
CREATE DATABASE shikshahub;
```

Use a dedicated database user with access only to this database where possible.

## 2. Configure the backend

Copy `backend/src/main/resources/application-example.properties` to `backend/src/main/resources/application.properties`.

**Windows PowerShell:**

```powershell
Copy-Item backend/src/main/resources/application-example.properties backend/src/main/resources/application.properties
```

**macOS / Linux:**

```bash
cp backend/src/main/resources/application-example.properties backend/src/main/resources/application.properties
```

Configure your database URL, username, password, and a private JWT secret. Never commit your real credentials or `application.properties` file.

For TiDB Cloud, use the connection details provided by your TiDB instance and enable the required TLS settings.

## 3. Run the backend

**Windows PowerShell:**

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

**macOS / Linux:**

```bash
cd backend
./mvnw spring-boot:run
```

The backend runs on port `8080` by default.

## 4. Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## 5. Smoke test

1. Register a test account and log in.
2. Browse and enroll in a course.
3. Mark a lesson complete and refresh the page.
4. Confirm that progress is retained.
5. Submit a course review.
6. Test profile-name and password updates.

Use test accounts and non-sensitive sample data.