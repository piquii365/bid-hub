# BidHub - Real-Time Property Bidding Platform

A modern, full-featured property auction platform built with React, TypeScript, and Tailwind CSS. BidHub enables users to participate in live auctions, sealed bid auctions, and fixed-price sales for various property types including real estate, vehicles, electronics, and collectibles.

## 🚀 Features

### Core Functionality
- **Multi-Type Auctions**: Live auctions, sealed bid auctions, and fixed-price sales
- **Real-Time Bidding**: Live updates with WebSocket-like simulation
- **Property Categories**: Residential, commercial, land, cars, electronics, vintage items
- **User Roles**: Bidders and sellers with role-specific features
- **Advanced Search & Filtering**: Comprehensive property discovery tools
- **Responsive Design**: Optimized for all device sizes

### User Experience
- **Dark/Light Theme**: System-wide theme switching
- **Notifications**: Real-time bid updates and auction alerts
- **Dashboard**: Comprehensive user activity tracking
- **Profile Management**: User profiles with statistics and achievements
- **Watchlist**: Save and track favorite properties

### Security & Authentication
- **Secure Authentication**: Email/password and Google OAuth
- **Protected Routes**: Role-based access control
- **Form Validation**: Comprehensive input validation
- **Error Handling**: Graceful error management

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bidhub.git
   cd bidhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🗄️ Database Structure (MySQL)

### Core Tables

```sql
-- Users table with role-based access
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    role ENUM('bidder', 'seller', 'admin') DEFAULT 'bidder',
    phone VARCHAR(20),
    location VARCHAR(255),
    bio TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'suspended', 'deleted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- Properties table for all auction items
CREATE TABLE properties (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    seller_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('residential', 'commercial', 'land', 'car', 'electronics', 'vintage') NOT NULL,
    location VARCHAR(255) NOT NULL,
    starting_price DECIMAL(15,2) NOT NULL,
    current_price DECIMAL(15,2) NOT NULL,
    reserve_price DECIMAL(15,2),
    bid_type ENUM('live', 'sealed', 'fixed') NOT NULL,
    status ENUM('draft', 'active', 'sold', 'expired', 'cancelled') DEFAULT 'draft',
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    total_bids INT DEFAULT 0,
    view_count INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_seller (seller_id),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_bid_type (bid_type),
    INDEX idx_end_date (end_date),
    INDEX idx_featured (featured),
    FULLTEXT idx_search (title, description, location)
);

-- Property images
CREATE TABLE property_images (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    property_id VARCHAR(36) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_property (property_id),
    INDEX idx_order (display_order)
);

-- Property features and specifications
CREATE TABLE property_features (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    property_id VARCHAR(36) NOT NULL,
    feature_name VARCHAR(255) NOT NULL,
    feature_value VARCHAR(500),
    feature_type ENUM('feature', 'specification') DEFAULT 'feature',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    INDEX idx_property (property_id),
    INDEX idx_type (feature_type)
);

-- Bids table for all auction bids
CREATE TABLE bids (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    property_id VARCHAR(36) NOT NULL,
    bidder_id VARCHAR(36) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    bid_type ENUM('live', 'sealed', 'fixed') NOT NULL,
    status ENUM('active', 'winning', 'outbid', 'won', 'lost') DEFAULT 'active',
    is_auto_bid BOOLEAN DEFAULT FALSE,
    max_auto_bid DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (bidder_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_property (property_id),
    INDEX idx_bidder (bidder_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- Notifications system
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    type ENUM('bid_placed', 'outbid', 'won', 'sold', 'ending_soon', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    property_id VARCHAR(36),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
);

-- User watchlist
CREATE TABLE watchlist (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    property_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    UNIQUE KEY unique_watchlist (user_id, property_id),
    INDEX idx_user (user_id)
);

-- Bidding rooms for live auctions
CREATE TABLE bidding_rooms (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    property_id VARCHAR(36) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    participant_count INT DEFAULT 0,
    current_highest_bid DECIMAL(15,2),
    time_remaining INT, -- seconds
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    UNIQUE KEY unique_room (property_id),
    INDEX idx_active (is_active)
);

-- User sessions for authentication
CREATE TABLE user_sessions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_token (session_token),
    INDEX idx_expires (expires_at)
);
```

