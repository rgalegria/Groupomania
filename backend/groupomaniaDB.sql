-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`category` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `groupomania`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `photo_url` VARCHAR(255) NULL DEFAULT NULL,
  `department` VARCHAR(60) NULL DEFAULT NULL,
  `role` VARCHAR(60) NULL DEFAULT NULL,
  `linkedin_url` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 31
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `groupomania`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Users_id` INT NOT NULL,
  `Categories_id` INT NOT NULL,
  `post_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` VARCHAR(100) NOT NULL,
  `image_url` TEXT NOT NULL,
  `likes` INT NOT NULL DEFAULT '0',
  `dislikes` INT NOT NULL DEFAULT '0',
  `comments` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`, `Users_id`, `Categories_id`),
  INDEX `fk_Posts_Categories_idx` (`Categories_id` ASC),
  INDEX `fk_Posts_Users1_idx` (`Users_id` ASC),
  CONSTRAINT `fk_Posts_Categories`
    FOREIGN KEY (`Categories_id`)
    REFERENCES `groupomania`.`categories` (`id`),
  CONSTRAINT `fk_Posts_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `groupomania`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Posts_id` INT NOT NULL,
  `Users_id` INT NOT NULL,
  `comment_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`, `Posts_id`, `Users_id`),
  INDEX `fk_Comments_Users1_idx` (`Users_id` ASC),
  INDEX `fk_Comments_Posts1_idx` (`Posts_id` ASC),
  CONSTRAINT `fk_Comments_Posts1`
    FOREIGN KEY (`Posts_id`)
    REFERENCES `groupomania`.`posts` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_Comments_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `groupomania`.`reactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`reactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Posts_id` INT NOT NULL,
  `Users_id` INT NOT NULL,
  `reaction` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `Posts_id`, `Users_id`),
  INDEX `fk_Likes_Users1_idx` (`Users_id` ASC),
  INDEX `fk_Reactions_Posts1_idx` (`Posts_id` ASC),
  CONSTRAINT `fk_Likes_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_Reactions_Posts1`
    FOREIGN KEY (`Posts_id`)
    REFERENCES `groupomania`.`posts` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
