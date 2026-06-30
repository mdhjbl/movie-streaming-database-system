CREATE DATABASE IF NOT EXISTS movie_db;
USE movie_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birth_year INT,
    role ENUM('admin','user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS actors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    nationality VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    director VARCHAR(255),
    genre VARCHAR(100),
    country VARCHAR(100),
    runtime INT,
    imdb_rating FLOAT,
    age_rating VARCHAR(20),
    language VARCHAR(50),
    dubbing_status VARCHAR(50),
    plot TEXT,
    release_year INT,
    is_animation BOOLEAN DEFAULT FALSE,
    is_anime BOOLEAN DEFAULT FALSE,
    poster VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS series (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    director VARCHAR(255),
    genre VARCHAR(100),
    country VARCHAR(100),
    imdb_rating FLOAT,
    age_rating VARCHAR(20),
    language VARCHAR(50),
    dubbing_status VARCHAR(50),
    plot TEXT,
    release_year INT,
    end_year INT,
    is_animation BOOLEAN DEFAULT FALSE,
    is_anime BOOLEAN DEFAULT FALSE,
    poster VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS seasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    series_id INT,
    season_number INT,
    episode_count INT,
    release_date DATE,
    FOREIGN KEY(series_id) REFERENCES series(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS episodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    season_id INT,
    episode_number INT,
    title VARCHAR(255),
    runtime INT,
    air_date DATE,
    plot TEXT,
    FOREIGN KEY(season_id) REFERENCES seasons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    film_id INT NULL,
    series_id INT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY(series_id) REFERENCES series(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    film_id INT NULL,
    series_id INT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY(series_id) REFERENCES series(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS watchlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    film_id INT NULL,
    series_id INT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY(series_id) REFERENCES series(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS film_actors (
    film_id INT,
    actor_id INT,
    role_name VARCHAR(255),
    PRIMARY KEY(film_id,actor_id),
    FOREIGN KEY(film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY(actor_id) REFERENCES actors(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS episode_actors (
    episode_id INT,
    actor_id INT,
    role_name VARCHAR(255),
    PRIMARY KEY(episode_id,actor_id),
    FOREIGN KEY(episode_id) REFERENCES episodes(id) ON DELETE CASCADE,
    FOREIGN KEY(actor_id) REFERENCES actors(id) ON DELETE CASCADE
);

-- Insert an admin user (password: admin123)
INSERT INTO users (username, email, password, birth_year, role) 
VALUES ('admin', 'admin@example.com', '$2b$10$ASfgmoWNnrCoyWyxbnqTveCRMSO06/XVtQWjaP9ylcM31ZStSnRTG', 1990, 'admin')
ON DUPLICATE KEY UPDATE username=username;
