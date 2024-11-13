
---

## Overview

The School Events Management app is a robust platform designed to coordinate and track school-related events, allowing teachers and students to create, join, and follow events effortlessly. It supports full **CRUD** (Create, Read, Update, Delete) operations for managing users, events, courses, and subjects, making it a versatile tool for the school community.

### Key Features

- **Event Management**: Both teachers and regular users can create events, such as classes or group activities. Users can respond to any event by choosing **Accept**, **Maybe**, or **Reject**, allowing all participants to stay updated on attendance and event organizers.
- **Subjects and Courses**: A flexible structure supports subjects and courses, where each subject can have multiple courses. Teachers must be associated with one or more subjects, ensuring academic events are linked to an instructor’s expertise.
- **Organizer and Attendance Tracking**: Each event logs the organizer and tracks user responses, providing a clear view of event engagement across the community.

### Technology and Development Stack

- **NestJS Framework**: Built using NestJS, which provides a modular structure and uses the NestJS CLI to streamline development and enforce advanced design patterns. This enables clean, maintainable, and scalable code, following best practices in backend architecture.
- **REST and GraphQL APIs**: The app provides robust APIs, allowing flexible and efficient data interaction for all key functionalities through both REST and GraphQL.
- **TypeORM and Query Builder**: Integrates MySQL with **TypeORM** and **Query Builder** to facilitate database interactions, making it easy to structure, manage, and retrieve relational data.
- **MySQL Database**: The app uses MySQL as the primary data store, managed via TypeORM for seamless and structured database operations.
- **Testing**: Comprehensive **unit tests** and **end-to-end (e2e) tests** ensure all features work as expected.
- **Docker**: The app runs in a Docker container, providing a consistent and portable environment across different systems.
- **Postman Documentation**: All API requests, including both REST and GraphQL endpoints, are fully documented in Postman. This makes it easy for developers and users to explore, test, and understand the functionalities available.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   This command installs all dependencies listed in the `package.json` file.

3. **Set up Environment Variables**:

   You need two `.env` files, one for regular development and one for end-to-end testing. Each environment file should connect to a different database.

   - **e2e.env** (for end-to-end testing):
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=example
     DB_NAME=nest-events-e2e
     DB_DROP_SCHEMA=1

     APP_URL=mywebsite.com
     SUPPORT_EMAIL=support@${APP_URL}

     AUTH_SECRET=secret123
     ```

   - **dev.env** (for regular development):
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=example
     DB_NAME=nest-events
     DB_DROP_SCHEMA=0

     APP_URL=mywebsite.com
     SUPPORT_EMAIL=support@${APP_URL}

     AUTH_SECRET=secret123
     ```

   The `DB_DROP_SCHEMA` variable is set to `1` in `e2e.env` to allow automatic schema dropping for test resets. In `dev.env`, it’s set to `0` to preserve data between development sessions.

4. **Run the app with Docker**:
   ```bash
   docker-compose up --build
   ```

5. **Testing**:
   - **Unit Tests**:
     ```bash
     npm run test:unit
     ```
   - **End-to-End (e2e) Tests**:
     ```bash
     npm run test:e2e
     ```

## Local Development

After setting up your environment, use the app’s GraphQL playground and Postman to explore the API, test events, and manage user participation.

---
