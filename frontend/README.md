# 🖥️ Readygo Frontend

This folder contains the frontend code for Readygo, built using **React.js** and optimized for a seamless user experience. It includes the customer portal (web-first, PWA-ready) and reusable components for rapid development.

---

## 🛠️ Key Features
1. **Modern Design**: Dynamic UI/UX for easy navigation.
2. **PWA Ready**: Installable Progressive Web App.
3. **Reusable Components**: Clean and modular component structure.
4. **Optimized Routing**: Next.js-inspired routing with lazy loading.
5. **API Integration**: Centralized API handling for backend resources.

---

## 📁 Project Structure

```
frontend/
├── src/                   # Source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Main pages (routes)
│   ├── context/          # Context API state management
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API Utility functions
│   ├── utils/            # Helper functions
│   ├── styles/           # Shared styles and themes
│   ├── App.js            # Main App component
│   └── index.js          # React entry point
├── public/               # Static assets
├── .env.example          # Environment variable template
├── package.json          # Dependencies and scripts
└── README.md             # How to set up the frontend
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16.x+
- NPM or Yarn

---

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Setup Environment Variables
- Duplicate the `.env.example` file:
```bash
cp .env.example .env
```
- Add the backend API URL and any other environment-specific values.

### 3. Run Development Server
```bash
npm start
```
The app will be live at `http://localhost:3000`.

---

## 📊 Pages Overview

### Customer Side
1. **Home Page** - Discover service categories and providers.
2. **Service Listings** - Explore services with filters.
3. **Booking Flow** - OTP login → Select service → Accept payment.
4. **Order History** - Track bookings, invoices, and feedback.

### Admin Side (Future Scope)
1. **Dashboard** - Monitor service statistics.
2. **KYC Approvals** - Profile verification workflow.
3. **Wallet Management** - Track payouts and referrals.

### Reusable Components
| Component      | Description                    |
|----------------|--------------------------------|
| `NavBar`       | Header navigation bar UI       |
| `SearchBar`    | Search box for listings        |
| `ServiceCard`  | Service detail/CTA overview UI |
| `Footer`       | Bottom navigation/footer links |

---

## 💡 Available Scripts

| Script             | Description               |
|--------------------|---------------------------|
| `npm start`        | Runs the app locally      |
| `npm run build`    | Builds for production     |
| `npm test`         | Runs tests (upcoming)     |

---

**Readygo Frontend: Build seamless UI/UX for hyperlocal services! 🚀**