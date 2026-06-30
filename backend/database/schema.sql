CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birth_year INT,
    role ENUM('admin','user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE actors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    nationality VARCHAR(100)
);
CREATE TABLE films (
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
CREATE TABLE series (
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
CREATE TABLE seasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    series_id INT,
    season_number INT,
    episode_count INT,
    release_date DATE,
    UNIQUE KEY unique_season_per_series (series_id, season_number),
    FOREIGN KEY(series_id) REFERENCES series(id) ON DELETE CASCADE
);
CREATE TABLE episodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    season_id INT,
    episode_number INT,
    title VARCHAR(255),
    runtime INT,
    air_date DATE,
    plot TEXT,
    UNIQUE KEY unique_episode_per_season (season_id, episode_number),
    FOREIGN KEY(season_id) REFERENCES seasons(id) ON DELETE CASCADE
);
CREATE TABLE comments (
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
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    film_id INT NULL,
    series_id INT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY(series_id) REFERENCES series(id) ON DELETE CASCADE
);
CREATE TABLE watchlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    film_id INT NULL,
    series_id INT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY(series_id) REFERENCES series(id) ON DELETE CASCADE
);
CREATE TABLE film_actors (
    film_id INT,
    actor_id INT,
    role_name VARCHAR(255),
    PRIMARY KEY(film_id, actor_id),
    FOREIGN KEY(film_id) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY(actor_id) REFERENCES actors(id) ON DELETE CASCADE
);
CREATE TABLE series_actors (
    series_id INT,
    actor_id INT,
    role_name VARCHAR(255),
    PRIMARY KEY(series_id, actor_id),
    FOREIGN KEY(series_id) REFERENCES series(id) ON DELETE CASCADE,
    FOREIGN KEY(actor_id) REFERENCES actors(id) ON DELETE CASCADE
);
CREATE TABLE episode_actors (
    episode_id INT,
    actor_id INT,
    role_name VARCHAR(255),
    PRIMARY KEY(episode_id, actor_id),
    FOREIGN KEY(episode_id) REFERENCES episodes(id) ON DELETE CASCADE,
    FOREIGN KEY(actor_id) REFERENCES actors(id) ON DELETE CASCADE
);
