# User Hub

A simple web application for registering, logging in, and viewing all users with profile details.

## Tech Stack
- Frontend: React.js (Material-UI)  
- Backend: Node.js (Express.js)  
- Database: MySQL  

## How to Run

### 1. Clone Project
```bash
git clone https://github.com/mnscoding/user_hub.git
cd user_hub
````

### 2. Backend

```bash
cd backend
npm install
```

Start backend:

```bash
npm run dev
```

### 3. Database

Run the following SQL commands in MySQL:

```sql
CREATE DATABASE Intern_Project;

USE Intern_Project;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    hobby VARCHAR(50) NOT NULL,
    skill_level ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
    short_bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Frontend

```bash
cd frontend
npm install
```
Start frontend:

```bash
npm start
```
