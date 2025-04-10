DROP TABLE Users CASCADE;
DROP TABLE Address CASCADE;
DROP TABLE Events CASCADE;
DROP TABLE Messages CASCADE;
DROP TABLE EventParticipants CASCADE;
DROP TABLE EventHosts CASCADE;


-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Address Table (for French addresses using BAN API standards)
CREATE TABLE IF NOT EXISTS Address (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,               -- Formatted complete address
    house_number VARCHAR(10),                   -- Numéro de voie
    street_name VARCHAR(255) NOT NULL,          -- Nom de la voie
    postcode VARCHAR(10) NOT NULL,              -- Code postal
    city VARCHAR(100) NOT NULL,                 -- Commune
    citycode VARCHAR(10),                       -- Code INSEE de la commune
    context VARCHAR(100),                       -- Département/Région
    longitude DECIMAL(9,6) NOT NULL,            -- Coordonnée géographique
    latitude DECIMAL(8,6) NOT NULL,             -- Coordonnée géographique
    additional_details TEXT,                    -- Complément d'adresse
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table (updated with location_id)
CREATE TABLE IF NOT EXISTS Events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    location_id INT,                            -- Reference to Address table
    event_date TIMESTAMP NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(id),
    FOREIGN KEY (location_id) REFERENCES Address(id)
);

-- Messages Table
CREATE TABLE IF NOT EXISTS Messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    sender_id INT,
    receiver_id INT,
    event_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(id),
    FOREIGN KEY (event_id) REFERENCES Events(id)
);

-- EventParticipants Table
CREATE TABLE IF NOT EXISTS EventParticipants (
    event_id INT,
    user_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Events(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- EventHosts Table
CREATE TABLE IF NOT EXISTS EventHosts (
    event_id INT,
    user_id INT,
    hosted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (event_id, user_id),
    FOREIGN KEY (event_id) REFERENCES Events(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);