# Local setup

## Prerequisites
- Java 21
- Node.js and npm
- MySQL Server

Check installations:

```bash
java -version
node --version
npm --version
```

## 1. Create database

Start MySQL and run:

```sql
CREATE DATABASE learnhub;
```

Use a dedicated MySQL user with access only to this database where possible.

## 2. Configure backend

Copy `backend/src/main/resources/application-example.properties` to `backend/src/main/resources/application.properties`.

Windows PowerShell:

```powershell
Copy-Item backend/src/main/resources/application-example.properties backend/src/main/resources/application.properties
```

macOS/Linux:

```bash
cp backend/src/main/resources/application-example.properties backend/src/main/resources/application.properties
```

Set your local database credentials and a private JWT secret of at least 32 bytes. Never commit this file.

## 3. Run backend

Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

macOS/Linux:

```bash
cd backend
./mvnw spring-boot:run
```

The local backend uses port 8080.

## 4. Run frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## 5. Smoke test

1. Register a test account and log in.
2. Enroll in a course.
3. Mark a lesson complete and refresh the page.
4. Confirm progress is retained.
5. Submit a review.
6. Test profile-name and password updates.

Use test accounts and non-sensitive sample data.
