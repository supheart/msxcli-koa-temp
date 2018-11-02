/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 15/10/2018 16:48:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(32) DEFAULT NULL,
  `value` varchar(1024) DEFAULT NULL,
  `remark` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vacation
-- ----------------------------
DROP TABLE IF EXISTS `vacation`;
CREATE TABLE `vacation` (
  `startTime` timestamp NOT NULL,
  `day` int(2) NOT NULL,
  `endTime` timestamp NOT NULL,
  `type` int(2) NOT NULL,
  `reason` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
