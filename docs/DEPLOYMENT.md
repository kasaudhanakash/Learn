# Deployment readiness

## Current status

The project is configured for local development and is **not yet ready for a working public deployment**.

The frontend currently calls `http://localhost:8080` from `frontend/src/api.js` and `frontend/src/Auth.jsx`. Spring Security currently allows `http://localhost:5173`. These settings must be changed for hosted frontend/backend services.

## Required changes

1. Replace hard-coded frontend localhost URLs with a Vite environment variable such as `VITE_API_BASE_URL` in both `api.js` and `Auth.jsx`.
2. Replace the hard-coded CORS origin in `SecurityConfig.java` with a Spring property such as `app.cors.allowed-origin`.
3. Supply database credentials and JWT signing secret through the backend host's environment variables/secret manager. Never deploy the local `application.properties`.
4. Provision managed MySQL and a restricted database user.
5. Deploy the backend on a Java 21-compatible host and verify database connectivity.
6. Build and deploy the frontend with `npm run build`; set its production API URL.
7. Test registration, login, authenticated requests, progress, reviews, profile changes, and password changes over HTTPS.

## Suggested hosting architecture

- Frontend: static hosting with Vite build support and environment variables.
- Backend: Java/Spring Boot application hosting.
- Database: managed MySQL reachable by the backend.

Check current free-tier limits, cold starts, region, and database connectivity before selecting providers.

## Example production settings

| Component | Setting | Meaning |
|---|---|---|
| Frontend | `VITE_API_BASE_URL` | HTTPS base URL of deployed API |
| Backend | `SPRING_DATASOURCE_URL` | JDBC URL for hosted MySQL |
| Backend | `SPRING_DATASOURCE_USERNAME` | Dedicated database user |
| Backend | `SPRING_DATASOURCE_PASSWORD` | Secret database password |
| Backend | `APP_JWT_SECRET` | Private random key, 32+ bytes |
| Backend | `APP_CORS_ALLOWED_ORIGIN` | Exact deployed frontend origin |

These are target settings. The code must first be updated to read the configurable API URL and CORS origin.

## Screenshots

After deployment, add screenshots of the homepage, catalogue, authentication page, and dashboard under `docs/images/`. Blur personal data and never show passwords or tokens.
