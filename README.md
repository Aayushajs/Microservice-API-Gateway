# 🚀 Microservice API Gateway

A production-ready API Gateway built with **Node.js**, **Express**, and **TypeScript** for routing and managing requests to multiple microservices securely and efficiently.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Security](#security)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

This API Gateway acts as a single entry point for all client requests, routing them to appropriate microservices. It provides:

- **Unified API interface** for multiple backend services
- **Request/Response transformation** via proxy middleware
- **Security** through CORS, Helmet, and request validation
- **Logging and monitoring** with Morgan
- **Load balancing** support with trust proxy configuration
- **Graceful shutdown** handling

---

## ✨ Features

- ✅ **TypeScript** - Type-safe codebase with strict compiler options
- ✅ **Express.js** - Fast and minimalist web framework
- ✅ **HTTP Proxy Middleware** - Advanced request proxying with path rewriting
- ✅ **CORS** - Cross-Origin Resource Sharing enabled
- ✅ **Helmet** - Security headers for Express apps
- ✅ **Morgan** - HTTP request logger middleware
- ✅ **Environment Configuration** - Manage settings via `.env` files
- ✅ **Hot Reload** - Development mode with `ts-node-dev`
- ✅ **Production Build** - Compiled JavaScript output with source maps
- ✅ **Trust Proxy** - Support for deployment behind load balancers
- ✅ **Graceful Shutdown** - Clean server termination on SIGINT

---

## 🏗 Architecture

```
┌─────────────┐
│   Clients   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│    API Gateway          │
│  (This Application)     │
│                         │
│  - CORS & Security      │
│  - Request Logging      │
│  - Path Rewriting       │
│  - Load Balancing       │
└────┬──────────────┬─────┘
     │              │
     ▼              ▼
┌─────────┐   ┌─────────┐
│  User   │   │  Order  │
│ Service │   │ Service │
│  :4001  │   │  :4002  │
└─────────┘   └─────────┘
```

**Flow:**
1. Client sends request → API Gateway
2. Gateway applies security headers, logging, and CORS
3. Request is proxied to appropriate microservice based on route prefix
4. Microservice processes request and returns response
5. Gateway forwards response back to client

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - v20.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** - Package manager
- **TypeScript** - v5.9.x or higher (installed via devDependencies)

---

## 🛠 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Aayushajs/Microservice-API-Gateway.git
cd Microservice-API-Gateway
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the root directory:

```bash
touch .env
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=4000

# Microservice URLs
USER_SERVICE_URL=http://localhost:4001
ORDER_SERVICE_URL=http://localhost:4002

# Optional: Add more service URLs as needed
# PRODUCT_SERVICE_URL=http://localhost:4003
# PAYMENT_SERVICE_URL=http://localhost:4004
```

### Proxy Configuration

Edit `App.ts` to add more service routes:

```typescript
app.use(
  "/your-service",
  createProxyMiddleware({
    target: process.env.YOUR_SERVICE_URL || "http://localhost:4003",
    changeOrigin: true,
    proxyTimeout: 30000,
    timeout: 30000,
    pathRewrite: { "^/your-service": "" },
  } as any)
);
```

---

## 🚀 Usage

### Development Mode

Start the server with hot-reload:

```bash
npm run dev
```

The gateway will start at `http://localhost:4000` (or your configured PORT).

### Production Mode

Build and start the application:

```bash
npm run build
npm start
```

### Testing the Gateway

#### Health Check

```bash
curl http://localhost:4000/
```

**Response:**
```json
{
  "message": "API Gateway is running smoothly!"
}
```

#### User Service Request

```bash
curl -X POST http://localhost:4000/userservices/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

#### Order Service Request

```bash
curl http://localhost:4000/order/api/v1/orders
```

---

## 🛣 API Routes

### Gateway Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Health check endpoint |

### Proxied Routes

| Prefix | Target Service | Description |
|--------|----------------|-------------|
| `/userservices` | User Service (`:4001`) | User authentication, profile management |
| `/order` | Order Service (`:4002`) | Order creation, tracking, management |

**Examples:**

- `GET /userservices/api/v1/users` → `http://localhost:4001/api/v1/users`
- `POST /userservices/api/v1/users/login` → `http://localhost:4001/api/v1/users/login`
- `GET /order/api/v1/orders` → `http://localhost:4002/api/v1/orders`
- `POST /order/api/v1/orders` → `http://localhost:4002/api/v1/orders`

---

## 📜 Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start development server with hot-reload |
| `build` | `npm run build` | Compile TypeScript to JavaScript |
| `start` | `npm start` | Build and run production server |
| `prestart` | (auto) | Runs before `start` to build the project |

---

## 📁 Project Structure

```
Microservice-API-Gateway/
├── App.ts                 # Express app configuration and routes
├── server.ts              # Server entry point with graceful shutdown
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript compiler configuration
├── .env                   # Environment variables (create this)
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
└── dist/                  # Compiled JavaScript (generated)
    ├── App.js
    ├── server.js
    └── *.js.map
```

### Key Files

- **`App.ts`** - Main application file with middleware and proxy configuration
- **`server.ts`** - Server initialization and graceful shutdown logic
- **`tsconfig.json`** - TypeScript configuration with strict mode enabled
- **`.env`** - Environment-specific configuration (not in version control)

---

## 🔒 Security

### Security Features

1. **Helmet** - Sets secure HTTP headers
   - X-Content-Type-Options
   - X-Frame-Options
   - X-XSS-Protection
   - Strict-Transport-Security

2. **CORS** - Controls which origins can access the API

3. **Trust Proxy** - Properly handles requests behind reverse proxies/load balancers

4. **Timeouts** - Prevents hanging requests (30s default)

### Recommendations

- ✅ Use HTTPS in production
- ✅ Implement rate limiting (e.g., `express-rate-limit`)
- ✅ Add authentication middleware (JWT, OAuth)
- ✅ Validate and sanitize all inputs
- ✅ Use API keys for service-to-service communication
- ✅ Enable request logging for audit trails

---

## ⚡ Performance

### Optimization Tips

1. **Enable Compression**
   ```bash
   npm install compression
   ```
   ```typescript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add Caching** - Use Redis or in-memory caching for frequently accessed data

3. **Connection Pooling** - Configure `http-proxy-middleware` with keep-alive

4. **Load Balancing** - Deploy multiple gateway instances behind a load balancer

5. **Monitor Performance** - Use tools like:
   - PM2 for process management
   - New Relic / Datadog for APM
   - Prometheus + Grafana for metrics

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Error: "ECONNREFUSED" when proxying**

**Cause:** Target microservice is not running.

**Solution:**
```bash
# Ensure target services are running
# For user service:
cd user-service && npm start

# For order service:
cd order-service && npm start
```

#### 2. **"Too Many Requests (429)" in production**

**Cause:** Rate limiting or IP-based throttling.

**Solutions:**
- Verify `app.set('trust proxy', true)` is enabled
- Check upstream service rate limits
- Implement distributed rate limiting with Redis

#### 3. **Request body is empty in proxied requests**

**Cause:** Body parsing middleware consuming the stream before proxy.

**Solution:** Do not add `express.json()` or `express.urlencoded()` globally when using proxies. The gateway now streams requests directly.

#### 4. **TypeScript compilation errors**

**Solution:**
```bash
# Clean build and reinstall
rm -rf node_modules dist
npm install
npm run build
```

#### 5. **Port already in use**

**Solution:**
```bash
# Kill process using port 4000 (Windows)
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4000 | xargs kill -9
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Write type-safe TypeScript code
- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Aayush** - [@Aayushajs](https://github.com/Aayushajs)
- **Aaryan**

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) - Proxy middleware
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Helmet](https://helmetjs.github.io/) - Security headers

---

## 📞 Support

If you have any questions or need help:

- 📧 Open an [issue](https://github.com/Aayushajs/Microservice-API-Gateway/issues)
- 💬 Start a [discussion](https://github.com/Aayushajs/Microservice-API-Gateway/discussions)
- ⭐ Star this repository if you find it helpful!

---

**Made with ❤️ by Aayush and Aaryan**
