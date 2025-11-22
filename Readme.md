# TinyLink — URL Shortener (React + Tailwind + Express + PostgreSQL)

TinyLink is a full-stack URL Shortener built with:

- **Frontend:** React + Tailwind CSS  
- **Backend:** Express.js  
- **Database:** PostgreSQL (Neon)  
- **DB Access:** `pg` module with raw SQL (no ORM)  

It allows users to shorten long URLs, manage links, track clicks, and view link statistics.

---

## Features

### Core Functionality
- Create short URLs with random or custom codes  
- Redirect `<backend-url>/<code>` → target URL  
- Auto-track:
  - Total clicks  
  - Last clicked timestamp  
- List all links in dashboard  
- Delete existing short links  
- Stats page for individual short links

### UI Features
- Fully responsive React + Tailwind interface  
- Dashboard table (short URL, target URL, clicks, timestamps)  
- Clickable short URLs  
- Copy short URL button  
- Form to create a new short link  
- Modern clean UI

---

## Project Structure
```
/backend
├─ controllers/
├─ services/
├─ router/
├─ db/
├─ config/
├─ index.js
/frontend
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ api/
│ └─ App.jsx
├─ vite.config.js

```

---

## ⚙️ Backend Setup (Express + PostgreSQL)

### 1️⃣ Install dependencies
```bash
cd backend
npm install

```
### dotenv file setup
```
PORT=3000
DATABASE_URL=your-neon-db-url-here
```
```
npm start - start your backend
```



