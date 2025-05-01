# GitHub Users API

A Node.js/TypeScript API that integrates with GitHub's API to fetch and transform user data, featuring authentication, caching, and request logging.

## Features

- **GitHub API Integration**

  - OAuth 2.0 authenticated requests
  - Data transformation to custom format
  - Rate limit handling with exponential backoff

- **Performance**

  - Redis caching (5-minute TTL)
  - Request/response logging
  - Optimized database queries

- **Security**

  - Helmet security middleware
  - Rate limiting (100 requests/15 minutes)
  - Environment-based configuration

- **Observability**
  - Detailed request logging
  - Health check endpoints
  - Structured error handling

## Tech Stack

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript
- **Framework**: Express
- **Database**: Sequelize (SQLite/PostgreSQL)
- **Cache**: Redis
- **Testing**: Jest, Supertest
- **Docs**: Swagger/OpenAPI

## Getting Started

### Prerequisites

- Node.js v18+
- Redis server
- GitHub Personal Access Token
- SQLite (for development) or PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/github-users-api.git
   cd github-users-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add your GitHub token and Redis URL:
   ```env
   GITHUB_TOKEN=your_github_token
   REDIS_URL=redis://localhost:6379
   ```
4. Start redis server:
   ```bash
   redis-server
   ```

### Running the Application

1. Start the application:

a. For development:

```bash
npm run dev
```

b. For production:

```bash
npm run build
npm run start:prod
```

2. Open your browser and navigate to `http://localhost:3000/api-docs` to view the API documentation.

### Running Tests

1. Run unit tests:
   ```bash
   npm test
   ```
2. Run integration tests:
   ```bash
    npm run test:integration
   ```
3. Run unittests:
   ```bash
   npm run test:unit
   ```
4. Run coverage tests:
   ```bash
   npm run test:coverage
   ```

## Environment Configuration

Create a `.env` file in the project root with these variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# GitHub API Configuration
GITHUB_API_URL=https://api.github.com
GITHUB_TOKEN=your_personal_access_token_here

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_CACHE_TTL=300  # 5 minutes in seconds

# Database Configuration (SQLite example)
DB_STORAGE_PATH=./database.sqlite

# Rate Limiting
API_RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
API_RATE_LIMIT_MAX=100  # 100 requests per window
```