### Stored Procedures

```sql
-- Place a bid with proper validation and updates
DELIMITER //
CREATE PROCEDURE PlaceBid(
    IN p_property_id VARCHAR(36),
    IN p_bidder_id VARCHAR(36),
    IN p_amount DECIMAL(15,2),
    IN p_bid_type ENUM('live', 'sealed', 'fixed')
)
BEGIN
    DECLARE v_current_price DECIMAL(15,2);
    DECLARE v_property_status VARCHAR(20);
    DECLARE v_end_date TIMESTAMP;
    DECLARE v_bid_id VARCHAR(36);
    DECLARE v_error_msg VARCHAR(255);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        GET DIAGNOSTICS CONDITION 1
            v_error_msg = MESSAGE_TEXT;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END;
    
    START TRANSACTION;
    
    -- Validate property exists and is active
    SELECT current_price, status, end_date 
    INTO v_current_price, v_property_status, v_end_date
    FROM properties 
    WHERE id = p_property_id FOR UPDATE;
    
    IF v_property_status IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Property not found';
    END IF;
    
    IF v_property_status != 'active' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Property is not available for bidding';
    END IF;
    
    IF v_end_date < NOW() THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Auction has ended';
    END IF;
    
    -- Validate bid amount
    IF p_bid_type != 'fixed' AND p_amount <= v_current_price THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Bid amount must be higher than current price';
    END IF;
    
    -- Generate bid ID
    SET v_bid_id = UUID();
    
    -- Insert new bid
    INSERT INTO bids (id, property_id, bidder_id, amount, bid_type, status, created_at)
    VALUES (v_bid_id, p_property_id, p_bidder_id, p_amount, p_bid_type, 'winning', NOW());
    
    -- Update previous bids to outbid status (for live auctions)
    IF p_bid_type = 'live' THEN
        UPDATE bids 
        SET status = 'outbid', updated_at = NOW()
        WHERE property_id = p_property_id 
        AND id != v_bid_id 
        AND status = 'winning';
        
        -- Update property current price
        UPDATE properties 
        SET current_price = p_amount, 
            total_bids = total_bids + 1,
            updated_at = NOW()
        WHERE id = p_property_id;
    ELSE
        -- For sealed bids, just increment bid count
        UPDATE properties 
        SET total_bids = total_bids + 1,
            updated_at = NOW()
        WHERE id = p_property_id;
    END IF;
    
    -- Create notification for previous highest bidder (live auctions only)
    IF p_bid_type = 'live' THEN
        INSERT INTO notifications (id, user_id, type, title, message, property_id, created_at)
        SELECT 
            UUID(),
            b.bidder_id,
            'outbid',
            'You have been outbid!',
            CONCAT('Someone placed a higher bid on ', p.title),
            p_property_id,
            NOW()
        FROM bids b
        JOIN properties p ON p.id = p_property_id
        WHERE b.property_id = p_property_id 
        AND b.status = 'outbid' 
        AND b.updated_at = NOW()
        AND b.bidder_id != p_bidder_id;
    END IF;
    
    -- Create notification for successful bid
    INSERT INTO notifications (id, user_id, type, title, message, property_id, created_at)
    SELECT 
        UUID(),
        p_bidder_id,
        'bid_placed',
        'Bid placed successfully',
        CONCAT('Your bid of $', FORMAT(p_amount, 2), ' has been placed on ', p.title),
        p_property_id,
        NOW()
    FROM properties p
    WHERE p.id = p_property_id;
    
    COMMIT;
    
    -- Return the bid ID
    SELECT v_bid_id as bid_id;
END //
DELIMITER ;

-- End auction and determine winner
DELIMITER //
CREATE PROCEDURE EndAuction(
    IN p_property_id VARCHAR(36)
)
BEGIN
    DECLARE v_winning_bid_id VARCHAR(36);
    DECLARE v_winning_bidder_id VARCHAR(36);
    DECLARE v_winning_amount DECIMAL(15,2);
    DECLARE v_bid_type VARCHAR(20);
    DECLARE v_error_msg VARCHAR(255);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        GET DIAGNOSTICS CONDITION 1
            v_error_msg = MESSAGE_TEXT;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_msg;
    END;
    
    START TRANSACTION;
    
    -- Get auction type
    SELECT bid_type INTO v_bid_type
    FROM properties 
    WHERE id = p_property_id;
    
    -- Determine winner based on auction type
    IF v_bid_type = 'sealed' THEN
        -- For sealed bids, highest bid wins
        SELECT id, bidder_id, amount
        INTO v_winning_bid_id, v_winning_bidder_id, v_winning_amount
        FROM bids
        WHERE property_id = p_property_id
        ORDER BY amount DESC, created_at ASC
        LIMIT 1;
    ELSE
        -- For live auctions, current winning bid
        SELECT id, bidder_id, amount
        INTO v_winning_bid_id, v_winning_bidder_id, v_winning_amount
        FROM bids
        WHERE property_id = p_property_id AND status = 'winning'
        LIMIT 1;
    END IF;
    
    IF v_winning_bid_id IS NOT NULL THEN
        -- Update winning bid
        UPDATE bids 
        SET status = 'won', updated_at = NOW()
        WHERE id = v_winning_bid_id;
        
        -- Update losing bids
        UPDATE bids 
        SET status = 'lost', updated_at = NOW()
        WHERE property_id = p_property_id AND id != v_winning_bid_id;
        
        -- Update property status
        UPDATE properties 
        SET status = 'sold', 
            current_price = v_winning_amount,
            updated_at = NOW()
        WHERE id = p_property_id;
        
        -- Notify winner
        INSERT INTO notifications (id, user_id, type, title, message, property_id, created_at)
        SELECT 
            UUID(),
            v_winning_bidder_id,
            'won',
            'Congratulations! You won the auction',
            CONCAT('You won the auction for ', p.title, ' with a bid of $', FORMAT(v_winning_amount, 2)),
            p_property_id,
            NOW()
        FROM properties p
        WHERE p.id = p_property_id;
        
        -- Notify seller
        INSERT INTO notifications (id, user_id, type, title, message, property_id, created_at)
        SELECT 
            UUID(),
            p.seller_id,
            'sold',
            'Your property has been sold!',
            CONCAT('Your property ', p.title, ' has been sold for $', FORMAT(v_winning_amount, 2)),
            p_property_id,
            NOW()
        FROM properties p
        WHERE p.id = p_property_id;
    ELSE
        -- No bids, mark as expired
        UPDATE properties 
        SET status = 'expired', updated_at = NOW()
        WHERE id = p_property_id;
    END IF;
    
    COMMIT;
END //
DELIMITER ;

-- Get user dashboard statistics
DELIMITER //
CREATE PROCEDURE GetUserStats(
    IN p_user_id VARCHAR(36)
)
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM properties WHERE seller_id = p_user_id) as properties_listed,
        (SELECT COUNT(*) FROM properties WHERE seller_id = p_user_id AND status = 'sold') as properties_sold,
        (SELECT COUNT(*) FROM bids WHERE bidder_id = p_user_id) as total_bids,
        (SELECT COUNT(*) FROM bids WHERE bidder_id = p_user_id AND status = 'won') as auctions_won,
        (SELECT COALESCE(SUM(amount), 0) FROM bids WHERE bidder_id = p_user_id AND status = 'won') as total_spent,
        (SELECT COALESCE(SUM(current_price), 0) FROM properties WHERE seller_id = p_user_id AND status = 'sold') as total_earned,
        (SELECT COUNT(*) FROM watchlist WHERE user_id = p_user_id) as watchlist_count,
        (SELECT COUNT(*) FROM notifications WHERE user_id = p_user_id AND is_read = FALSE) as unread_notifications;
END //
DELIMITER ;

-- Search properties with filters
DELIMITER //
CREATE PROCEDURE SearchProperties(
    IN p_search_term VARCHAR(255),
    IN p_property_type VARCHAR(50),
    IN p_bid_type VARCHAR(20),
    IN p_min_price DECIMAL(15,2),
    IN p_max_price DECIMAL(15,2),
    IN p_location VARCHAR(255),
    IN p_status VARCHAR(20),
    IN p_sort_by VARCHAR(50),
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    SET @sql = 'SELECT p.*, u.name as seller_name, 
                       (SELECT image_url FROM property_images pi WHERE pi.property_id = p.id AND pi.is_primary = TRUE LIMIT 1) as primary_image
                FROM properties p 
                JOIN users u ON p.seller_id = u.id 
                WHERE 1=1';
    
    IF p_search_term IS NOT NULL AND p_search_term != '' THEN
        SET @sql = CONCAT(@sql, ' AND MATCH(p.title, p.description, p.location) AGAINST(', QUOTE(p_search_term), ' IN NATURAL LANGUAGE MODE)');
    END IF;
    
    IF p_property_type IS NOT NULL AND p_property_type != '' THEN
        SET @sql = CONCAT(@sql, ' AND p.type = ', QUOTE(p_property_type));
    END IF;
    
    IF p_bid_type IS NOT NULL AND p_bid_type != '' THEN
        SET @sql = CONCAT(@sql, ' AND p.bid_type = ', QUOTE(p_bid_type));
    END IF;
    
    IF p_min_price IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND p.current_price >= ', p_min_price);
    END IF;
    
    IF p_max_price IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND p.current_price <= ', p_max_price);
    END IF;
    
    IF p_location IS NOT NULL AND p_location != '' THEN
        SET @sql = CONCAT(@sql, ' AND p.location LIKE ', QUOTE(CONCAT('%', p_location, '%')));
    END IF;
    
    IF p_status IS NOT NULL AND p_status != '' THEN
        SET @sql = CONCAT(@sql, ' AND p.status = ', QUOTE(p_status));
    END IF;
    
    -- Add sorting
    CASE p_sort_by
        WHEN 'price_asc' THEN SET @sql = CONCAT(@sql, ' ORDER BY p.current_price ASC');
        WHEN 'price_desc' THEN SET @sql = CONCAT(@sql, ' ORDER BY p.current_price DESC');
        WHEN 'ending_soon' THEN SET @sql = CONCAT(@sql, ' ORDER BY p.end_date ASC');
        WHEN 'most_bids' THEN SET @sql = CONCAT(@sql, ' ORDER BY p.total_bids DESC');
        ELSE SET @sql = CONCAT(@sql, ' ORDER BY p.created_at DESC');
    END CASE;
    
    -- Add pagination
    SET @sql = CONCAT(@sql, ' LIMIT ', p_limit, ' OFFSET ', p_offset);
    
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END //
DELIMITER ;
```

