-- Database schema for Buddiz
CREATE DATABASE IF NOT EXISTS buddiz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE buddiz;

-- Drop tables in dependency order (if they exist)
DROP TABLE IF EXISTS participate;
DROP TABLE IF EXISTS activity;
DROP TABLE IF EXISTS questions_answers;
DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS paiements;
DROP TABLE IF EXISTS favourite_users;
DROP TABLE IF EXISTS blocked_users;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    description VARCHAR(400),
    date_of_birth DATE,
    gender ENUM('man', 'woman', 'non-binary', 'other'),
    profile_photo_url VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    country VARCHAR(50),
    is_account_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tests taken by users (example table)
CREATE TABLE test (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    question VARCHAR(255) NOT NULL,
    selected_option VARCHAR(255) NOT NULL,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_in_initial_test BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_test_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Questions / Answers for tests and icebreakers
CREATE TABLE questions_answers (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    type ENUM('select', 'radio', 'checkbox', 'text') NOT NULL,
    category ENUM('hobbies', 'politics', 'lifestyle', 'fashion', 'social-life') NOT NULL,
    test_id INT,
    is_icebreaker BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_questions_test FOREIGN KEY (test_id) REFERENCES test(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activities
CREATE TABLE activity (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    date_beginning DATE NOT NULL,
    time_beginning TIME NOT NULL,
    date_ending DATE,
    time_ending TIME,
    max_participants INT,
    address VARCHAR(100),
    zip_code VARCHAR(20),
    city VARCHAR(50),
    country VARCHAR(50),
    icebreaker_question INT,
    organizer INT NOT NULL,
    CONSTRAINT fk_activity_icebreaker FOREIGN KEY (icebreaker_question) REFERENCES questions_answers(id) ON DELETE SET NULL,
    CONSTRAINT fk_activity_organizer FOREIGN KEY (organizer) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Participation in activities
CREATE TABLE participate (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_participate_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_participate_activity FOREIGN KEY (activity_id) REFERENCES activity(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Favourite users: many-to-many directed relation (owner -> favourite)
CREATE TABLE favourite_users (
    user_id INT NOT NULL,
    favourite_user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, favourite_user_id),
    INDEX idx_favourite_user (favourite_user_id),
    CONSTRAINT fk_fav_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_fav_favourite FOREIGN KEY (favourite_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blocked users: similar directed relation
CREATE TABLE blocked_users (
    user_id INT NOT NULL,
    blocked_user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, blocked_user_id),
    INDEX idx_blocked_user (blocked_user_id),
    CONSTRAINT fk_block_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_block_blocked FOREIGN KEY (blocked_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Payments
CREATE TABLE paiements (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    purchase_name VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    log TEXT,
    went_through BOOLEAN DEFAULT FALSE,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending','completed','failed') NOT NULL,
    CONSTRAINT fk_paiements_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional photos table (commented out)
/*
CREATE TABLE photos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_photos_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
*/