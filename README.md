# 🚀 Readygo - Hyperlocal Service Marketplace

A **WhatsApp-integrated, location-based service marketplace** for India. Connect customers with local service providers (Plumbers, Electricians, Pandit Ji, Carpenters, etc.) with real-time tracking and dynamic pricing.

---

## 📋 Project Overview

**Readygo** is a hybrid marketplace that combines:
- 🏪 **Urban Company's** quality standards
- 🚗 **InDriver's** negotiation flexibility
- 💬 **WhatsApp** as primary communication channel
- 📍 **Live location tracking** for transparency
- 💰 **Referral rewards system** (₹100 per activation)

---

## 🎯 Core Features

### For Customers
- ✅ Category-wise service discovery
- ✅ Live professional tracking (Google Maps)
- ✅ Book via WhatsApp (no app download needed)
- ✅ Dynamic pricing negotiation
- ✅ Service history & invoices
- ✅ Rating & review system

### For Service Providers
- ✅ Lead dashboard with notifications
- ✅ Online/Offline status toggle
- ✅ Wallet & earnings management
- ✅ Referral rewards system
- ✅ KYC verification
- ✅ Service completion tracking

### For Admin
- ✅ Live professional tracking on map
- ✅ KYC & profile management
- ✅ Wallet & referral audit
- ✅ WhatsApp log monitoring
- ✅ Payout management
- ✅ Analytics & reports

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React.js / Next.js |
| **Backend** | Node.js (Express.js) |
| **Database** | PostgreSQL |
| **Real-time** | Socket.io |
| **Maps** | Google Maps API |
| **Communication** | WhatsApp Business API (via Interakt/AiSensy) |
| **Authentication** | Firebase Auth (OTP) |
| **Payments** | Razorpay |
| **Hosting** | AWS / DigitalOcean |

---

## 📁 Project Structure

```
readygo/
├── backend/                    # Node.js API
│   ├── src/
│   │   ├── config/            # Database & API configs
│   │   ├── controllers/        # Business logic
│   │   ├── models/            # Database models
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Auth & validation
│   │   ├── services/          # WhatsApp, Maps, Payments
│   │   ├── utils/             # Helper functions
│   │   └── app.js             # Express app setup
│   ├── migrations/            # Database migrations
│   ├── seeds/                 # Sample data
│   ├── .env.example           # Environment template
│   ├── package.json           # Dependencies
│   └── README.md              # Backend setup guide
│
├── frontend/                   # React.js Website
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Website pages
│   │   ├── context/          # State management
│   │   ├── services/         # API calls
│   │   ├── utils/            # Helper functions
│   │   └── App.js            # Main app
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies
│   └── README.md             # Frontend setup guide
│
├── admin-dashboard/          # React.js Admin Panel
│   ├── src/
│   │   ├── components/       # Dashboard components
│   │   ├── pages/           # Admin pages
│   │   ├── charts/          # Analytics
│   │   └── utils/           # Helpers
│   ├── package.json         # Dependencies
│   └── README.md            # Admin setup guide
│
├── database/                 # Database schema & migrations
│   ├── schema.sql           # SQL table definitions
│   ├── migrations/          # Incremental schema changes
│   └── seed-data.sql        # Sample data
│
├── docs/                    # Documentation
│   ├── API.md              # API endpoints
│   ├── DATABASE.md         # Schema details
│   ├── WHATSAPP.md         # WhatsApp integration guide
│   ├── REFERRAL.md         # Referral system logic
│   ├── DEPLOYMENT.md       # Deployment instructions
│   └── ROADMAP.md          # Development timeline
│
├── docker/                 # Docker configuration
│   ├── Dockerfile          # Container setup
│   └── docker-compose.yml  # Multi-container setup
│
└── .gitignore             # Git ignore rules

```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- PostgreSQL v12+
- Git
- GitHub account

### Setup Instructions

#### 1. Clone Repository
```bash
git clone https://github.com/nitinngoyal/readygo.git
cd readygo
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your credentials
npm run migrate
npm start
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
npm start
```

#### 4. Admin Panel Setup
```bash
cd ../admin-dashboard
npm install
cp .env.example .env
npm start
```

---

## 📊 Development Timeline (MVP - 10 Weeks)

| Week | Phase | Deliverables |
|------|-------|--------------|
| 1 | Discovery | SRS Document, Wireframes |
| 2-3 | Backend | Database, APIs, Auth |
| 4-5 | Integration | WhatsApp API, Google Maps, Live tracking |
| 6-7 | Frontend | Website UI, Admin Dashboard |
| 8 | Referral System | Wallet, Referral logic |
| 9 | Testing | QA, Bug fixes, Beta testing |
| 10 | Launch | Deployment, Go-live |

---

## 💰 Revenue Model

1. **Commission per booking**: 10-15% on final service price
2. **Premium subscription** (Optional): ₹499/month for professionals for featured listing
3. **Sponsored categories**: Featured top position for specific services
4. **Payment processing fee**: Razorpay charges (~2%)

---

## 🎁 Referral System Logic

### How it works:
1. **Sign-up**: Professional A refers Professional B → ₹100 locked
2. **Activation**: Professional B completes 3 successful bookings → ₹100 credited to A
3. **Withdrawal**: A can withdraw earnings to bank account

### Database Tables:
- `users` - User & provider data
- `referrals` - Referral tracking
- `wallets` - Wallet balances
- `transactions` - Payment history

---

## 🔐 Security & Compliance

- ✅ KYC verification for all professionals
- ✅ Background checks
- ✅ GPS location verification for fraud detection
- ✅ Encrypted WhatsApp communication logs
- ✅ HTTPS/SSL for all communications
- ✅ Data privacy compliance (India-specific regulations)

---

## 📞 API Endpoints (Overview)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login (OTP) |
| GET | `/api/services` | List all services |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/:id` | Get booking details |
| GET | `/api/professionals/location` | Get professional location |
| POST | `/api/wallet/withdraw` | Withdraw earnings |
| GET | `/api/referrals` | Get referral status |

*(Full API docs in `/docs/API.md`)*

---

## 🌍 Market Strategy (India-Focused)

- **Regional languages**: Hindi & English support
- **WhatsApp-first**: Book without downloading app
- **Trust factors**: Profile photos, ratings, background checks
- **Negotiation culture**: Dynamic pricing via WhatsApp
- **Offline payment**: Cash on delivery supported

---

## 📝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Create a Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Team

- **Founder/PM**: Nitin Ngoyal (@nitinngoyal)
- **Architecture**: [Team to be filled]
- **Development**: [Team to be filled]

---

## 📧 Contact & Support

For queries or suggestions:
- Email: contact@readygo.in
- WhatsApp: +91-XXXXXXXXXX
- GitHub Issues: [Create an issue](https://github.com/nitinngoyal/readygo/issues)

---

## 🎯 Next Steps

1. ✅ Review this README
2. ⏳ Check `/docs/DATABASE.md` for schema details
3. ⏳ Review `/docs/ROADMAP.md` for detailed timeline
4. ⏳ Start backend setup from `/backend/README.md`

---

**Happy coding! 🚀 Let's build Readygo together!**
