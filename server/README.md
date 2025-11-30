# Server

This folder contains a minimal Express server used for local development and testing.

Endpoints:
- `GET /api/students` - returns `{ students: [...] }`
- `POST /api/login` - accepts JSON `{ rollNo, password }`, returns `{ user }` on success

Run locally:

```powershell
npm install
npm run server
```
