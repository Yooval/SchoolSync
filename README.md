
## Overview

The **School Events Management app** is a platform designed to coordinate and track school-related events, allowing teachers and students to create, join, and follow events effortlessly. It supports full **CRUD** (Create, Read, Update, Delete) operations for managing users, events, courses, and subjects, making it a versatile tool for the school community.

### Key Features

- **Event Management**: Both teachers and regular users can create events, such as classes or group activities. Users can respond to any event by choosing **Accept**, **Maybe**, or **Reject**, allowing all participants to stay updated on attendance and event organizers.
- **Subjects and Courses**: A flexible structure supports subjects and courses, where each subject can have multiple courses. Teachers must be associated with one or more subjects, ensuring academic events are linked to an instructor’s expertise.
- **Organizer and Attendance Tracking**: Each event logs the organizer and tracks user responses, providing a clear view of event engagement across the community.
- **Authentication and Authorization**: The app uses NestJS authentication mechanisms, enabling user registration and login with JWT tokens for secure access. Authorization ensures that only authorized users (such as teachers or admins) can manage specific resources, like events and courses, while regular users can interact with events based on their permissions.

### Technology and Development Stack

- **REST and GraphQL APIs**: The app provides APIs, allowing data interaction for all key functionalities through both REST and GraphQL, documented in Postman [here](https://documenter.getpostman.com/view/38510958/2sAY55bJLx#491d3242-5137-4f82-a8ab-800ac8aa4946). give it a try!
- - **MySQL Database**: The app uses **MySQL**.
- **Authentication & Authorization**: Authentication is handled using **JWT** (JSON Web Tokens) ensuring that only authorized users can perform specific actions, such as creating or managing events.
- **Error Handling**: Built-in NestJS error handling mechanisms ensure that any issues encountered during API requests are properly caught and communicated with meaningful HTTP status codes and error messages.
- **Testing**: Comprehensive **unit tests** and **end-to-end (e2e) tests** ensure all features work as expected.
- **Docker**: The app runs in a Docker container, providing a consistent and portable environment across different systems.

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

   Configuration details for the app are defined in the environment configuration files. There are **2** configuration files:
   - **Production Configuration** for running the app in a production environment.
   - **Development Configuration** for running the app in a local development environment.
   
   We use **two different development databases**: one for regular development and one for **end-to-end (e2e) testing**. These databases ensure that your development environment remains unaffected by test data.

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
