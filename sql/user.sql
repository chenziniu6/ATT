/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : card

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-06-09 16:14:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `pass_hash` varchar(255) NOT NULL,
  `pass_salt` varchar(255) NOT NULL,
  `cash` int(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', '', '', '', '0');
INSERT INTO `user` VALUES ('3', 'aaaaaa', '63966f0a0fee4cd38c0b462966b2e5e4', '17bb45bbc882648d4abe59a1b1412a9d', '100200');
INSERT INTO `user` VALUES ('4', 'aaaaaa', 'f7988e5515769b7707b1a092885997bd', '5510bb4dd72f00f0048caa6b64da2ec4', '0');
INSERT INTO `user` VALUES ('5', 'bbbbbb', 'cc145448aec68eb329ce17d4f15f906a', '3ea753483e661b112e3eabee5f0a3a5d', '0');
INSERT INTO `user` VALUES ('6', 'bbbbbb', '6e9043fd4b67491cac7de56059542685', '8f67dc7d62677a88134b70c7778f9337', '0');
INSERT INTO `user` VALUES ('7', 'bbbbbb', '9b1724b7daec78f38bf3ec444973a0ad', '76f6dec333a6bda63db14c96c7e2bd80', '0');
