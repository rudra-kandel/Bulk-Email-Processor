# Bulk Email Processing Software

## Overview

This project is a bulk email processing system built with Node.js, Express, React, and RabbitMQ. It allows users to authenticate, select email templates, upload a CSV of email addresses, send bulk emails, and view real-time logs. It allows users to sign up, log in, choose email templates, upload CSV files containing email addresses, and send bulk emails. Users can view email sending logs in real-time using Socket.IO. The application is built with a layered architecture using Node.js, Express, React, and includes Docker for easy deployment.

## Table of Contents

1. [Features](#features)
2. [Setup](#setup)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [Folder Structure](#folder-structure)
6. [Best Practices](#best-practices)
7. [License](#license)

## Features

- **User Authentication**: Sign up, log in, and secure your account.
- **Email Templates**: Choose from predefined email templates or create your own.
- **Bulk Email Sending**: Upload a CSV file with email addresses and send personalized emails in bulk.
- **Real-Time Logs**: Monitor email sending progress and view logs in real-time via Socket.IO.
- **Error Handling & Retry Mechanism**: Robust error handling with retry logic for failed emails.
- **Database**: Uses PostgreSQL for storing user data, email templates, and logs.
- **Message Queue**: RabbitMQ is used to manage bulk email jobs efficiently.
- **Dockerized Deployment**: Easily deploy the application with Docker, including RabbitMQ and PostgreSQL as services.

## Setup

For detailed setup instructions, refer to the [Setup Guide](docs/setup.md).

## Usage

For usage instructions, including how to send bulk emails and view logs, see the [Usage Guide](docs/usage.md).

## API Endpoints

A list of all available API endpoints can be found in the [API Endpoints Documentation](docs/apiEndpoints.md).

## Folder Structure

Folder Structure [Folder Structure](docs/folderStructure.md).


## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: React.js, Tailwind CSS, Socket.IO
- **Database**: PostgreSQL, Sequelize ORM
- **Message Queue**: RabbitMQ
- **Email Sending**: Nodemailer, Mailtrap for testing
- **Containerization**: Docker
- **Security**: JWT for authentication, Helmet for securing HTTP headers
- **Validation**: Joi for request validation
- **Logging**: Winston for logging
- **Architecture**: Layered architecture following SOLID principles

## Installation

## Best Practices

Best Practices [Best Practices](docs/bestPractices.md).

## Licencse

License

