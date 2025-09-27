# Expense Tracker with Category Insights

## Project Overview

This is a **full-stack Expense Tracker** project where users can log daily expenses, categorize them, and view insights into their spending. The frontend is built with **React**, while the backend is powered by **FastAPI**.

Users can:

* Add a new expense with amount, category, and date.
* View all expenses for a particular date.
* View a summary of spending, including total spend and category-wise breakdown.
* Update an existing expense.
* (Optional) Delete expenses and view charts for insights.

---

## File Structure (Frontend)

Your current frontend project structure looks like this:

```
public/
├── favicon.ico
├── index.html
├── logo192.png
├── logo512.png
├── manifest.json
├── robots.txt

src/
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
├── setupTests.js

.gitignore
README.md
package-lock.json
package.json
```

### Key Files

* **App.js** → Main React component that ties everything together.
* **index.js** → Entry point for React app.
* **App.css / index.css** → Stylesheets.
* **public/index.html** → Base HTML file.
* **reportWebVitals.js & setupTests.js** → Performance monitoring & testing setup.

---

## Features

1. Add expense (amount, category, date)
2.  Predefined & custom categories
3.  View expenses by date
4.  Summary with total + category breakdown
5.  Update an expense

**Optional enhancements:**

* Filter by date range (month/custom)
* Charts (Pie/Bar) for category insights
* Delete expense
* Authentication for multi-user support

---

## Tech Stack

* **Frontend**: React (Create React App)
* **Backend**: FastAPI (Python)
* **Database**: MySQL 
* **Charts (optional)**: Chart.js / Recharts
* **HTTP Client**: Axios / Fetch API

---

## Getting Started

### Prerequisites

* Node.js & npm installed
* Python 3.9+ with pip

### Setup Frontend

```bash
cd frontend   # (your React app root)
npm install   # install dependencies
npm start     # run dev server (default: http://localhost:3000)
```

### Setup Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

## API Endpoints (Backend)

* **POST /expenses** → Add a new expense
* **GET /expenses?date=YYYY-MM-DD** → Get expenses for a date
* **GET /expenses/summary** → Get total & category-wise breakdown
* **PUT /expenses/{id}** → Update an expense
* **DELETE /expenses/{id}** → Delete an expense (optional)

---

## Example Usage

**Add an expense**

```bash
curl -X POST http://localhost:8000/expenses \
  -H "Content-Type: application/json" \
  -d '{"amount": 200, "category": "Food", "date": "2025-09-27"}'
```

**Get summary**

```bash
curl http://localhost:8000/expenses/summary
```

## Contact

+91 83298 92836
