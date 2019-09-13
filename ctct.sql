-- MySQL Workbench Synchronization
-- Generated: 2019-08-07 14:16
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Unknown

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `ctct` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `ctct`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(255) NOT NULL,
  `password` VARCHAR(1024) NOT NULL DEFAULT '',
  `identity` VARCHAR(13) NOT NULL,
  `registration_date` TIMESTAMP(6) NOT NULL COMMENT '										',
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ctct`.`companies` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(1024) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ctct`.`schedules` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL COMMENT '			',
  `driver` VARCHAR(45) NOT NULL,
  `bus` VARCHAR(45) NOT NULL,
  `hour` TIME(6) NOT NULL,
  `route_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_schedules_routes1_idx` (`route_id` ASC),
  CONSTRAINT `fk_schedules_routes1`
    FOREIGN KEY (`route_id`)
    REFERENCES `ctct`.`routes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ctct`.`routes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `company_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_routes_companies1_idx` (`company_id` ASC),
  CONSTRAINT `fk_routes_companies1`
    FOREIGN KEY (`company_id`)
    REFERENCES `ctct`.`companies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ctct`.`chairs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `side` VARCHAR(45) NOT NULL,
  `number` VARCHAR(45) NOT NULL,
  `schedule_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chairs_schedules1_idx` (`schedule_id` ASC),
  CONSTRAINT `fk_chairs_schedules1`
    FOREIGN KEY (`schedule_id`)
    REFERENCES `ctct`.`schedules` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ctct`.`chairs_has_users` (
  `chair_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `token` VARCHAR(1024) NULL DEFAULT NULL,
  `isValid` TINYINT(1) NOT NULL,
  PRIMARY KEY (`chair_id`, `user_id`),
  INDEX `fk_chairs_has_users_users1_idx` (`user_id` ASC),
  INDEX `fk_chairs_has_users_chairs1_idx` (`chair_id` ASC),
  CONSTRAINT `fk_chairs_has_users_chairs1`
    FOREIGN KEY (`chair_id`)
    REFERENCES `ctct`.`chairs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chairs_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ctct`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
