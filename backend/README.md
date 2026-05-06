# ⚙️ Readygo Backend

This folder contains the backend code for the Readygo platform. Built with **Node.js** and **Express.js**, it serves as the REST API for the Hyperlocal Service Marketplace.

---

## 🛠️ Key Features
1. **API Endpoints**: Customer onboarding, service creation, bookings, referrals, wallet management.
2. **Real-time Updates**: Location tracking of service professionals.
3. **Database**: PostgreSQL, optimized for transactional integrity.
4. **Authentication**: Firebase Auth (OTP login system).
5. **Third-Party Integrations**: WhatsApp API (Interakt), Google Maps API.
6. **Environment-Secured**: Configured with `.env` for sensitive info.

---

## 📁 Project Structure

```
backend/
├── src/                   # Source code
│   ├── app.js            # Express app configuration
│   ├── routes/           # Route handlers
│   ├── controllers/      # API business logic
│   ├── models/           # Database models (e.g., Sequelize/Knex)
│   ├── services/         # External API handlers (WhatsApp, Maps, etc.)
│   ├── middleware/       # Auth and validation middleware
│   ├── utils/            # Helper functions
│   ├── config/           # Environment configurations
│   └── validators/       # Input validation (e.g., Joi)
├── migrations/           # Database migrations
├── seeds/                # Sample test data
├── tests/                # Unit/integration tests
├── .env.example          # Environment Variable Template
├── package.json          # Node.js dependencies
└── README.md             # How to set up the backend locally
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16.x+
- PostgreSQL v12+
- Firebase Project w/ Phone Auth enabled
- WhatsApp Business API credentials
- Google Maps API credentials

---

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment Variables
- Duplicate the `.env.example` file and rename it to `.env`:
```bash
cp .env.example .env
```
- Set your API keys, database credentials, and other secrets.

### 3. Run Database Migrations
```bash
npm run migrate
```

### 4. Start the Development Server
```bash
npm run dev
```
The API will run on [http://localhost:4000](http://localhost:4000).

---

## 🔗 API Endpoints

### **Auth/Users**
| Method | Endpoint               | Description         |
|--------|------------------------|---------------------|
| POST   | `/auth/register`       | Register user       |
| POST   | `/auth/login`          | OTP login system    |
| GET    | `/users`               | Get all users       |
| GET    | `/users/:id`           | Get user by ID      |
| PATCH  | `/users/:id`           | Update user profile |

### **Services/Bookings**
| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/services`            | List all services        |
| POST   | `/bookings`            | Create a new booking     |
| GET    | `/bookings/:id`        | Get booking details      |
| PATCH  | `/bookings/:id/status` | Update booking status    |
| GET    | `/professionals/nearby`| Find nearby professionals|

*(Full docs in `/docs/API.md`)*

---

## 🌐 Deployment
- This project is deployable on cloud platforms like **AWS/Heroku**.
- Docker integration available in `/docker/` folder.

---

**Readygo Backend: Powering Hyperlocal Services in India! 🚀**
