# Expense Tracker App

The Expense Tracker App is a web application that helps users manage their finances by adding, editing, and deleting expenses. It also provides visualizations of the expenses through various charts.

## Features

- **Add, Edit, Delete Expenses**: Users can easily manage their expenses.
- **Expense List**: A detailed table displaying all expenses with sorting and filtering options.
- **Charts**: Visualize expenses by category, date, and amount with interactive bar and pie charts.
- **Responsive Design**: The application is fully responsive and works across different devices.

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Django, Django REST Framework, Python
- **Database**: SQLite (default with Django)
- **Charts**: Chart.js

## Installation

To run the Expense Tracker App locally, follow these steps:

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/expense-tracker-app.git
   cd expense-tracker-app/backend
   ```

2. **Create a virtual environment**:

   ```bash
   python3 -m venv venv
   venv/Scripts/activate
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**:

   ```bash
   cd ../expense_tracker
   python manage.py migrate
   ```

5. **Start the Django server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd ../expense_tracker/expense-tracker-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the React development server**:
   ```bash
   npm start
   ```

The app should now be running locally on `http://localhost:3000`.

## Usage

- **Add Expense**: Use the form on the homepage to add new expenses.
- **Edit Expense**: Click the "Edit" button next to an expense in the list to modify it.
- **Delete Expense**: Click the "Delete" button next to an expense in the list to remove it.
- **View Charts**: Scroll down to see various charts summarizing the expenses by category, date, and amount.

## Project Structure

- **Backend**:

  - `expense_tracker/`: Django project containing the API and models for managing expenses.
  - `expense_tracker/expenses/`: Django app specifically for expense-related models and views.
  - `expense_tracker/requirements.txt`: Python dependencies for the backend.

- **Frontend**:

  - `expense_tracker/expense-tracker-frontend/src/`: Contains React components and pages.
  - `expense_tracker/expense-tracker-frontend/src/components/`: Reusable components like `ExpenseList`, `ExpenseChart`, etc.
  - `expense_tracker/expense-tracker-frontend/src/App.tsx`: Main entry point of the React app.
  - `expense_tracker/expense-tracker-frontend/package.json`: Node.js dependencies for the frontend.
