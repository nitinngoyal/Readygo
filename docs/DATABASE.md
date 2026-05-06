# 📊 Readygo Database Schema

## Overview
PostgreSQL database design for Readygo hyperlocal service marketplace with referral system, wallet management, and real-time tracking.

---

## 🗂️ Database Tables

### 1. **users** - Core User Table
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    phone VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role ENUM('customer', 'provider', 'admin') DEFAULT 'customer',
    profile_photo_url TEXT,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    referral_code VARCHAR(20) UNIQUE,
    referred_by_id INTEGER REFERENCES users(user_id),
    is_active BOOLEAN DEFAULT TRUE,
    kyc_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    kyc_document_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_phone ON users(phone);
CREATE INDEX idx_referral_code ON users(referral_code);
```

---

### 2. **providers_meta** - Service Provider Additional Info
```sql
CREATE TABLE providers_meta (
    provider_id INTEGER PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    business_name VARCHAR(100),
    years_of_experience INTEGER,
    total_services_completed INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    current_status ENUM('online', 'offline', 'busy') DEFAULT 'offline',
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8),
    last_location_update TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    background_check_status ENUM('pending', 'passed', 'failed') DEFAULT 'pending',
    aadhar_number VARCHAR(50),
    pan_number VARCHAR(50),
    bank_account_number VARCHAR(50),
    bank_ifsc_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_provider_status ON providers_meta(current_status);
CREATE INDEX idx_provider_rating ON providers_meta(average_rating);
```

---

### 3. **services** - Service Categories
```sql
CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_url TEXT,
    base_price DECIMAL(10, 2),
    estimated_duration_minutes INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO services (category_name, icon_url, base_price, estimated_duration_minutes) VALUES
('Electrician', '/icons/electrician.svg', 500, 60),
('Plumber', '/icons/plumber.svg', 400, 45),
('Carpenter', '/icons/carpenter.svg', 600, 90),
('Pandit Ji', '/icons/pandit.svg', 1000, 120),
('House Cleaning', '/icons/cleaning.svg', 300, 120),
('AC Repair', '/icons/ac.svg', 800, 90);
```

---

### 4. **provider_services** - Services offered by providers
```sql
CREATE TABLE provider_services (
    provider_service_id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES services(service_id),
    custom_price DECIMAL(10, 2),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider_id, service_id)
);

