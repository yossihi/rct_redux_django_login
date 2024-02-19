# React/Redux/Django Authentication System

This project is a full-stack web application built with React, Redux, and Django, focusing on user authentication functionalities like login and registration.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration
- User login with authentication using JWT (JSON Web Tokens).
- Protected routes that require authentication.

## Technologies Used

- **Frontend:**
  - React
  - Redux for state management
  - React Router for navigation

- **Backend:**
  - Django
  - Django REST Framework for API development
  - JWT for token-based authentication

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yossihi/rct_redux_django_login.git
   cd rct_redux_django_login

2. Install dependencies:

   ```bash
   # Install backend dependencies
    cd backend
    pip install -r requirements.txt

    # Install frontend dependencies
    cd ../frontend/my-app
    npm install

3. Set up the database:
    ```bash
    # Run migrations
    cd backend
    python manage.py migrate

4. Start the development servers:
    ```bash
    # Start the Django development server
    cd backend
    python manage.py runserver

    # Start the React development server
    cd ../frontend/my-app
    npm start

# Folder Structure
- backend: Django backend code.
- frontend: React/Redux frontend code.

# Usage
1. Access the application at http://localhost:3000 in your browser.
2. Register a new account or log in with existing credentials.
3. Explore the authenticated sections of the application.

# Contributing
    Feel free to contribute by opening issues or submitting pull requests. Follow the CONTRIBUTING.md guidelines.