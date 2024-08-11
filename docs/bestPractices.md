# Best Practices Followed

- **SOLID Principles:** The application strictly follows SOLID principles for a scalable and maintainable codebase.
- **Layered Architecture:** Separation of concerns is maintained across controllers, services, and repositories.
- **Security:** JWT-based authentication, Helmet for securing HTTP headers.
- **Validation:** All incoming requests are validated using Joi.
- **Error Handling:** Centralized error handling mechanism with custom error classes.
- **Logging:** Winston is configured for structured logging.
- **Environment Configuration:** Sensitive information is stored in environment variables, not hard-coded.
- **Dockerization:** Application and dependencies (RabbitMQ, PostgreSQL) are containerized for easy deployment and consistency across environments.