CREATE INDEX idx_provider_services ON provider_services(provider_id, is_available);
```

---

### 5. **bookings** - Service Bookings/Orders
```sql
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    provider_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    service_id INTEGER NOT NULL REFERENCES services(service_id),
    booking_status ENUM('requested', 'accepted', 'on_the_way', 'in_progress', 'completed', 'cancelled') DEFAULT 'requested',
    base_price DECIMAL(10, 2),
    final_price DECIMAL(10, 2),
    customer_notes TEXT,
    service_address TEXT,
    service_latitude DECIMAL(10, 8),
    service_longitude DECIMAL(11, 8),
    whatsapp_chat_id VARCHAR(100),
    estimated_arrival_time TIMESTAMP,
    actual_arrival_time TIMESTAMP,
    completion_time TIMESTAMP,
    invoice_url TEXT,
    customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5),
    customer_review TEXT,
    provider_rating INTEGER CHECK (provider_rating >= 1 AND provider_rating <= 5),
    provider_review TEXT,
    payment_method ENUM('cash', 'upi', 'wallet', 'credit_card') DEFAULT 'cash',
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_booking_customer ON bookings(customer_id);
CREATE INDEX idx_booking_provider ON bookings(provider_id);
CREATE INDEX idx_booking_status ON bookings(booking_status);
CREATE INDEX idx_booking_created ON bookings(created_at DESC);
```

---

### 6. **location_tracking** - Real-time location updates
```sql
CREATE TABLE location_tracking (
    tracking_id SERIAL PRIMARY KEY,
    provider_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    booking_id INTEGER REFERENCES bookings(booking_id) ON DELETE SET NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy_meters DECIMAL(10, 2),
    speed_kmh DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_location_provider ON location_tracking(provider_id, created_at DESC);
CREATE INDEX idx_location_booking ON location_tracking(booking_id);
```

---

### 7. **referrals** - Referral Tracking
```sql
CREATE TABLE referrals (
    referral_id SERIAL PRIMARY KEY,
    referrer_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    referee_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    service_category VARCHAR(100),
    visit_count INTEGER DEFAULT 0 CHECK (visit_count >= 0 AND visit_count <= 3),
    is_reward_paid BOOLEAN DEFAULT FALSE,
    reward_amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(referrer_id, referee_id)
);

CREATE INDEX idx_referral_referrer ON referrals(referrer_id);
CREATE INDEX idx_referral_referee ON referrals(referee_id);
```

---

### 8. **wallets** - User Wallet Management
```sql
CREATE TABLE wallets (
    wallet_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    active_balance DECIMAL(15, 2) DEFAULT 0.00,
    pending_balance DECIMAL(15, 2) DEFAULT 0.00,
    total_earned DECIMAL(15, 2) DEFAULT 0.00,
    total_withdrawn DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallet_user ON wallets(user_id);
```

---

### 9. **transactions** - Wallet Transaction History
```sql
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    wallet_id INTEGER NOT NULL REFERENCES wallets(wallet_id) ON DELETE CASCADE,
    transaction_type ENUM('credit', 'debit', 'referral_reward', 'service_earning', 'withdrawal', 'refund') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    balance_before DECIMAL(15, 2),
    balance_after DECIMAL(15, 2),
    related_booking_id INTEGER REFERENCES bookings(booking_id) ON DELETE SET NULL,
    related_referral_id INTEGER REFERENCES referrals(referral_id) ON DELETE SET NULL,
    description TEXT,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transaction_user ON transactions(user_id);
CREATE INDEX idx_transaction_type ON transactions(transaction_type);
CREATE INDEX idx_transaction_created ON transactions(created_at DESC);
```

---

### 10. **whatsapp_logs** - WhatsApp Communication Logs
```sql
CREATE TABLE whatsapp_logs (
    log_id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
    sender_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    message_text TEXT,
    message_type ENUM('text', 'image', 'price_update', 'status_update') DEFAULT 'text',
    whatsapp_message_id VARCHAR(100),
    is_automated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_whatsapp_booking ON whatsapp_logs(booking_id);
CREATE INDEX idx_whatsapp_sender ON whatsapp_logs(sender_id);
```

---

### 11. **ratings_reviews** - Separate Ratings & Reviews Table
```sql
CREATE TABLE ratings_reviews (
    review_id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES bookings(booking_id) ON DELETE CASCADE,
    rater_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    ratee_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    rating_score INTEGER NOT NULL CHECK (rating_score >= 1 AND rating_score <= 5),
    review_text TEXT,
    review_category ENUM('quality', 'behavior', 'punctuality', 'cleanliness') DEFAULT 'quality',
    is_verified BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ratings_ratee ON ratings_reviews(ratee_id);
CREATE INDEX idx_ratings_booking ON ratings_reviews(booking_id);
```

---

### 12. **admin_logs** - Admin Actions Audit Trail
```sql
CREATE TABLE admin_logs (
    log_id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    action_type VARCHAR(100) NOT NULL,
    target_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    old_value TEXT,
    new_value TEXT,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_logs_admin ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_action ON admin_logs(action_type);
CREATE INDEX idx_admin_logs_created ON admin_logs(created_at DESC);
```

---

## 🔗 Relationships Overview

```
users
  ├─── providers_meta (1:1)
  ├─── provider_services (1:N)
  ├─── bookings (customer 1:N, provider 1:N)
  ├─── location_tracking (1:N)
  ├─── referrals (referrer 1:N, referee 1:N)
  ├─── wallets (1:1)
  ├─── transactions (1:N)
  ├─── whatsapp_logs (sender 1:N, receiver 1:N)
  ├─── ratings_reviews (rater 1:N, ratee 1:N)
  └─── admin_logs (1:N)

services
  └─── provider_services (1:N)
  └─── bookings (1:N)

bookings
  ├─── location_tracking (1:N)
  ├─── whatsapp_logs (1:N)
  └─── ratings_reviews (1:N)

wallets
  └─── transactions (1:N)

referrals
  └─── transactions (1:N)
```

---

## 📈 Key Indexes for Performance

All indexes have been created above, focusing on:
- ✅ User lookups (phone, referral_code)
- ✅ Booking queries (customer, provider, status, date)
- ✅ Provider status (online/offline)
- ✅ Location tracking (recent updates)
- ✅ Transaction history (user, type, date)
- ✅ Admin audit trail

---

## 🔐 Data Integrity Rules

1. **Referral Activation**: `visit_count` must reach 3 before `is_reward_paid = TRUE`
2. **Booking Completion**: `booking_status` must follow: requested → accepted → on_the_way → in_progress → completed
3. **Location Tracking**: Only records during active bookings with `booking_status` = 'on_the_way' or 'in_progress'
4. **Wallet Balance**: `active_balance` cannot go below 0
5. **Transaction Verification**: Each transaction must have `related_booking_id` OR `related_referral_id`

---

## 🚀 Next Steps

1. Run migrations in `/backend/migrations/`
2. Create seed data for testing
3. Set up database backups
4. Configure connection pooling in backend

---

**Database design complete! Ready for backend implementation.** ✅
