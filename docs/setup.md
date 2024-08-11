
### Prerequisites

- Node.js (v20.x.x)
- Docker
- Docker Compose

### Step 1: Clone the Repository

```bash
git clone git@github.com:rudra-kandel/bulk-email-processor.git
cd bulk-email-processor
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory of both `frontend` and `backend` folders.

Use the `.env.example` files as templates.

Populate the `.env` files with the necessary environment variables:

### Step 3: Build and Run the Application with Docker

```bash
docker-compose up --build
```

### Step 4: Access the Application