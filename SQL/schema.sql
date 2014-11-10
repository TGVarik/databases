USE CHAT;
DROP TABLE IF EXISTS `messages`;
DROP TABLE IF EXISTS `oauth`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `emails`;

CREATE TABLE `messages` (
  `messageId`  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `body` VARCHAR(512) NOT NULL,
  `userId` INT(10) UNSIGNED NOT NULL,
  `roomId` INT(10) UNSIGNED NOT NULL,
  `ts`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `users` (
  `userId` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `displayName` VARCHAR(30) NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `emails` (
  `emailId` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(100) NOT NULL,
  `userId` BIGINT UNSIGNED NOT NULL,
  `oauthId` BIGINT UNSIGNED NOT NULL
);

CREATE TABLE `oauth` (
  `oauthId` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `userId` BIGINT UNSIGNED NOT NULL,
  `familyName` VARCHAR(40) NULL,
  `givenName` VARCHAR(40) NULL,
  `middleName` VARCHAR(40) NULL,
  `displayName` VARCHAR(120) NOT NULL,
  `gender` VARCHAR(120) NOT NULL,
  `providerId` BIGINT(20) UNSIGNED UNIQUE NOT NULL,
  `provider` VARCHAR(10) NOT NULL,
  `profileUrl` VARCHAR(512) NULL,
  `photoUrl` VARCHAR(512) NULL
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