### Database Triggers

```sql
-- Update property view count
DELIMITER //
CREATE TRIGGER update_view_count
AFTER INSERT ON property_views
FOR EACH ROW
BEGIN
    UPDATE properties 
    SET view_count = view_count + 1 
    WHERE id = NEW.property_id;
END //
DELIMITER ;

-- Auto-expire auctions
DELIMITER //
CREATE EVENT auto_expire_auctions
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    UPDATE properties 
    SET status = 'expired', updated_at = NOW()
    WHERE status = 'active' 
    AND end_date < NOW()
    AND bid_type != 'fixed';
    
    -- End live auctions that have expired
    CALL EndAuction(
        (SELECT id FROM properties WHERE status = 'expired' AND updated_at = NOW() LIMIT 1)
    );
END //
DELIMITER ;
```

## 🚀 Deployment

### Environment Variables
Create a `.env` file with the following variables:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bidhub
DB_USER=your_username
DB_PASSWORD=your_password

# Authentication
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Redis (for real-time features)
REDIS_URL=redis://localhost:6379
```

### Production Build
```bash
npm run build
npm run preview
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Property Endpoints
- `GET /api/properties` - List properties with filters
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Bidding Endpoints
- `POST /api/bids` - Place a bid
- `GET /api/bids/property/:id` - Get property bid history
- `GET /api/bids/user/:id` - Get user bid history

### Real-time Events
- `bid_placed` - New bid placed
- `auction_ending` - Auction ending soon
- `auction_ended` - Auction completed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- All contributors and testers

## 📞 Support

For support, email support@bidhub.com or join our Discord community.

---

Built with ❤️ by the BidHub team