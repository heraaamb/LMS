-- Athena Library Management System DDL Schema

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('student', 'admin')),
    student_id VARCHAR(64) UNIQUE,
    teacher_id VARCHAR(64) UNIQUE,
    department VARCHAR(255),
    academic_year VARCHAR(64),
    phone VARCHAR(64),
    avatar VARCHAR(512),
    joined_date DATE DEFAULT CURRENT_DATE,
    max_allowed_books INT DEFAULT 5,
    active_issues_count INT DEFAULT 0,
    status VARCHAR(32) DEFAULT 'active' CHECK (status IN ('active', 'suspended'))
);

CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(32) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS authors (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    biography TEXT,
    nationality VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS publishers (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    website VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(64) PRIMARY KEY,
    isbn VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    author_id VARCHAR(64) REFERENCES authors(id),
    publisher_id VARCHAR(64) REFERENCES publishers(id),
    category_id VARCHAR(64) REFERENCES categories(id),
    edition VARCHAR(64),
    publish_year INT,
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    borrowed_copies INT DEFAULT 0,
    reserved_copies INT DEFAULT 0,
    rack_number VARCHAR(64),
    shelf_number VARCHAR(64),
    description TEXT,
    cover_image VARCHAR(512),
    rating DECIMAL(3,2) DEFAULT 5.0,
    tags TEXT[],
    pages INT,
    language VARCHAR(64) DEFAULT 'English',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS issue_records (
    id VARCHAR(64) PRIMARY KEY,
    book_id VARCHAR(64) REFERENCES books(id),
    student_id VARCHAR(64) REFERENCES users(id),
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(32) DEFAULT 'issued' CHECK (status IN ('issued', 'overdue', 'returned')),
    issued_by VARCHAR(255),
    fine_amount DECIMAL(10,2) DEFAULT 0.00,
    renewed_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reservations (
    id VARCHAR(64) PRIMARY KEY,
    book_id VARCHAR(64) REFERENCES books(id),
    student_id VARCHAR(64) REFERENCES users(id),
    request_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(32) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'fulfilled', 'cancelled')),
    queue_position INT DEFAULT 1,
    expires_at DATE
);

CREATE TABLE IF NOT EXISTS fines (
    id VARCHAR(64) PRIMARY KEY,
    issue_id VARCHAR(64) REFERENCES issue_records(id),
    student_id VARCHAR(64) REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    reason VARCHAR(64) DEFAULT 'overdue' CHECK (reason IN ('overdue', 'damaged', 'lost')),
    status VARCHAR(32) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'waived')),
    due_date DATE NOT NULL,
    paid_date DATE
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actor VARCHAR(255) NOT NULL,
    actor_role VARCHAR(32) NOT NULL,
    action VARCHAR(128) NOT NULL,
    target VARCHAR(255),
    details TEXT
);
