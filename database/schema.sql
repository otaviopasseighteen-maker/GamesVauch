CREATE DATABASE IF NOT EXISTS gamesvauch
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gamesvauch;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(80) NOT NULL,
  avatar_url VARCHAR(500) NULL,
  bio VARCHAR(500) NULL,
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE games (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT NULL,
  cover_url VARCHAR(500) NULL,
  release_date DATE NULL,
  developer VARCHAR(120) NULL,
  publisher VARCHAR(120) NULL,
  genre VARCHAR(80) NULL,
  platform VARCHAR(80) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_games_title (title),
  INDEX idx_games_genre (genre),
  INDEX idx_games_platform (platform)
) ENGINE=InnoDB;

CREATE TABLE user_games (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  game_id INT UNSIGNED NOT NULL,
  status ENUM('backlog', 'playing', 'completed', 'dropped') NOT NULL DEFAULT 'backlog',
  hours_played DECIMAL(8,2) NOT NULL DEFAULT 0,
  rating DECIMAL(3,1) NULL,
  notes TEXT NULL,
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  started_at DATE NULL,
  completed_at DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT uq_user_game UNIQUE (user_id, game_id),
  CONSTRAINT chk_user_game_rating CHECK (rating IS NULL OR (rating >= 0 AND rating <= 10)),
  CONSTRAINT chk_user_game_hours CHECK (hours_played >= 0),
  CONSTRAINT fk_user_games_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_games_game FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
  INDEX idx_user_games_status (user_id, status),
  INDEX idx_user_games_favorite (user_id, is_favorite)
) ENGINE=InnoDB;

CREATE TABLE reviews (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  game_id INT UNSIGNED NOT NULL,
  title VARCHAR(120) NULL,
  body TEXT NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_review_rating CHECK (rating >= 0 AND rating <= 10),
  CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_game FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
  INDEX idx_reviews_game (game_id),
  INDEX idx_reviews_user (user_id)
) ENGINE=InnoDB;

CREATE TABLE custom_lists (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  name VARCHAR(80) NOT NULL,
  description VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_lists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY uq_user_list_name (user_id, name)
) ENGINE=InnoDB;

CREATE TABLE custom_list_games (
  list_id INT UNSIGNED NOT NULL,
  game_id INT UNSIGNED NOT NULL,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (list_id, game_id),
  CONSTRAINT fk_list_games_list FOREIGN KEY (list_id) REFERENCES custom_lists(id) ON DELETE CASCADE,
  CONSTRAINT fk_list_games_game FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
) ENGINE=InnoDB;
