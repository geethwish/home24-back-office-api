# Home24 Back Office API

Welcome to the **Home24 Back Office API** repository. This project provides backend services to manage and support the operations of Home24's back-office systems.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Home24 Back Office API is designed to handle various back-office functionalities such as Product management, category management, User management and authentication.

## Technologies Used

- **Programming Language**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [JWT](https://jwt.io/)
- **Environment Management**: [dotenv](https://github.com/motdotla/dotenv)
- **Testing**: [Jest](https://jestjs.io/)

## Getting Started

### Folder Structure

The project follows a modular structure to ensure scalability and maintainability:

```
home24-back-office-api/
├── src/
│   ├── controllers/    # Handles the logic for API endpoints
│   ├── models/         # Defines database schemas and models
│   ├── routes/         # Defines API routes
│   ├── middlewares/    # Custom middleware for request handling
│   ├── config/         # Configuration files (e.g., database)
│   └── app.js          # Main application setup
├── tests/              # Unit and integration tests
|__ Swagger/            # Api Documentation Yaml file
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
|__ tsconfig            # Typescript rules
└── README.md           # Project documentation
```

### Description of Key Folders

- **controllers/**: Contains logic for handling requests and responses for various API endpoints.
- **models/**: Includes Mongoose schemas and models for interacting with the MongoDB database.
- **routes/**: Defines the API routes and maps them to their respective controllers.
- **middlewares/**: Contains custom middleware for tasks like authentication and error handling.
- **config/**: Stores configuration files for database connections and other settings.
- **tests/**: Includes unit and integration tests to ensure code quality and reliability.
- **app.js**: The entry point of the application, where the Express app is initialized.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/home24-back-office-api.git
   cd home24-back-office-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and configure the following:

   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=3001
   ```
   Env variables will provide directly to you email

### Running the Application

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

## API Documentation

Detailed API documentation is available at `/api-docs` when the server is running. It is powered by [Swagger](https://swagger.io/).
