-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2018 at 06:15 PM
-- Server version: 5.6.17-log
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `migration`
--

CREATE TABLE IF NOT EXISTS `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1505485478),
('m140506_102106_rbac_init', 1505485484),
('m170125_081951_create_setting_table', 1505485507),
('m170125_082006_create_user_table', 1505485508),
('m170506_004517_init_rbac', 1505485509);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_agent`
--

CREATE TABLE IF NOT EXISTS `tbl_agent` (
  `agentId` varchar(21) NOT NULL,
  `userId` varchar(21) NOT NULL,
  `schoolId` varchar(21) NOT NULL,
  `locationId` varchar(21) NOT NULL,
  `name` varchar(100) NOT NULL,
  `about` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT '0',
  `status` varchar(3) NOT NULL,
  PRIMARY KEY (`agentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_auth_assignment`
--

CREATE TABLE IF NOT EXISTS `tbl_auth_assignment` (
  `item_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_name`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_auth_assignment`
--

INSERT INTO `tbl_auth_assignment` (`item_name`, `user_id`, `created_at`) VALUES
('admin', 'oYyzmGqYwMMbHowjT6TV2', 1505485509),
('manageSettings', 'xOLtUcfGaq2IaxPKywCKE', 1505485509),
('manageStaffs', 'xOLtUcfGaq2IaxPKywCKE', 1505485509),
('manageUsers', 'xOLtUcfGaq2IaxPKywCKE', 1505485509),
('staff', 'xOLtUcfGaq2IaxPKywCKE', 1505485509),
('staff', 'YXoy68TRZLxpiw0MYyOPA', 1506349490),
('user', 'gaS0Xd4iEhLAmbSGSpnxE', 1507736144),
('user', 'swD7NQDa2UDKhvtAdfP12', 1505485509),
('user', 'v61HyKhVAAoT8V1ACbkDL', 1506402468);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_auth_item`
--

CREATE TABLE IF NOT EXISTS `tbl_auth_item` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `type` smallint(6) NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `rule_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` blob,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `rule_name` (`rule_name`),
  KEY `idx-auth_item-type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_auth_item`
--

INSERT INTO `tbl_auth_item` (`name`, `type`, `description`, `rule_name`, `data`, `created_at`, `updated_at`) VALUES
('admin', 1, 'Administrator', NULL, NULL, 1505485509, 1505485509),
('agent', 1, 'Agent', NULL, NULL, 1505485509, 1505485509),
('instructor', 1, 'Instructor', NULL, NULL, 1505485509, 1505485509),
('manageCourses', 2, 'Manage courses', NULL, NULL, 1505485508, 1505485508),
('manageSettings', 2, 'Manage settings', NULL, NULL, 1505485508, 1505485508),
('manageStaffs', 2, 'Manage staffs', NULL, NULL, 1505485508, 1505485508),
('manageTrip', 2, 'Manage trip', NULL, NULL, 1505485509, 1505485509),
('manageUsers', 2, 'Manage users', NULL, NULL, 1505485508, 1505485508),
('staff', 1, 'Staff', NULL, NULL, 1505485508, 1505485508),
('user', 1, 'User', NULL, NULL, 1505485508, 1505485508);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_auth_item_child`
--

CREATE TABLE IF NOT EXISTS `tbl_auth_item_child` (
  `parent` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `child` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_auth_rule`
--

CREATE TABLE IF NOT EXISTS `tbl_auth_rule` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `data` blob,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_block`
--

CREATE TABLE IF NOT EXISTS `tbl_block` (
  `blockId` varchar(21) NOT NULL DEFAULT '',
  `previousHash` varchar(64) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `data` text NOT NULL,
  `hash` varchar(4) NOT NULL,
  PRIMARY KEY (`blockId`),
  KEY `idx-block-hash` (`hash`),
  KEY `idx-block-previousHash` (`previousHash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE IF NOT EXISTS `tbl_course` (
  `courseId` varchar(21) NOT NULL DEFAULT '',
  `courseTypeId` varchar(21) DEFAULT NULL,
  `schoolId` varchar(21) DEFAULT NULL,
  `schoolCampiId` varchar(21) DEFAULT NULL,
  `startDate` int(11) NOT NULL,
  `endDate` int(11) NOT NULL,
  `periodOfDay` enum('morning','afternoon','night','all day') NOT NULL,
  `cost` float NOT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `name` varchar(120) NOT NULL,
  `about` varchar(255) NOT NULL,
  `remarks` text NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`courseId`),
  KEY `idx-course-courseTypeId` (`courseTypeId`),
  KEY `idx-course-schoolId` (`schoolId`),
  KEY `idx-course-schoolCampiId` (`schoolCampiId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`courseId`, `courseTypeId`, `schoolId`, `schoolCampiId`, `startDate`, `endDate`, `periodOfDay`, `cost`, `discount`, `name`, `about`, `remarks`, `rating`, `created_at`, `updated_at`, `status`) VALUES
('Ge4GFOyc0ttyxdj0B5kqT', '3', 'tB2QzNW4dLlCOKHs8kDYk', NULL, 140000000, 150000000, 'afternoon', 2150, 0, 'General English', 'General English for general purposes!', 'no', 0, 1455566656, 1455566656, 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_courseenroll`
--

CREATE TABLE IF NOT EXISTS `tbl_courseenroll` (
  `courseEnrollId` varchar(21) NOT NULL DEFAULT '',
  `courseId` varchar(21) DEFAULT NULL,
  `studentId` varchar(21) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`courseEnrollId`),
  KEY `idx-courseenroll-courseId` (`courseId`),
  KEY `idx-courseenroll-studentId` (`studentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_courseenroll`
--

INSERT INTO `tbl_courseenroll` (`courseEnrollId`, `courseId`, `studentId`, `created_at`, `updated_at`, `status`) VALUES
('fhLcafUnUZ1ascTVwiaCj', 'Ge4GFOyc0ttyxdj0B5kqT', '7sB7UtHBUMFDyt0XnrML9', 1512513394, 1512513394, 'PEN');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_coursefeatures`
--

CREATE TABLE IF NOT EXISTS `tbl_coursefeatures` (
  `courseFeaturesId` varchar(21) NOT NULL DEFAULT '',
  `courseId` varchar(21) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  `value` varchar(80) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`courseFeaturesId`),
  KEY `idx-coursefeatures-courseId` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_coursefeatures`
--

INSERT INTO `tbl_coursefeatures` (`courseFeaturesId`, `courseId`, `name`, `value`, `status`) VALUES
('OlWwGHSegnIm3BNYLMpdM', 'Ge4GFOyc0ttyxdj0B5kqT', 'WiFi', 'true', 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_courseinstructor`
--

CREATE TABLE IF NOT EXISTS `tbl_courseinstructor` (
  `courseInstructorId` varchar(21) NOT NULL DEFAULT '',
  `courseId` varchar(21) DEFAULT NULL,
  `instructorId` varchar(21) DEFAULT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`courseInstructorId`),
  KEY `idx-courseinstructor-courseId` (`courseId`),
  KEY `idx-courseinstructor-instructorId` (`instructorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_coursesection`
--

CREATE TABLE IF NOT EXISTS `tbl_coursesection` (
  `courseSectionId` varchar(21) NOT NULL DEFAULT '',
  `courseId` varchar(21) DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `order` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`courseSectionId`),
  KEY `idx-coursesection-courseId` (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_coursesection`
--

INSERT INTO `tbl_coursesection` (`courseSectionId`, `courseId`, `name`, `order`, `created_at`, `updated_at`, `status`) VALUES
('cSMLF7xYkHPYvrmxN2CWH', 'Ge4GFOyc0ttyxdj0B5kqT', 'Chapter 1', 1, 1501707284, 1501707284, 'ACT'),
('DMRE1OjoFsOvJYbzwjQR7', 'Ge4GFOyc0ttyxdj0B5kqT', 'Chapter 2', 2, 1501707325, 1501707325, 'ACT'),
('HyHCD73dVlM4haNT9kpwL', 'Ge4GFOyc0ttyxdj0B5kqT', 'Chapter 3', 3, 1501707347, 1501707347, 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_coursesectionitem`
--

CREATE TABLE IF NOT EXISTS `tbl_coursesectionitem` (
  `courseSectionItemId` varchar(21) NOT NULL DEFAULT '',
  `courseSectionId` varchar(21) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  `order` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`courseSectionItemId`),
  KEY `idx-coursesectionitem-courseSectionId` (`courseSectionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_coursesectionitem`
--

INSERT INTO `tbl_coursesectionitem` (`courseSectionItemId`, `courseSectionId`, `name`, `order`, `created_at`, `updated_at`, `status`) VALUES
('a3xhXObMzidik6Ai9o5zY', 'cSMLF7xYkHPYvrmxN2CWH', 'Introduction', 1, 1501708293, 1501708293, 'ACT'),
('DZS6HyIIdoegOiDd1XZ40', 'HyHCD73dVlM4haNT9kpwL', 'Auxiliary Verbs', 1, 1501708662, 1501708662, 'ACT'),
('DZsm65ZDnc84p6XTCQqXe', 'cSMLF7xYkHPYvrmxN2CWH', 'Verb To Be', 2, 1501708293, 1501708293, 'ACT'),
('jdvzA8XmvLRciaMsVbiwJ', 'HyHCD73dVlM4haNT9kpwL', 'Phrasal Verbs', 2, 1501708662, 1501708662, 'ACT'),
('x0LUWrK5GRoZATn3zfWTr', 'DMRE1OjoFsOvJYbzwjQR7', 'Irregular Verbs', 2, 1501708481, 1501708481, 'ACT'),
('X4roJCD5kevByig6j2n4U', 'DMRE1OjoFsOvJYbzwjQR7', 'Regular Verbs', 1, 1501708481, 1501708481, 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_coursesectionresource`
--

CREATE TABLE IF NOT EXISTS `tbl_coursesectionresource` (
  `courseSectionResourceId` varchar(21) NOT NULL DEFAULT '',
  `courseSectionId` varchar(21) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  `path` varchar(255) NOT NULL,
  `order` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`courseSectionResourceId`),
  KEY `idx-coursesectionresource-courseSectionId` (`courseSectionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_coursetype`
--

CREATE TABLE IF NOT EXISTS `tbl_coursetype` (
  `courseTypeId` varchar(21) NOT NULL DEFAULT '',
  `name` varchar(80) NOT NULL,
  `certified` int(11) NOT NULL,
  `status` varchar(3) DEFAULT 'ACT',
  PRIMARY KEY (`courseTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_coursetype`
--

INSERT INTO `tbl_coursetype` (`courseTypeId`, `name`, `certified`, `status`) VALUES
('1', 'Starter', 0, 'ACT'),
('10', 'CAE', 0, 'ACT'),
('2', 'Elementary', 0, 'ACT'),
('3', 'Pre-intermediate', 0, 'ACT'),
('4', 'Intermediate', 0, 'ACT'),
('5', 'Upper-intermediate', 0, 'ACT'),
('6', 'Advanced', 0, 'ACT'),
('7', 'IELTS', 0, 'ACT'),
('8', 'TOEIC', 0, 'ACT'),
('9', 'TOFEL', 0, 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_geography`
--

CREATE TABLE IF NOT EXISTS `tbl_geography` (
  `geographyId` varchar(21) NOT NULL DEFAULT '',
  `cityCode` varchar(3) NOT NULL,
  `cityName` varchar(42) NOT NULL,
  `stateCode` varchar(3) NOT NULL,
  `stateName` varchar(42) NOT NULL,
  `countryCode` varchar(3) NOT NULL,
  `countryName` varchar(60) NOT NULL,
  PRIMARY KEY (`geographyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_geography`
--

INSERT INTO `tbl_geography` (`geographyId`, `cityCode`, `cityName`, `stateCode`, `stateName`, `countryCode`, `countryName`) VALUES
('09aHyUplIOr3VwCI8kvTv', '', 'Cairo', '', '', 'EG', 'Egypt'),
('0dxLcXFpDFSdcsjFsFxLi', '', 'West Island', '', '', 'CC', 'Cocos (Keeling) Islands'),
('0e3uYBbk1PpclGkZtodPd', '', 'Dili', '', '', 'TL', 'Timor-Leste'),
('0nhGJRnAoDqWDLxIZX5lI', '', 'The Valley', '', '', 'AI', 'Anguilla'),
('0pqWGWydUxkEyAtAet6D6', '', 'Yamoussoukro', '', '', 'CI', 'Côte d''Ivoire'),
('0UBrLw5lkUKrzigkTyetJ', '', 'Ankara', '', '', 'TR', 'Turkey'),
('10', 'BEG', 'Bega', 'NSW', 'New South Wales', 'AU', 'Australia'),
('100', 'EME', 'Emerald', 'QLD', 'Queensland', 'AU', 'Australia'),
('101', 'GAT', 'Gatton', 'QLD', 'Queensland', 'AU', 'Australia'),
('102', 'GLA', 'Gladstone', 'QLD', 'Queensland', 'AU', 'Australia'),
('103', 'GOL', 'Gold Coast', 'QLD', 'Queensland', 'AU', 'Australia'),
('104', 'GOO', 'Goondiwindi', 'QLD', 'Queensland', 'AU', 'Australia'),
('105', 'GYM', 'Gympie', 'QLD', 'Queensland', 'AU', 'Australia'),
('106', 'HER', 'Hervey Bay', 'QLD', 'Queensland', 'AU', 'Australia'),
('107', 'ING', 'Ingham', 'QLD', 'Queensland', 'AU', 'Australia'),
('108', 'INN', 'Innisfail', 'QLD', 'Queensland', 'AU', 'Australia'),
('109', 'KIN', 'Kingaroy', 'QLD', 'Queensland', 'AU', 'Australia'),
('11', 'BOU', 'Bourke', 'NSW', 'New South Wales', 'AU', 'Australia'),
('110', 'MAC', 'Mackay', 'QLD', 'Queensland', 'AU', 'Australia'),
('111', 'MAR', 'Mareeba', 'QLD', 'Queensland', 'AU', 'Australia'),
('112', 'MAR', 'Maroochydore', 'QLD', 'Queensland', 'AU', 'Australia'),
('113', 'MAR', 'Maryborough', 'QLD', 'Queensland', 'AU', 'Australia'),
('114', 'MOO', 'Moonie', 'QLD', 'Queensland', 'AU', 'Australia'),
('115', 'MOR', 'Moranbah', 'QLD', 'Queensland', 'AU', 'Australia'),
('116', 'MOU', 'Mount Isa', 'QLD', 'Queensland', 'AU', 'Australia'),
('117', 'MOU', 'Mount Morgan', 'QLD', 'Queensland', 'AU', 'Australia'),
('118', 'MOU', 'Moura', 'QLD', 'Queensland', 'AU', 'Australia'),
('119', 'RED', 'Redcliffe', 'QLD', 'Queensland', 'AU', 'Australia'),
('12', 'BOW', 'Bowral', 'NSW', 'New South Wales', 'AU', 'Australia'),
('120', 'ROC', 'Rockhampton', 'QLD', 'Queensland', 'AU', 'Australia'),
('121', 'ROM', 'Roma', 'QLD', 'Queensland', 'AU', 'Australia'),
('122', 'STA', 'Stanthorpe', 'QLD', 'Queensland', 'AU', 'Australia'),
('123', 'TOO', 'Toowoomba', 'QLD', 'Queensland', 'AU', 'Australia'),
('124', 'TOW', 'Townsville', 'QLD', 'Queensland', 'AU', 'Australia'),
('125', 'WAR', 'Warwick', 'QLD', 'Queensland', 'AU', 'Australia'),
('126', 'WEI', 'Weipa', 'QLD', 'Queensland', 'AU', 'Australia'),
('127', 'WIN', 'Winton', 'QLD', 'Queensland', 'AU', 'Australia'),
('128', 'YEP', 'Yeppoon', 'QLD', 'Queensland', 'AU', 'Australia'),
('129', 'ADE', 'Adelaide', 'SA', 'South Australia', 'AU', 'Australia'),
('13', 'BRO', 'Broken Hill', 'NSW', 'New South Wales', 'AU', 'Australia'),
('130', 'CED', 'Ceduna', 'SA', 'South Australia', 'AU', 'Australia'),
('131', 'CLA', 'Clare', 'SA', 'South Australia', 'AU', 'Australia'),
('132', 'COO', 'Coober Pedy', 'SA', 'South Australia', 'AU', 'Australia'),
('133', 'GAW', 'Gawler', 'SA', 'South Australia', 'AU', 'Australia'),
('134', 'GOO', 'Goolwa', 'SA', 'South Australia', 'AU', 'Australia'),
('135', 'IRO', 'Iron Knob', 'SA', 'South Australia', 'AU', 'Australia'),
('136', 'LEI', 'Leigh Creek', 'SA', 'South Australia', 'AU', 'Australia'),
('137', 'LOX', 'Loxton', 'SA', 'South Australia', 'AU', 'Australia'),
('138', 'MIL', 'Millicent', 'SA', 'South Australia', 'AU', 'Australia'),
('139', 'MOU', 'Mount Gambier', 'SA', 'South Australia', 'AU', 'Australia'),
('14', 'BYR', 'Byron Bay', 'NSW', 'New South Wales', 'AU', 'Australia'),
('140', 'MUR', 'Murray Bridge', 'SA', 'South Australia', 'AU', 'Australia'),
('141', 'NAR', 'Naracoorte', 'SA', 'South Australia', 'AU', 'Australia'),
('142', 'OOD', 'Oodnadatta', 'SA', 'South Australia', 'AU', 'Australia'),
('143', 'POR', 'Port Adelaide Enfield', 'SA', 'South Australia', 'AU', 'Australia'),
('144', 'POR', 'Port Augusta', 'SA', 'South Australia', 'AU', 'Australia'),
('145', 'POR', 'Port Lincoln', 'SA', 'South Australia', 'AU', 'Australia'),
('146', 'POR', 'Port Pirie', 'SA', 'South Australia', 'AU', 'Australia'),
('147', 'REN', 'Renmark', 'SA', 'South Australia', 'AU', 'Australia'),
('148', 'VIC', 'Victor Harbor', 'SA', 'South Australia', 'AU', 'Australia'),
('149', 'WHY', 'Whyalla', 'SA', 'South Australia', 'AU', 'Australia'),
('15', 'CAM', 'Camden', 'NSW', 'New South Wales', 'AU', 'Australia'),
('150', 'HOB', 'Hobart', 'TAS', 'Tasmania', 'AU', 'Australia'),
('151', 'BEA', 'Beaconsfield', 'TAS', 'Tasmania', 'AU', 'Australia'),
('152', 'BEL', 'Bell Bay', 'TAS', 'Tasmania', 'AU', 'Australia'),
('153', 'BUR', 'Burnie', 'TAS', 'Tasmania', 'AU', 'Australia'),
('154', 'DEV', 'Devonport', 'TAS', 'Tasmania', 'AU', 'Australia'),
('155', 'KIN', 'Kingston', 'TAS', 'Tasmania', 'AU', 'Australia'),
('156', 'LAU', 'Launceston', 'TAS', 'Tasmania', 'AU', 'Australia'),
('157', 'NEW', 'New Norfolk', 'TAS', 'Tasmania', 'AU', 'Australia'),
('158', 'QUE', 'Queenstown', 'TAS', 'Tasmania', 'AU', 'Australia'),
('159', 'RIC', 'Richmond', 'TAS', 'Tasmania', 'AU', 'Australia'),
('16', 'CAM', 'Campbelltown', 'NSW', 'New South Wales', 'AU', 'Australia'),
('160', 'ROS', 'Rosebery', 'TAS', 'Tasmania', 'AU', 'Australia'),
('161', 'SMI', 'Smithton', 'TAS', 'Tasmania', 'AU', 'Australia'),
('162', 'STA', 'Stanley', 'TAS', 'Tasmania', 'AU', 'Australia'),
('163', 'ULV', 'Ulverstone', 'TAS', 'Tasmania', 'AU', 'Australia'),
('164', 'WYN', 'Wynyard', 'TAS', 'Tasmania', 'AU', 'Australia'),
('165', 'MEL', 'Melbourne', 'VIC', 'Victoria', 'AU', 'Australia'),
('166', 'ALB', 'Albury-Wodonga', 'VIC', 'Victoria', 'AU', 'Australia'),
('167', 'ARA', 'Ararat', 'VIC', 'Victoria', 'AU', 'Australia'),
('168', 'BAC', 'Bacchus Marsh', 'VIC', 'Victoria', 'AU', 'Australia'),
('169', 'BAI', 'Bairnsdale', 'VIC', 'Victoria', 'AU', 'Australia'),
('17', 'COB', 'Cobar', 'NSW', 'New South Wales', 'AU', 'Australia'),
('170', 'BAL', 'Ballarat', 'VIC', 'Victoria', 'AU', 'Australia'),
('171', 'BEE', 'Beechworth', 'VIC', 'Victoria', 'AU', 'Australia'),
('172', 'BEN', 'Benalla', 'VIC', 'Victoria', 'AU', 'Australia'),
('173', 'BEN', 'Bendigo', 'VIC', 'Victoria', 'AU', 'Australia'),
('174', 'CAS', 'Castlemaine', 'VIC', 'Victoria', 'AU', 'Australia'),
('175', 'COL', 'Colac', 'VIC', 'Victoria', 'AU', 'Australia'),
('176', 'ECH', 'Echuca', 'VIC', 'Victoria', 'AU', 'Australia'),
('177', 'GEE', 'Geelong', 'VIC', 'Victoria', 'AU', 'Australia'),
('178', 'HAM', 'Hamilton', 'VIC', 'Victoria', 'AU', 'Australia'),
('179', 'HEA', 'Healesville', 'VIC', 'Victoria', 'AU', 'Australia'),
('18', 'COF', 'Coffs Harbour', 'NSW', 'New South Wales', 'AU', 'Australia'),
('180', 'HOR', 'Horsham', 'VIC', 'Victoria', 'AU', 'Australia'),
('181', 'KER', 'Kerang', 'VIC', 'Victoria', 'AU', 'Australia'),
('182', 'KYA', 'Kyabram', 'VIC', 'Victoria', 'AU', 'Australia'),
('183', 'KYN', 'Kyneton', 'VIC', 'Victoria', 'AU', 'Australia'),
('184', 'LAK', 'Lakes Entrance', 'VIC', 'Victoria', 'AU', 'Australia'),
('185', 'MAR', 'Maryborough', 'VIC', 'Victoria', 'AU', 'Australia'),
('186', 'MIL', 'Mildura', 'VIC', 'Victoria', 'AU', 'Australia'),
('187', 'MOE', 'Moe', 'VIC', 'Victoria', 'AU', 'Australia'),
('188', 'MOR', 'Morwell', 'VIC', 'Victoria', 'AU', 'Australia'),
('189', 'POR', 'Port Fairy', 'VIC', 'Victoria', 'AU', 'Australia'),
('19', 'COO', 'Cooma', 'NSW', 'New South Wales', 'AU', 'Australia'),
('190', 'POR', 'Portland', 'VIC', 'Victoria', 'AU', 'Australia'),
('191', 'SAL', 'Sale', 'VIC', 'Victoria', 'AU', 'Australia'),
('192', 'SEA', 'Sea Lake', 'VIC', 'Victoria', 'AU', 'Australia'),
('193', 'SEY', 'Seymour', 'VIC', 'Victoria', 'AU', 'Australia'),
('194', 'SHE', 'Shepparton', 'VIC', 'Victoria', 'AU', 'Australia'),
('195', 'SUN', 'Sunbury', 'VIC', 'Victoria', 'AU', 'Australia'),
('196', 'SWA', 'Swan Hill', 'VIC', 'Victoria', 'AU', 'Australia'),
('197', 'TRA', 'Traralgon', 'VIC', 'Victoria', 'AU', 'Australia'),
('198', 'YAR', 'Yarrawonga', 'VIC', 'Victoria', 'AU', 'Australia'),
('199', 'WAN', 'Wangaratta', 'VIC', 'Victoria', 'AU', 'Australia'),
('1A4zSOJXTYu8JjedK8Vrk', '', '', '', '', 'BV', 'Bouvet Island'),
('1FUl7YvD7TT0EIGQpFrol', '', 'Mamoudzou', '', '', 'YT', 'Mayotte'),
('1ggTk9omqIBIjk6odLmnI', '', 'Nassau', '', '', 'BS', 'Bahamas'),
('1KQihsmaMneM1NsrugWOI', '', 'Gaborone', '', '', 'BW', 'Botswana'),
('1WzQgh1FZATnsDJBa6jX6', '', 'Vienna', '', '', 'AT', 'Austria'),
('2', 'CAN', 'Canberra', 'ACT', 'Australian Capital Territory', 'AU', 'Australia'),
('20', 'COO', 'Coonabarabran', 'NSW', 'New South Wales', 'AU', 'Australia'),
('200', 'WAR', 'Warragul', 'VIC', 'Victoria', 'AU', 'Australia'),
('201', 'WER', 'Werribee', 'VIC', 'Victoria', 'AU', 'Australia'),
('202', 'WON', 'Wonthaggi', 'VIC', 'Victoria', 'AU', 'Australia'),
('203', 'PER', 'Perth', 'WA', 'Western Australia', 'AU', 'Australia'),
('204', 'BRO', 'Broome', 'WA', 'Western Australia', 'AU', 'Australia'),
('205', 'BUN', 'Bunbury', 'WA', 'Western Australia', 'AU', 'Australia'),
('206', 'BUS', 'Busselton', 'WA', 'Western Australia', 'AU', 'Australia'),
('207', 'COO', 'Coolgardie', 'WA', 'Western Australia', 'AU', 'Australia'),
('208', 'DAM', 'Dampier', 'WA', 'Western Australia', 'AU', 'Australia'),
('209', 'DER', 'Derby', 'WA', 'Western Australia', 'AU', 'Australia'),
('21', 'COO', 'Coonamble', 'NSW', 'New South Wales', 'AU', 'Australia'),
('210', 'FRE', 'Fremantle', 'WA', 'Western Australia', 'AU', 'Australia'),
('211', 'GER', 'Geraldton', 'WA', 'Western Australia', 'AU', 'Australia'),
('212', 'KAL', 'Kalgoorlie', 'WA', 'Western Australia', 'AU', 'Australia'),
('213', 'KAM', 'Kambalda', 'WA', 'Western Australia', 'AU', 'Australia'),
('214', 'KAT', 'Katanning', 'WA', 'Western Australia', 'AU', 'Australia'),
('215', 'KWI', 'Kwinana', 'WA', 'Western Australia', 'AU', 'Australia'),
('216', 'MAN', 'Mandurah', 'WA', 'Western Australia', 'AU', 'Australia'),
('217', 'MEE', 'Meekatharra', 'WA', 'Western Australia', 'AU', 'Australia'),
('218', 'MOU', 'Mount Barker', 'WA', 'Western Australia', 'AU', 'Australia'),
('219', 'NAR', 'Narrogin', 'WA', 'Western Australia', 'AU', 'Australia'),
('22', 'COO', 'Cootamundra', 'NSW', 'New South Wales', 'AU', 'Australia'),
('220', 'NEW', 'Newman', 'WA', 'Western Australia', 'AU', 'Australia'),
('221', 'NOR', 'Northam', 'WA', 'Western Australia', 'AU', 'Australia'),
('222', 'POR', 'Port Hedland', 'WA', 'Western Australia', 'AU', 'Australia'),
('223', 'TOM', 'Tom Price', 'WA', 'Western Australia', 'AU', 'Australia'),
('224', 'WYN', 'Wyndham', 'WA', 'Western Australia', 'AU', 'Australia'),
('23', 'COR', 'Corowa', 'NSW', 'New South Wales', 'AU', 'Australia'),
('24', 'COW', 'Cowra', 'NSW', 'New South Wales', 'AU', 'Australia'),
('25', 'DEN', 'Deniliquin', 'NSW', 'New South Wales', 'AU', 'Australia'),
('25cptHlkBffspEs92uyzZ', '', 'São Tomé', '', '', 'ST', 'Sao Tome and Principe'),
('26', 'DUB', 'Dubbo', 'NSW', 'New South Wales', 'AU', 'Australia'),
('27', 'FOR', 'Forbes', 'NSW', 'New South Wales', 'AU', 'Australia'),
('28', 'FOR', 'Forster', 'NSW', 'New South Wales', 'AU', 'Australia'),
('29', 'GLE', 'Glen Innes', 'NSW', 'New South Wales', 'AU', 'Australia'),
('2CbcFPIfChfVz0hwNCI3h', '', 'Buenos Aires', '', '', 'AR', 'Argentina'),
('2CY0Paa3mAGskfXXsoU0x', '', 'Dodoma', '', '', 'TZ', 'Tanzania, United Republic of'),
('2hvbVZlJugVL9WNpaernG', '', 'Quito', '', '', 'EC', 'Ecuador'),
('2j7mVQtKiEHLPvsxe3Nsi', '', 'Pristina', '', '', 'KOS', 'Kosovo'),
('3', 'SYD', 'Sydney', 'NSW', 'New South Wales', 'AU', 'Australia'),
('30', 'GOS', 'Gosford', 'NSW', 'New South Wales', 'AU', 'Australia'),
('31', 'GOU', 'Goulburn', 'NSW', 'New South Wales', 'AU', 'Australia'),
('32', 'GRA', 'Grafton', 'NSW', 'New South Wales', 'AU', 'Australia'),
('33', 'GRI', 'Griffith', 'NSW', 'New South Wales', 'AU', 'Australia'),
('34', 'GUN', 'Gundagai', 'NSW', 'New South Wales', 'AU', 'Australia'),
('35', 'GUN', 'Gunnedah', 'NSW', 'New South Wales', 'AU', 'Australia'),
('36', 'HAY', 'Hay', 'NSW', 'New South Wales', 'AU', 'Australia'),
('37', 'INV', 'Inverell', 'NSW', 'New South Wales', 'AU', 'Australia'),
('38', 'JUN', 'Junee', 'NSW', 'New South Wales', 'AU', 'Australia'),
('39', 'KAT', 'Katoomba', 'NSW', 'New South Wales', 'AU', 'Australia'),
('3hWTQy0l97fzVcHrgV5bL', '', 'Freetown', '', '', 'SL', 'Sierra Leone'),
('3m8VrHnG0GUcYSuoKBTbQ', '', 'Prague', '', '', 'CZ', 'Czech Republic'),
('3QPbPqXg2rs05IP7xSUuc', '', 'Montevideo', '', '', 'UY', 'Uruguay'),
('3XlsBcOcitzpY7xjX2qFs', '', 'Moscow', '', '', 'RU', 'Russian Federation'),
('4', 'ALB', 'Albury-Wodonga', 'NSW', 'New South Wales', 'AU', 'Australia'),
('40', 'KEM', 'Kempsey', 'NSW', 'New South Wales', 'AU', 'Australia'),
('41', 'KIA', 'Kiama', 'NSW', 'New South Wales', 'AU', 'Australia'),
('42', 'KUR', 'Kurri Kurri', 'NSW', 'New South Wales', 'AU', 'Australia'),
('43', 'LAK', 'Lake Cargelligo', 'NSW', 'New South Wales', 'AU', 'Australia'),
('44', 'LIS', 'Lismore', 'NSW', 'New South Wales', 'AU', 'Australia'),
('44AZsA7ZYjizTD3WZFJBq', '', 'Conakry', '', '', 'GN', 'Guinea'),
('45', 'LIT', 'Lithgow', 'NSW', 'New South Wales', 'AU', 'Australia'),
('46', 'MAI', 'Maitland', 'NSW', 'New South Wales', 'AU', 'Australia'),
('47', 'MOR', 'Moree', 'NSW', 'New South Wales', 'AU', 'Australia'),
('48', 'MOR', 'Moruya', 'NSW', 'New South Wales', 'AU', 'Australia'),
('49', 'MUR', 'Murwillumbah', 'NSW', 'New South Wales', 'AU', 'Australia'),
('4C7aB9VnZBuK6ftcwbZ4h', '', 'Tórshavn', '', '', 'FO', 'Faroe Islands'),
('4GCFbauaUq0KMgIpZty3F', '', 'Asunción', '', '', 'PY', 'Paraguay'),
('4reLpgFjxEJ2Vh3ZpcxyC', '', 'Kingston', '', '', 'NF', 'Norfolk Island'),
('5', 'ARM', 'Armidale', 'NSW', 'New South Wales', 'AU', 'Australia'),
('50', 'MUS', 'Muswellbrook', 'NSW', 'New South Wales', 'AU', 'Australia'),
('51', 'NAM', 'Nambucca Heads', 'NSW', 'New South Wales', 'AU', 'Australia'),
('52', 'NAR', 'Narrabri', 'NSW', 'New South Wales', 'AU', 'Australia'),
('53', 'NAR', 'Narrandera', 'NSW', 'New South Wales', 'AU', 'Australia'),
('54', 'NEW', 'Newcastle', 'NSW', 'New South Wales', 'AU', 'Australia'),
('55', 'NOW', 'Nowra-Bomaderry', 'NSW', 'New South Wales', 'AU', 'Australia'),
('56', 'ORA', 'Orange', 'NSW', 'New South Wales', 'AU', 'Australia'),
('57', 'PAR', 'Parkes', 'NSW', 'New South Wales', 'AU', 'Australia'),
('58', 'PAR', 'Parramatta', 'NSW', 'New South Wales', 'AU', 'Australia'),
('59', 'PEN', 'Penrith', 'NSW', 'New South Wales', 'AU', 'Australia'),
('5OkD9KsHhoYlNkYsvvloJ', '', 'Bratislava', '', '', 'SK', 'Slovakia'),
('5qj3EkHaiN8m6NCOj1imZ', '', 'Copenhagen', '', '', 'DK', 'Denmark'),
('6', 'BAL', 'Ballina', 'NSW', 'New South Wales', 'AU', 'Australia'),
('60', 'POR', 'Port Macquarie', 'NSW', 'New South Wales', 'AU', 'Australia'),
('61', 'QUE', 'Queanbeyan', 'NSW', 'New South Wales', 'AU', 'Australia'),
('62', 'RAY', 'Raymond Terrace', 'NSW', 'New South Wales', 'AU', 'Australia'),
('63', 'RIC', 'Richmond', 'NSW', 'New South Wales', 'AU', 'Australia'),
('63wXdrnC3uic0YEZI5IIr', '', 'Curitiba', 'PR', 'Paraná', 'BR', 'Brazil'),
('64', 'SCO', 'Scone', 'NSW', 'New South Wales', 'AU', 'Australia'),
('65', 'SIN', 'Singleton', 'NSW', 'New South Wales', 'AU', 'Australia'),
('66', 'TAM', 'Tamworth', 'NSW', 'New South Wales', 'AU', 'Australia'),
('67', 'TAR', 'Taree', 'NSW', 'New South Wales', 'AU', 'Australia'),
('68', 'TEM', 'Temora', 'NSW', 'New South Wales', 'AU', 'Australia'),
('69', 'TEN', 'Tenterfield', 'NSW', 'New South Wales', 'AU', 'Australia'),
('6ffz9vYKHOmbSbnBewKzc', '', 'Ashgabat', '', '', 'TM', 'Turkmenistan'),
('6nrK3BPdtvQkP6huHmN7s', '', 'Paramaribo', '', '', 'SR', 'Suriname'),
('6qnxGqdXjvqH5ktIDTfS1', '', 'Dhaka', '', '', 'BD', 'Bangladesh'),
('7', 'BAL', 'Balranald', 'NSW', 'New South Wales', 'AU', 'Australia'),
('70', 'TUM', 'Tumut', 'NSW', 'New South Wales', 'AU', 'Australia'),
('71', 'ULL', 'Ulladulla', 'NSW', 'New South Wales', 'AU', 'Australia'),
('72', 'WAG', 'Wagga Wagga', 'NSW', 'New South Wales', 'AU', 'Australia'),
('73', 'WAU', 'Wauchope', 'NSW', 'New South Wales', 'AU', 'Australia'),
('74', 'WEL', 'Wellington', 'NSW', 'New South Wales', 'AU', 'Australia'),
('75', 'WES', 'West Wyalong', 'NSW', 'New South Wales', 'AU', 'Australia'),
('76', 'WIN', 'Windsor', 'NSW', 'New South Wales', 'AU', 'Australia'),
('77', 'WOL', 'Wollongong', 'NSW', 'New South Wales', 'AU', 'Australia'),
('78', 'WYO', 'Wyong', 'NSW', 'New South Wales', 'AU', 'Australia'),
('79', 'YAS', 'Yass', 'NSW', 'New South Wales', 'AU', 'Australia'),
('7iQ0BoyXGVyClRLjOxZKC', '', 'Madrid', '', '', 'ES', 'Spain'),
('7O7nFJ6CTUc7MKbAu9IAN', '', 'Kingston', '', '', 'JM', 'Jamaica'),
('7tGf4gmY9AMjXK0AlmL7S', '', 'Adamstown', '', '', 'PN', 'Pitcairn'),
('7TrB7wBXjkAw4CihJZ6oE', '', 'London', '', '', 'GB', 'United Kingdom'),
('8', 'BAT', 'Batemans Bay', 'NSW', 'New South Wales', 'AU', 'Australia'),
('80', 'YOU', 'Young', 'NSW', 'New South Wales', 'AU', 'Australia'),
('81', 'DAR', 'Darwin', 'NT', 'Northern Territory', 'AU', 'Australia'),
('82', 'ALI', 'Alice Springs', 'NT', 'Northern Territory', 'AU', 'Australia'),
('83', 'ANT', 'Anthony Lagoon', 'NT', 'Northern Territory', 'AU', 'Australia'),
('84', 'KAT', 'Katherine', 'NT', 'Northern Territory', 'AU', 'Australia'),
('85', 'TEN', 'Tennant Creek', 'NT', 'Northern Territory', 'AU', 'Australia'),
('86', 'BRI', 'Brisbane', 'QLD', 'Queensland', 'AU', 'Australia'),
('87', 'AYR', 'Ayr', 'QLD', 'Queensland', 'AU', 'Australia'),
('88', 'BEA', 'Beaudesert', 'QLD', 'Queensland', 'AU', 'Australia'),
('89', 'BLA', 'Blackwater', 'QLD', 'Queensland', 'AU', 'Australia'),
('8a4uUiysKX2dHDP1FLlSc', '', 'Athens', '', '', 'GR', 'Greece'),
('8CePpxPZrNMoPuvedS3qd', '', 'Saipan', '', '', 'MP', 'Northern Mariana Islands'),
('8gF1rbKo8W8a2NpH4WdB7', '', 'Marigot', '', '', 'MAF', 'Saint Martin (French part)'),
('9', 'BAT', 'Bathurst', 'NSW', 'New South Wales', 'AU', 'Australia'),
('90', 'BOW', 'Bowen', 'QLD', 'Queensland', 'AU', 'Australia'),
('91', 'BUD', 'Buderim', 'QLD', 'Queensland', 'AU', 'Australia'),
('92', 'BUN', 'Bundaberg', 'QLD', 'Queensland', 'AU', 'Australia'),
('92LqayhCvMKzWFH7lcr7m', '', 'Grozny', '', '', 'CCH', 'Chechnya'),
('93', 'CAB', 'Caboolture', 'QLD', 'Queensland', 'AU', 'Australia'),
('94', 'CAI', 'Cairns', 'QLD', 'Queensland', 'AU', 'Australia'),
('95', 'CHA', 'Charleville', 'QLD', 'Queensland', 'AU', 'Australia'),
('96', 'CHA', 'Charters Towers', 'QLD', 'Queensland', 'AU', 'Australia'),
('97', 'COO', 'Cooktown', 'QLD', 'Queensland', 'AU', 'Australia'),
('98', 'DAL', 'Dalby', 'QLD', 'Queensland', 'AU', 'Australia'),
('99', 'DEC', 'Deception Bay', 'QLD', 'Queensland', 'AU', 'Australia'),
('99dkdo6449MrFiuKJmNKt', '', 'Oslo', '', '', 'NO', 'Norway'),
('99KQpFqsfHj5LjKV9HuVB', '', 'Praia', '', '', 'CV', 'Cape Verde'),
('9qzsabimR2cgOOJgB2lvZ', '', 'Fort-de-France', '', '', 'MQ', 'Martinique'),
('9R5YI1OaPO8ewiJ6srLWM', '', 'Kingstown', '', '', 'VC', 'Saint Vincent and the Grenadines'),
('A8qeTsmyxTwkuDDCdZ2AT', '', 'Manila', '', '', 'PH', 'Philippines'),
('Ac7H028eKXpeQ7zMd61PJ', '', 'Sana''a', '', '', 'YE', 'Yemen'),
('ai47tKAasPQT0uFr9rnas', '', 'Tehran', '', '', 'IR', 'Iran, Islamic Republic of'),
('Akic1mK1A0GhWDkjcmcmH', '', 'Hamilton', '', '', 'BM', 'Bermuda'),
('asAqsQcVe493Iip9ZYd10', '', 'Ulaanbaatar', '', '', 'MN', 'Mongolia'),
('AVOUPEpft86GIA5sfmUZL', '', '', '', '', 'MO', 'Macao'),
('B4oe18gHMce63dpwzf6z8', '', 'Kigali', '', '', 'RW', 'Rwanda'),
('b6OaDcUaUNi5QueL3C9JT', '', 'Berlin', '', '', 'DE', 'Germany'),
('ba24BLk7k9kuU08uhnn3r', '', 'Skopje', '', '', 'MK', 'Macedonia, Replublic of'),
('bgXAFCWtWq8ruZDraev6m', '', 'St. John''s', '', '', 'AG', 'Antigua and Barbuda'),
('BiCc82Pg7fTjxT8lWrvJh', '', 'Brussels', '', '', 'BE', 'Belgium'),
('BjQgO2OG36y6iTdJobu3I', '', 'Mexico City', '', '', 'MX', 'Mexico'),
('C7VhDN6dWeQW9btCl1daZ', '', 'San Marino', '', '', 'SM', 'San Marino'),
('C8MMX0qettF9CZJXZRG6C', '', 'Rome', '', '', 'IT', 'Italy'),
('Cb6u11IQ0tVUwjBNn8ttK', '', 'Castries', '', '', 'LC', 'Saint Lucia'),
('CbnUWLWGnL4qpGfP3ZvYa', '', 'Maputo', '', '', 'MZ', 'Mozambique'),
('cDWzVI3zsNokQGZJ26F3u', '', 'Flying Fish Cove', '', '', 'CX', 'Christmas Island'),
('cfe5ewV6hOeZ8HMwsR1pn', '', '', '', '', 'TK', 'Tokelau'),
('cnIuBOaHzFZOqA9JJ4zr8', '', 'Bern', '', '', 'CH', 'Switzerland'),
('cpD56vAvrjuYtgbRHZ5Iu', '', 'Libreville', '', '', 'GA', 'Gabon'),
('CqfTpA9hTJA6e2eYo60Ji', '', 'Reykjavik', '', '', 'IS', 'Iceland'),
('CvE8nVxNcdl71nOD4Mkbf', '', 'King Edward Point', '', '', 'GS', 'South Georgia and the South Sandwich Islands'),
('DMHJ0PPhBgr533606O8OK', '', 'Tokyo', '', '', 'JP', 'Japan'),
('DPgo8LilrNV5Wv026CtaZ', '', '', '', '', 'AX', 'Åland Islands'),
('dqa3AqudZK2MXdBa78pnx', '', 'Ljubljana', '', '', 'SI', 'Slovenia'),
('DWz75VMaB4sDHY0bSyug2', '', 'Budapest', '', '', 'HU', 'Hungary'),
('E8t6sVO1lEDRAPkhIhXeU', '', 'Rabat', '', '', 'MA', 'Morocco'),
('EExsxJKv6O2zs5u1jaLW2', '', 'Bogotá', '', '', 'CO', 'Colombia'),
('EfZV6LjqeARDlmjVfsPum', '', 'Brasília', '', '', 'BR', 'Brazil'),
('EjVUKd3euiVNlovyGPB16', '', 'Jesusalem', '', '', 'IL', 'Israel'),
('EkGLGVdPrinlQ4keoVMEP', '', 'Kuwait City', '', '', 'KW', 'Kuwait'),
('em2gh7PyPCgsn1Iutdzkd', '', 'Majuro', '', '', 'MH', 'Marshall Islands'),
('eOlSce0Hq84ytSuFMnqmn', '', 'Valleta', '', '', 'MT', 'Malta'),
('ePsOJUU1C2OnhJ8Mt2AIl', '', 'Belgrade', '', '', 'SRB', 'Serbia'),
('ev2mfQVeMDvq9LJfrhDVl', '', 'Monrovia', '', '', 'LR', 'Liberia'),
('ewZWv7X40lFnI1bB8S66W', '', 'Kinshasa', '', '', 'CD', 'Congo, the Democratic Republic of the'),
('Eze2eSVUdOXBQ3lld3eT3', '', 'Beirut', '', '', 'LB', 'Lebanon'),
('F2Qn9KG38GZnEZ5iAEWYn', '', 'Tirana', '', '', 'AL', 'Albania'),
('F4mGSwAyAWbRhJYJOdRz5', '', 'New Delhi', '', '', 'IN', 'India'),
('fEQpLcT45cf0dkH6LyHAO', '', 'Riga', '', '', 'LV', 'Latvia'),
('FFFW7cMMCTYTtAZRqoXvW', '', 'Hagåtña', '', '', 'GU', 'Guam'),
('fhHxw3Szz6zjq6pGRaXkR', '', 'Khartoum', '', '', 'SD', 'Sudan'),
('FLz7Gp52qgygwOCowGlqn', '', 'Papeete', '', '', 'PF', 'French Polynesia'),
('Fnb8RXMPhmuoxI6h5Nou6', '', 'Gibraltar', '', '', 'GI', 'Gibraltar'),
('FNGnUcpQIyccAt7NUirCK', '', 'Nairobi', '', '', 'KE', 'Kenya'),
('ftsx96FXwX7GYJyodt0kh', '', 'Ouagadougou', '', '', 'BF', 'Burkina Faso'),
('FUZls6AacRMhvk1QpxOJA', '', 'Hanoi', '', '', 'VN', 'Vietnam'),
('gBijEvJ28UoU7UyRgjYHk', '', 'Windhoek', '', '', 'NA', 'Namibia'),
('gDN0heAfa8KjHaLTtAC8h', '', 'Sarajevo', '', '', 'BA', 'Bosnia and Herzegovina'),
('Gf98xeMRq2re5d3ZpOGGS', '', 'Brazzaville', '', '', 'CG', 'Congo'),
('GLlnyGHN3fOaIfT7YJVMC', '', 'Yerevan', '', '', 'AM', 'Armenia'),
('GO3RbO6gd5hRQXvRfMHhZ', '', 'Sofia', '', '', 'BG', 'Bulgaria'),
('GsbIRWnQPQBpnZY4Q4vZt', '', 'Jakarta', '', '', 'ID', 'Indonesia'),
('GwVkVvLsU4jwViOy3eyCF', '', 'Basse-Terre', '', '', 'GP', 'Guadeloupe'),
('gzciz2ThPW7YjZB5OQPux', '', 'Palikir', '', '', 'FM', 'Micronesia, Federated States of'),
('H51HbTK0nv7O9UCTH42yi', '', 'Podgorica', '', '', 'MNE', 'Montenegro'),
('h6MlF00idPu4kCEgmvTNU', '', 'Tallinn', '', '', 'EE', 'Estonia'),
('HGui3GqU6Ap6YXUoRKvct', '', 'Lilongwe', '', '', 'MW', 'Malawi'),
('HisHKR53HdRZkFX7qV18m', '', '', '', '', 'SJ', 'Svalbard and Jan Mayen'),
('hNAQblQz2I2k1NsGkDJJi', '', 'Tblisi', '', '', 'GE', 'Georgia'),
('hphBr3YzBCApvSobxZCy3', '', 'Pyongyang', '', '', 'KP', 'Korea, Democratic People''s Republic of'),
('hR0ew4weYXeuirGiG6afo', '', 'Maseru', '', '', 'LS', 'Lesotho'),
('HtWxnJpMzG2T9ETajtYjr', '', 'Phnom Penh', '', '', 'KH', 'Cambodia'),
('Hx48JGk4qGwgQugQa4aRs', '', 'Kiev', '', '', 'UA', 'Ukraine'),
('IpeU7DBQslRN0Z6KU1Qy7', '', 'Vientiane', '', '', 'LA', 'Lao People''s Democratic Republic'),
('IQ9cq0MoVpWRZWGJAM2Ey', '', 'Santo Domingo', '', '', 'DO', 'Dominican Republic'),
('iqZq0PYtRigkPtLcUdvTE', '', 'Mogadishu', '', '', 'SO', 'Somalia'),
('IrN7Aw8embGTxSLSw6gF7', '', 'Stockholm', '', '', 'SE', 'Sweden'),
('irs6XXxl38DFiz1cheRKT', '', 'Lima', '', '', 'PE', 'Peru'),
('JAHxaucd45CU1KV1InRjl', '', 'Astana', '', '', 'KZ', 'Kazakhstan'),
('JAYdE2ySdIFehxBe24gbH', '', 'Bangui', '', '', 'CF', 'Central African Republic'),
('JE0SLOr8Gp2qyD5sgy8ZU', '', 'Caracas', '', '', 'VE', 'Venezuela, Bolivarian Republic of'),
('jFsfI2OSrMNh5bp0IIDte', '', 'Panama City', '', '', 'PA', 'Panama'),
('JH6NabM9o5fMznPNpirny', '', 'Mbabane', '', '', 'SZ', 'Swaziland'),
('jlCbMnCyUwheDZ0KkABVI', '', 'Niamey', '', '', 'NE', 'Niger'),
('joe4r9Lm8xqQQNT16pQ6f', '', 'Nouakchott', '', '', 'MR', 'Mauritania'),
('JSZMwcWkw5ePPvaQqOR09', '', 'Malé', '', '', 'MV', 'Maldives'),
('jTVsrusZ33EoXs7HoS1BN', '', 'Bandar Seri Begawan', '', '', 'BN', 'Brunei Darussalam'),
('JXid8VrNcdhZgQVBOxujf', '', 'Kampala', '', '', 'UG', 'Uganda'),
('K2fvMS2C69CaSHrsKO4JR', '', 'Zagreb', '', '', 'HR', 'Croatia'),
('K6XX6zKgA8eUl2ErkZ0oo', '', 'St. George''s', '', '', 'GD', 'Grenada'),
('kADXjzLEWm1XoqcO5mGTz', '', 'Mata-Utu', '', '', 'WF', 'Wallis and Futuna'),
('kiBWLHyF8Di04yg6lagb5', '', 'Road Town', '', '', 'VG', 'Virgin Islands, British'),
('Kj9K0tCCRrwKt74nBy1qJ', '', 'Damascus', '', '', 'SY', 'Syrian Arab Republic'),
('KroYwOMlEBcxrtkIuW6uC', '', 'Stanley', '', '', 'FK', 'Falkland Islands (Malvinas)'),
('kx1iriGfw7OMISfeCXlgO', '', 'Port-au-Prince', '', '', 'HT', 'Haiti'),
('KzAbuStQ2AqeWHBReLdwR', '', 'Baghdad', '', '', 'IQ', 'Iraq'),
('l0G5FbLrjQuJ4TJ95gcTA', '', 'Manama', '', '', 'BH', 'Bahrain'),
('l99DG3ugUpph8xCWM3y4p', '', 'Islamabad', '', '', 'PK', 'Pakistan'),
('LaVmVHIxuFbTAV8vOnet5', '', 'Sri Jayawardenepura Kotte', '', '', 'LK', 'Sri Lanka'),
('LbWqZ49jdCPR15HAZQEXS', '', 'Singapore', '', '', 'SG', 'Singapore'),
('lnrVFQwwRA61DegyTJC9y', '', 'Moroni', '', '', 'KM', 'Comoros'),
('LVAxjegCLeSvMIk7FdUNd', '', 'Funafuti', '', '', 'TV', 'Tuvalu'),
('LwFShHQU1DTpErGgU5PqN', '', 'Port Moresby', '', '', 'PG', 'Papua New Guinea'),
('m6PH8HNcHKuc4rU0GZaF2', '', 'Antananarivo', '', '', 'MG', 'Madagascar'),
('m894l0gzEMSxrPGoB63pR', '', 'Abu Dhabi', '', '', 'AE', 'United Arab Emirates'),
('MBqWxmMAifEmE7XgdK9PA', '', 'Roseau', '', '', 'DM', 'Dominica'),
('mBwHOuRGrZf4tvE6FBP0V', '', 'Hong Kong', '', '', 'HK', 'Hong Kong'),
('MdCC1ZOtHqIE1ojIkEzRg', '', 'Lusaka', '', '', 'ZM', 'Zambia'),
('mERSJEZFaCH01lP8WImaL', '', 'Suva', '', '', 'FJ', 'Fiji'),
('mfbtaKwpvgQzdQ1cutKaq', '', 'Helsinki', '', '', 'FI', 'Finland'),
('mfHTeaysseyGVbIQp9hbE', '', 'Georgetown', '', '', 'GY', 'Guyana'),
('mFwBVEetqYDfxRi2AHYFO', '', 'Luxembourg', '', '', 'LU', 'Luxembourg'),
('mH9co7OD7l5wEcNwpYx0a', '', 'Djibouti', '', '', 'DJ', 'Djibouti'),
('MTZzAOLKXgotw3SAIHO6N', '', 'Willemstad', '', '', 'CUW', 'Curaçao'),
('N1dyuyNM3b3zM54Aa5bAU', '', 'Luanda', '', '', 'AO', 'Angola'),
('nEIaAwHsOvNyYGaL0fU6z', '', 'Chișinău', '', '', 'MD', 'Moldova, Republic of'),
('Ng6Gq2pQgC5gt71clT6BP', '', 'Curitiba', 'PR', 'Paraná', 'BR', 'Brazil'),
('NIsFuV5IIMjlNzCHgM7yY', '', 'Porto Novo', '', '', 'BJ', 'Benin'),
('nLWSjVUyFrZuWyFPwguz7', '', 'Tripoli', '', '', 'LY', 'Libya'),
('NsaR2pJfDQlRlOupDg1ON', '', 'Bishkek', '', '', 'KG', 'Kyrgyzstan'),
('nw8eZp7uc9M3SNGz5lt2h', '', 'Lisbon', '', '', 'PT', 'Portugal'),
('nY4UUsrCtqJuqkanFwhSZ', '', 'Muscat', '', '', 'OM', 'Oman'),
('nyKgqEexUiCzaq8sKRn3D', '', 'Yaoundé', '', '', 'CM', 'Cameroon'),
('O3fKf1GTuoNxkSxICG08n', '', 'San Salvador', '', '', 'SV', 'El Salvador'),
('o8wdkzqcizmE4TLedox0G', '', 'Port Louis', '', '', 'MU', 'Mauritius'),
('OblOe7p9LYEHkRNDAies2', '', 'Bissau', '', '', 'GW', 'Guinea-Bissau'),
('Od0fJyeM540Iv4uFBVVBV', '', 'Curitiba', 'PR', 'Paraná', 'BR', 'Brazil'),
('OtfeQtsvpkEObLNPfQHn4', '', 'Dublin', '', '', 'IE', 'Ireland'),
('otwiZCrq1TtEURKDrsGCD', '', 'Lomé', '', '', 'TG', 'Togo'),
('Ou3wEGFJp5BChiwmbJ4LZ', '', 'Apia', '', '', 'WS', 'Samoa'),
('Ov8ollw2a0pwBpeVEAirG', '', 'Harare', '', '', 'ZW', 'Zimbabwe'),
('p0AzcKAk8juPzTfBhgvhk', '', 'Tegucigalpa', '', '', 'HN', 'Honduras'),
('p0DdHfWIqBKPKv0x1IkU6', '', 'Vilnius', '', '', 'LT', 'Lithuania'),
('p1YKea8bSgCcd9sBXUcWN', '', 'Bujumbura', '', '', 'BI', 'Burundi'),
('PHHu9NzoUCAgmwXzIKQpb', '', 'Andorra la Vella', '', '', 'AD', 'Andorra'),
('PktZHMjJMQRH6sIwBfDie', '', 'Bangkok', '', '', 'TH', 'Thailand'),
('PMUoSaC6270Mmr5NVctUZ', '', 'Douglas', '', '', 'IMN', 'Isle of Man'),
('qeha1FgtKb4cEDKHPRGJI', '', 'Ngerulmud', '', '', 'PW', 'Palau'),
('qFMxTvEf37J0wVeKWGr92', '', 'George Town', '', '', 'KY', 'Cayman Islands'),
('QFSRHjT0ZiMOu8Sv02s7A', '', 'Vaduz', '', '', 'LI', 'Liechtenstein'),
('QmbIoHpmMXdJVJGtZhWz5', '', 'Bucharest', '', '', 'RO', 'Romania'),
('RFwnAF1EqcV30k5SYBiiz', '', 'Thimphu', '', '', 'BT', 'Bhutan'),
('RLINsTisTT2wHcDwfNmRY', '', 'Dakar', '', '', 'SN', 'Senegal'),
('RsCMKYqoeCCRHFipPbYAy', '', 'Addis Ababa', '', '', 'ET', 'Ethiopia'),
('RTUszP6tInfMowwdpzAwl', '', 'Bamako', '', '', 'ML', 'Mali'),
('RVhqQJVjszGxlweEDsf2b', '', 'Basseterre', '', '', 'KN', 'Saint Kitts and Nevis'),
('Sdb783g0fzpYl5bjXyy5E', '', 'La Paz', '', '', 'BO', 'Bolivia, Plurinational State of'),
('sE8WmeOGuy3FYwxHj0JNn', '', 'Amman', '', '', 'JO', 'Jordan'),
('SGL1pyABDaI8MS1QCenHB', '', 'Wellington', '', '', 'NZ', 'New Zealand'),
('SlcIFYFOKBvEm9ET47QOF', '', 'Bridgetown', '', '', 'BB', 'Barbados'),
('sLmUFkxKzT0PvBaQeaABK', '', 'Baku', '', '', 'AZ', 'Azerbaijan'),
('SRait3sNck5IODVq8k2rn', '', 'Gustavia', '', '', 'BLM', 'Saint Barthélemy'),
('tGUAWZSgrvbq12fxW2fVH', '', 'Malabo', '', '', 'GQ', 'Equatorial Guinea'),
('tIRzXG3SSZz8eLSKWf8tt', '', 'Tarawa', '', '', 'KI', 'Kiribati'),
('TRj9ErvPw0BpoN8QTjcBy', '', 'Alofi', '', '', 'NU', 'Niue'),
('tTgqZ4HyPth9bcSQTYmTy', '', 'Accra', '', '', 'GH', 'Ghana'),
('U6xdCJ1ScXzDaAASsXTev', '', 'Avarua', '', '', 'CK', 'Cook Islands'),
('uBdhm4VOmpXhd36irvdjm', '', 'Nicosia', '', '', 'CY', 'Cyprus'),
('UHP6MRXE6T0M5GWuqz0Sj', '', 'N''Djamena', '', '', 'TD', 'Chad'),
('uIHuok5qrdHwDTJ6UcDjm', '', 'Belmopan', '', '', 'BZ', 'Belize'),
('uJa7t3UwqpVXNFcGm0qIa', '', 'Taipei', '', '', 'TW', 'Taiwan, Province of China'),
('UjNlKzxuj1gp7pzsVZ1Pi', '', 'Honiara', '', '', 'SB', 'Solomon Islands'),
('Umm0qoSZOu42i2fidz1fO', '', 'Port Vila', '', '', 'VU', 'Vanuatu'),
('UODHaeW6UG4IobqzywQEQ', '', 'Beijing', '', '', 'CN', 'China'),
('uqeWlHNoGm5I5cORWx2l0', '', 'Seoul', '', '', 'KR', 'Korea, Republic of'),
('uza2yQ2RlDLhQnzeYQAhl', '', 'St. Pierre', '', '', 'PM', 'Saint Pierre and Miquelon'),
('v4xgUHTkIQddb7Vupalw0', '', 'Cayenne', '', '', 'GF', 'French Guiana'),
('v8TafATDLvKFb4M4j8O2B', '', 'Havana', '', '', 'CU', 'Cuba'),
('VHqsE2foNqypGBgGJh8Af', '', 'Washington, D.C.', '', '', 'US', 'United States'),
('VkxAVPs0z7KacJKGZbnLR', '', 'Oranjestad', '', '', 'AW', 'Aruba'),
('VMyX2Lz47c4QqgUn0Usqb', '', 'Kabul', '', '', 'AF', 'Afghanistan'),
('VNr4Vh0E5UVIH41dI9bHs', '', 'Minsk', '', '', 'BY', 'Belarus'),
('VoBlcYVCE4o2vJtwHfAHx', '', 'Nuku''alofa', '', '', 'TO', 'Tonga'),
('voWk3kK1cdPLVILHEXt6T', '', 'Tunis', '', '', 'TN', 'Tunisia'),
('vqNqrA6FCL0uwefxIMv0j', '', 'Naypyidaw', '', '', 'MM', 'Myanmar'),
('vWt4DHfg5DU0kKXxop0hq', '', 'Nouméa', '', '', 'NC', 'New Caledonia'),
('vxO5Bl1sOJSTkI76Gx9rU', '', 'Santiago', '', '', 'CL', 'Chile'),
('VznUrM7M9bUo6Ci00yNSR', '', 'Doha', '', '', 'QA', 'Qatar'),
('W0S71gSlcLMw8h6Baq9a9', '', 'St. Helier', '', '', 'JEY', 'Jersey'),
('w40ATCqMX7jQskAsbiaoz', '', 'Plymouth', '', '', 'MS', 'Montserrat'),
('wgSN8W2z7yq0rzGZdyk1Y', '', '', '', '', 'BES', 'Bonaire, Sint Eustatius and Saba'),
('wJFvZoG0cVgTDUf9WQYE3', '', 'Kathmandu', '', '', 'NP', 'Nepal'),
('wjYWm1sy13aGpVZll39E8', '', 'Jamestown', '', '', 'SH', 'Saint Helena, Ascension and Tristan da Cunha'),
('WKoOFBzTn7nsuSjsrkx7e', '', 'Paris', '', '', 'FR', 'France'),
('WltHn7QUDU5caVGIrFFbP', '', 'Juba', '', '', 'SSD', 'South Sudan'),
('wOUkGcYywoJlw2c9Tyk8W', '', 'Amsterdam', '', '', 'NL', 'Netherlands'),
('wPfG59RM3BgPqE7jtRrJj', '', 'Warsaw', '', '', 'PL', 'Poland'),
('WVDdeTR63vgxZXiVC04Ar', '', 'Tashkent', '', '', 'UZ', 'Uzbekistan'),
('WvrjEOxboHyzpBERYgL5L', '', 'Philipsburg', '', '', 'SXM', 'Sint Maarten (Dutch part)'),
('WyhPDfjwa3AzHQ7WsgVWk', '', '', '', '', 'HM', 'Heard Island and McDonald Islands'),
('xebkdDrgl3YMcfBBr6VAb', '', 'Riyadh', '', '', 'SA', 'Saudi Arabia'),
('XjyTPLAIbnHcgX41yoWEI', '', 'Pago Pago', '', '', 'AS', 'American Samoa'),
('XMilswsc5x93pAimbAuqJ', '', 'Asmara', '', '', 'ER', 'Eritrea'),
('xOlBaoycw6GkJJs1Mls3F', '', 'Saint-Denis', '', '', 'RE', 'Réunion'),
('xzjmHYxNV2JZS7IgdmTJE', '', 'Nuuk', '', '', 'GL', 'Greenland'),
('XzUFhrrzhBuntTmi8KFZY', '', 'Charlotte Amalie', '', '', 'VI', 'Virgin Islands, U.S.'),
('y9tVgY1w2KqrxxYsvii1K', '', 'San Juan', '', '', 'PR', 'Puerto Rico'),
('YaTrB4mOanw7x5LNIZoCE', '', 'Pretoria', '', '', 'ZA', 'South Africa'),
('yAYkn5OX5Dq6om1l9uaKj', '', 'Ottawa', '', '', 'CA', 'Canada'),
('Ycp6Mw8NSbUiZsy9wrlat', '', 'Dushanbe', '', '', 'TJ', 'Tajikistan'),
('YdfyFDLsKXD3Gbmz0S23V', '', 'Banjul', '', '', 'GM', 'Gambia'),
('yGp0AHtD0rwu3E0b3e3Um', '', 'Abuja', '', '', 'NG', 'Nigeria'),
('yJhZZRicrs8rbL2kNE1n1', '', 'St. Peter Port', '', '', 'GGY', 'Guernsey'),
('YLOIglqrKerV7T4EhyVd6', '', 'Algiers', '', '', 'DZ', 'Algeria'),
('ypxlKs69xk3PTbNlpQsiA', '', 'Managua', '', '', 'NI', 'Nicaragua'),
('yrGllts0NVmg6tep44TRY', '', 'Yaren', '', '', 'NR', 'Nauru'),
('Z2lPpF8v1VsEwCbx0lJN0', '', 'Kuala Lumpur', '', '', 'MY', 'Malaysia'),
('z9NFbyKAfqrmPIwnRJYx2', '', 'Victoria', '', '', 'SC', 'Seychelles'),
('ZJOEKBpspDMMFSBRzWfha', '', 'Guatemala City', '', '', 'GT', 'Guatemala'),
('zkW3uZAk0eQCvutznxr65', '', 'Port of Spain', '', '', 'TT', 'Trinidad and Tobago'),
('ZoSof201Xorcmka7VHqUl', '', 'San José', '', '', 'CR', 'Costa Rica'),
('zqkTvEA23xYu3wtqs72ln', '', 'Monaco', '', '', 'MC', 'Monaco'),
('ZUuXBRYjcUv6HdvnjnBHF', '', 'Cockburn Town', '', '', 'TC', 'Turks and Caicos Islands');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_image`
--

CREATE TABLE IF NOT EXISTS `tbl_image` (
  `imageId` varchar(21) NOT NULL DEFAULT '',
  `large` varchar(255) NOT NULL,
  `thumb` varchar(255) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`imageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_image`
--

INSERT INTO `tbl_image` (`imageId`, `large`, `thumb`, `status`) VALUES
('4BzmTRUQibWiAipASy93O', '', '', 'ACT'),
('Cyyr8KkzA6i3r1HPM13YS', '', '', 'ACT'),
('gggdqdGfJUgEQKHR5TFac', '', '', 'ACT'),
('ltWzXMOPoNGiQSq4QxfUZ', '', '', 'ACT'),
('rZzJEejbV9NcamJd33oHe', '', '', 'ACT'),
('shRHBynqfcJZWe2gP51uC', '', '', 'ACT'),
('X7DxQaCX82iKM4OJVV2Dp', '', '', 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_instructor`
--

CREATE TABLE IF NOT EXISTS `tbl_instructor` (
  `instructorId` varchar(21) NOT NULL DEFAULT '',
  `userId` varchar(21) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  `about` varchar(255) NOT NULL,
  `expertise` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`instructorId`),
  KEY `idx-instructor-userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_instructor`
--

INSERT INTO `tbl_instructor` (`instructorId`, `userId`, `name`, `about`, `expertise`, `rating`, `status`) VALUES
('BKbRld9sACFsYpH3tBj4O', 'v61HyKhVAAoT8V1ACbkDL', 'Intructor Zero', '...', 'verb to be', 0, 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_location`
--

CREATE TABLE IF NOT EXISTS `tbl_location` (
  `locationId` varchar(21) NOT NULL DEFAULT '',
  `geographyId` varchar(21) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `streetNumber` varchar(6) NOT NULL,
  `formattedAddress` varchar(100) NOT NULL,
  `neighborhood` varchar(60) NOT NULL,
  `postCode` varchar(15) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `remarks` text NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`locationId`),
  KEY `idx-location-geographyId` (`geographyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_location`
--

INSERT INTO `tbl_location` (`locationId`, `geographyId`, `address`, `address2`, `streetNumber`, `formattedAddress`, `neighborhood`, `postCode`, `latitude`, `longitude`, `remarks`, `status`) VALUES
('76Zl9Tgv8xn4fbbvOFWba', '63wXdrnC3uic0YEZI5IIr', 'Rua Augusto Renoir', 'sb 03', '460', 'R. Augusto Renoir, 460 - Guabirotuba, Curitiba - PR, 81510-420, Brazil', 'Guabirotuba', '81510-420', -25.4709161, -49.2441726, '', 'ACT'),
('KoZqW2ZV0VXDXsIf0A1kD', 'Od0fJyeM540Iv4uFBVVBV', 'Rua Augusto Renoir', 'sb 03', '460', 'R. Augusto Renoir, 460 - Guabirotuba, Curitiba - PR, 81510-420, Brazil', 'Guabirotuba', '81510-420', -25.4709161, -49.2441726, '', 'ACT'),
('Lyzwv6U0VPEqz2SVRkVKu', 'Ng6Gq2pQgC5gt71clT6BP', 'Avenida Presidente Kennedy', 'ap 402 A', '3230', 'Av. Pres. Kennedy, 3230 - Rebouças, Curitiba - PR, Brazil', 'Rebouças', '', -25.4712219, -49.2852693, '', 'ACT'),
('ofc3IIJqwvGBZprTPoQRA', '86', '5th av', '', '92', '92 5th av', 'downtown', '56789', 0, 0, 'Nothing much to say', 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_media`
--

CREATE TABLE IF NOT EXISTS `tbl_media` (
  `mediaId` varchar(21) NOT NULL DEFAULT '',
  `imageId` varchar(21) DEFAULT NULL,
  `videoId` varchar(21) DEFAULT NULL,
  `schoolId` varchar(21) DEFAULT NULL,
  `studentId` varchar(21) DEFAULT NULL,
  `instructorId` varchar(21) DEFAULT NULL,
  `courseId` varchar(21) DEFAULT NULL,
  `geographyId` varchar(21) DEFAULT NULL,
  `userId` varchar(21) DEFAULT NULL,
  PRIMARY KEY (`mediaId`),
  KEY `idx-media-imageId` (`imageId`),
  KEY `idx-media-videoId` (`videoId`),
  KEY `idx-media-schoolId` (`schoolId`),
  KEY `idx-media-studentId` (`studentId`),
  KEY `idx-media-instructorId` (`instructorId`),
  KEY `idx-media-courseId` (`courseId`),
  KEY `idx-media-geographyId` (`geographyId`),
  KEY `idx-media-userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_media`
--

INSERT INTO `tbl_media` (`mediaId`, `imageId`, `videoId`, `schoolId`, `studentId`, `instructorId`, `courseId`, `geographyId`, `userId`) VALUES
('1QSVAjoVqpgyltM3OJmo4', 'rZzJEejbV9NcamJd33oHe', NULL, NULL, NULL, 'BKbRld9sACFsYpH3tBj4O', NULL, NULL, NULL),
('oH1kG1pOh090AoaC5S9YI', 'gggdqdGfJUgEQKHR5TFac', NULL, NULL, NULL, NULL, 'Ge4GFOyc0ttyxdj0B5kqT', NULL, NULL),
('wwgqr12KtsNOB9Z1jLAff', 'shRHBynqfcJZWe2gP51uC', NULL, 'tB2QzNW4dLlCOKHs8kDYk', NULL, NULL, NULL, NULL, NULL),
('XogPJmmswYjgJcdvIv9V4', '4BzmTRUQibWiAipASy93O', NULL, NULL, 'YRsFnq2oKG7ubK0vrUp9U', NULL, NULL, NULL, NULL),
('XQNXekZVlzSrWmVyQVOrU', 'Cyyr8KkzA6i3r1HPM13YS', NULL, 'tENDkwBqQAjcXTqCAqxlt', NULL, NULL, NULL, NULL, NULL),
('YYTAgQWnhRROs2WxRMgvK', 'X7DxQaCX82iKM4OJVV2Dp', NULL, NULL, '7sB7UtHBUMFDyt0XnrML9', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_migration`
--

CREATE TABLE IF NOT EXISTS `tbl_migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_migration`
--

INSERT INTO `tbl_migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1485264495),
('m130524_201442_init', 1485264502),
('m140506_102106_rbac_init', 1499080686),
('m170720_120318_id_int2string', 1500580231),
('m170720_195307_id_int2string_2nd', 1500580427),
('m170720_195726_foreignKeys', 1500601634);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pathway`
--

CREATE TABLE IF NOT EXISTS `tbl_pathway` (
  `pathwayId` varchar(21) NOT NULL DEFAULT '',
  `studentId` varchar(21) DEFAULT NULL,
  `courseId` varchar(21) DEFAULT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`pathwayId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payments`
--

CREATE TABLE IF NOT EXISTS `tbl_payments` (
  `paymentId` varchar(21) NOT NULL DEFAULT '',
  `studentId` varchar(21) DEFAULT NULL,
  `courseEnrollId` varchar(21) NOT NULL,
  `cost` float NOT NULL,
  `discount` float NOT NULL DEFAULT '0',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `dueDate` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'PEN',
  PRIMARY KEY (`paymentId`),
  KEY `idx-payments-studentId` (`studentId`),
  KEY `idx-payments-courseEnroll` (`courseEnrollId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_rating`
--

CREATE TABLE IF NOT EXISTS `tbl_rating` (
  `ratingId` varchar(21) NOT NULL DEFAULT '',
  `studentId` varchar(21) DEFAULT NULL,
  `schoolId` varchar(21) DEFAULT NULL,
  `courseId` varchar(21) DEFAULT NULL,
  `instructorId` varchar(21) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`ratingId`),
  KEY `idx-rating-studentId` (`studentId`),
  KEY `idx-rating-schoolId` (`schoolId`),
  KEY `idx-rating-courseId` (`courseId`),
  KEY `idx-rating-instructorId` (`instructorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_referencetransaction`
--

CREATE TABLE IF NOT EXISTS `tbl_referencetransaction` (
  `referenceTransactionId` varchar(21) NOT NULL DEFAULT '',
  `relationshipId` varchar(21) DEFAULT NULL,
  `quantity` float NOT NULL,
  `cost` float NOT NULL,
  `discount` float NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`referenceTransactionId`),
  KEY `idx-referencetransaction-relationshipId` (`relationshipId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_relationship`
--

CREATE TABLE IF NOT EXISTS `tbl_relationship` (
  `relationshipId` varchar(21) NOT NULL DEFAULT '',
  `actionReferenceId` varchar(21) DEFAULT NULL,
  `referenceId` varchar(21) DEFAULT NULL,
  `courseId` varchar(21) DEFAULT NULL,
  `studentId` varchar(21) DEFAULT NULL,
  `schoolId` varchar(21) DEFAULT NULL,
  `locationId` varchar(21) DEFAULT NULL,
  `transactionId` varchar(21) DEFAULT NULL,
  `date` int(11) NOT NULL,
  PRIMARY KEY (`relationshipId`),
  KEY `idx-relationship-referenceId` (`referenceId`),
  KEY `idx-relationship-courseId` (`courseId`),
  KEY `idx-relationship-studentId` (`studentId`),
  KEY `idx-relationship-schoolId` (`schoolId`),
  KEY `idx-relationship-locationId` (`locationId`),
  KEY `idx-relationship-transactionId` (`transactionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_school`
--

CREATE TABLE IF NOT EXISTS `tbl_school` (
  `schoolId` varchar(21) NOT NULL DEFAULT '',
  `userId` varchar(21) NOT NULL,
  `locationId` varchar(21) DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `about` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `abn` varchar(15) NOT NULL,
  `cricos` varchar(15) NOT NULL,
  `yearEstablised` int(4) NOT NULL,
  `rating` int(11) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`schoolId`),
  UNIQUE KEY `cricos` (`cricos`),
  UNIQUE KEY `abn` (`abn`),
  KEY `idx-school-userId` (`userId`),
  KEY `idx-school-locationId` (`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_school`
--

INSERT INTO `tbl_school` (`schoolId`, `userId`, `locationId`, `name`, `about`, `description`, `abn`, `cricos`, `yearEstablised`, `rating`, `status`, `created_at`, `updated_at`) VALUES
('tB2QzNW4dLlCOKHs8kDYk', 'YXoy68TRZLxpiw0MYyOPA', 'ofc3IIJqwvGBZprTPoQRA', 'Browns', 'The Browns University is ficcional (I think)', 'The university has a rugby team that dresses all in blue with a white maple leaf!', '', '', 1983, 0, 'ACT', 1485268346, 1485268346),
('tENDkwBqQAjcXTqCAqxlt', 'xOLtUcfGaq2IaxPKywCKE', NULL, 'Yale University', '', '', '53 004 085 616', '12345000112233', 0, 0, 'ACT', 1500645353, 1500645353);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schoolawards`
--

CREATE TABLE IF NOT EXISTS `tbl_schoolawards` (
  `schoolAwardsId` varchar(21) NOT NULL DEFAULT '',
  `schoolId` varchar(21) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`schoolAwardsId`),
  KEY `idx-schoolawards-schoolId` (`schoolId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schoolcampi`
--

CREATE TABLE IF NOT EXISTS `tbl_schoolcampi` (
  `schoolCampiId` varchar(21) NOT NULL DEFAULT '',
  `schoolId` varchar(21) DEFAULT NULL,
  `locationId` varchar(21) DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`schoolCampiId`),
  KEY `idx-schoolcampi-schoolId` (`schoolId`),
  KEY `idx-schoolcampi-locationId` (`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schoolfeatures`
--

CREATE TABLE IF NOT EXISTS `tbl_schoolfeatures` (
  `schoolFeaturesId` varchar(21) NOT NULL DEFAULT '',
  `schoolId` varchar(21) DEFAULT NULL,
  `schoolCampiId` varchar(21) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  `value` varchar(80) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`schoolFeaturesId`),
  KEY `idx-schoolfeatures-schoolId` (`schoolId`),
  KEY `idx-schoolfeatures-schoolCampiId` (`schoolCampiId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_schoolinstructor`
--

CREATE TABLE IF NOT EXISTS `tbl_schoolinstructor` (
  `schoolInstructorId` varchar(21) NOT NULL DEFAULT '',
  `schoolId` varchar(21) DEFAULT NULL,
  `instructorId` varchar(21) DEFAULT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`schoolInstructorId`),
  KEY `idx-schoolinstructor-schoolId` (`schoolId`),
  KEY `idx-schoolinstructor-instructorId` (`instructorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_schoolinstructor`
--

INSERT INTO `tbl_schoolinstructor` (`schoolInstructorId`, `schoolId`, `instructorId`, `status`) VALUES
('VH4ly9fuJrybGlgTVdL30', 'tB2QzNW4dLlCOKHs8kDYk', 'BKbRld9sACFsYpH3tBj4O', 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_setting`
--

CREATE TABLE IF NOT EXISTS `tbl_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meta_key` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `meta_name` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `meta_type` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `meta_desc` text CHARACTER SET latin1,
  `meta_attribute` text CHARACTER SET latin1,
  `meta_value` longtext CHARACTER SET latin1,
  `is_public` tinyint(1) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx-setting` (`meta_key`,`meta_type`,`is_public`,`status`,`created_at`,`updated_at`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tbl_setting`
--

INSERT INTO `tbl_setting` (`id`, `meta_key`, `meta_name`, `meta_type`, `meta_desc`, `meta_attribute`, `meta_value`, `is_public`, `status`, `created_at`, `updated_at`) VALUES
(1, 'timezone', 'Timezone', 'select', 'Set the time zone of the application', '{"list":[{"value":"Australia/Adelaide","label":"Australia/Adelaide"},{"value":"Australia/Brisbane","label":"Australia/Brisbane"},{"value":"Australia/Canberra","label":"Australia/Canberra"},{"value":"Australia/Hobart","label":"Australia/Hobart"},{"value":"Australia/Melbourne","label":"Australia/Melbourne"},{"value":"Australia/Perth","label":"Australia/Perth"},{"value":"Australia/Sydney","label":"Australia/Sydney"}]}', 'Australia/Melbourne', 1, 1, '2017-09-15 14:25:07', '2017-09-15 14:25:07'),
(2, 'test_setting1', 'Test Setting1', 'number', 'Test Setting Description', '', '15', 1, 1, '2017-09-15 14:25:07', '2017-09-15 14:25:07'),
(3, 'test_setting2', 'Test Setting2', 'text', 'Test Setting Description', '', 'value', 1, 1, '2017-09-15 14:25:07', '2017-09-15 14:25:07');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student`
--

CREATE TABLE IF NOT EXISTS `tbl_student` (
  `studentId` varchar(21) NOT NULL DEFAULT '',
  `userId` varchar(21) DEFAULT NULL,
  `name` varchar(80) NOT NULL,
  `birthday` int(11) NOT NULL DEFAULT '0',
  `phone` varchar(21) NOT NULL,
  `emergencyPhone` varchar(21) NOT NULL,
  `locationId` varchar(21) DEFAULT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`studentId`),
  KEY `idx-student-userId` (`userId`),
  KEY `idx-student-locationId` (`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`studentId`, `userId`, `name`, `birthday`, `phone`, `emergencyPhone`, `locationId`, `status`) VALUES
('7sB7UtHBUMFDyt0XnrML9', 'swD7NQDa2UDKhvtAdfP12', 'Bruno Student Scholz', 140000000, '', '', NULL, 'ACT'),
('YRsFnq2oKG7ubK0vrUp9U', 'gaS0Xd4iEhLAmbSGSpnxE', 'Bruno Scholz', 0, '4130190041', '4133212233', 'Lyzwv6U0VPEqz2SVRkVKu', 'ACT');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE IF NOT EXISTS `tbl_transaction` (
  `transactionId` varchar(21) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL,
  `senderId` varchar(21) DEFAULT NULL,
  `senderPublicKey` varchar(64) NOT NULL,
  `recipientId` varchar(21) DEFAULT NULL,
  `amount` bigint(20) NOT NULL,
  `fee` bigint(20) NOT NULL,
  `timestamp` int(11) NOT NULL,
  PRIMARY KEY (`transactionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `userId` varchar(21) NOT NULL,
  `username` varchar(200) DEFAULT NULL,
  `auth_key` varchar(255) DEFAULT NULL,
  `access_token_expired_at` timestamp NULL DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `unconfirmed_email` varchar(255) DEFAULT NULL,
  `confirmed_at` timestamp NULL DEFAULT NULL,
  `registration_ip` varchar(20) DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `last_login_ip` varchar(20) DEFAULT NULL,
  `blocked_at` timestamp NULL DEFAULT NULL,
  `status` varchar(3) DEFAULT 'ACT',
  `role` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  KEY `idx-user` (`username`,`auth_key`,`password_hash`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`userId`, `username`, `auth_key`, `access_token_expired_at`, `password_hash`, `password_reset_token`, `email`, `unconfirmed_email`, `confirmed_at`, `registration_ip`, `last_login_at`, `last_login_ip`, `blocked_at`, `status`, `role`, `created_at`, `updated_at`) VALUES
('gaS0Xd4iEhLAmbSGSpnxE', 'one', 'iEWa-n7uV-j5s0r_dKOn8KzAIRc8fXyX', NULL, '$2y$13$mmfDo6pVYq4OEyB4bjSo8.GI97EeF2xNRREdoOOCf5LPZD4013roe', NULL, 'one@one.com', 'one@one.com', NULL, '127.0.0.1', NULL, NULL, NULL, 'ACT', 10, '2017-10-11 18:35:43', '2017-10-11 18:35:43'),
('oYyzmGqYwMMbHowjT6TV2', 'admin', 'dVN8fzR_KzJ_lBrymfXI6qyH2QzyXYUU', '2017-11-10 00:28:11', '$2y$13$9Gouh1ZbewVEh4bQIGsifOs8/RWW/7RIs0CAGNd7tapXFm9.WxiXS', NULL, 'admin@demo.com', 'admin@demo.com', '2017-05-05 19:38:48', '127.0.0.1', '2017-11-08 22:28:11', '127.0.0.1', NULL, 'ACT', 99, '2017-05-05 19:38:03', '2017-11-09 00:28:10'),
('swD7NQDa2UDKhvtAdfP12', 'user', 'rNXSqIas_43RdpG0e5_7d1W06iK8pXJ8', '2017-12-06 20:21:05', '$2y$13$nd/F3g6jjIa1/Sk6JZxZ5uVq0OpsbOmW1OdnbDG6BpFqgkFbQotjm', NULL, 'user@demo.com', 'user@demo.com', '2017-06-03 03:12:16', '127.0.0.1', '2017-12-05 18:21:05', '127.0.0.1', NULL, 'ACT', 10, '2017-05-22 02:31:53', '2017-12-05 20:21:04'),
('v61HyKhVAAoT8V1ACbkDL', 'zero', 'pqNjPiUrOqFURjCKxWoz8nFhZDe9X04C', NULL, '$2y$13$m7HygABJM0iW3sDrAumbJeWyrsd5vVkGmWdRmepzhq/SWDULrDKUi', NULL, 'zero@one.com', 'zero@one.com', NULL, '127.0.0.1', NULL, NULL, NULL, 'ACT', 40, '2017-09-26 08:07:47', '2017-10-27 10:16:44'),
('xOLtUcfGaq2IaxPKywCKE', 'staff', 'Xm-zZRREtAIKsFlINVRLSw3U7llbx_5a', '2017-10-25 17:17:14', '$2y$13$TKh5pEy0RFTmkC9Kjvb9A.WR/I1QVzYHdfYDw0m7MnHnN0bsv96Jq', NULL, 'staff@demo.com', 'staff@demo.com', '2017-05-15 12:20:53', '127.0.0.1', '2017-10-24 15:17:14', '127.0.0.1', NULL, 'ACT', 50, '2017-05-15 12:19:02', '2017-10-24 17:17:13'),
('YXoy68TRZLxpiw0MYyOPA', 'brunoscholz', 'dVN8fzR_KzJ_lBrymfXI6qyH2QzyXYUU', '2017-10-26 22:48:36', '$2y$13$9Gouh1ZbewVEh4bQIGsifOs8/RWW/7RIs0CAGNd7tapXFm9.WxiXS', NULL, 'brunoscholz@yahoo.de', 'brunoscholz@yahoo.de', '2017-05-05 19:38:47', '127.0.0.1', '2017-10-25 20:48:36', '127.0.0.1', NULL, 'ACT', 50, '2017-09-22 13:26:22', '2017-10-27 10:16:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_video`
--

CREATE TABLE IF NOT EXISTS `tbl_video` (
  `videoId` varchar(21) NOT NULL DEFAULT '',
  `movie` varchar(255) NOT NULL,
  `length` float NOT NULL,
  `status` varchar(3) DEFAULT 'ACT',
  PRIMARY KEY (`videoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_auth_assignment`
--
ALTER TABLE `tbl_auth_assignment`
  ADD CONSTRAINT `tbl_auth_assignment_ibfk_1` FOREIGN KEY (`item_name`) REFERENCES `tbl_auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_auth_item`
--
ALTER TABLE `tbl_auth_item`
  ADD CONSTRAINT `tbl_auth_item_ibfk_1` FOREIGN KEY (`rule_name`) REFERENCES `tbl_auth_rule` (`name`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_auth_item_child`
--
ALTER TABLE `tbl_auth_item_child`
  ADD CONSTRAINT `tbl_auth_item_child_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `tbl_auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_auth_item_child_ibfk_2` FOREIGN KEY (`child`) REFERENCES `tbl_auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_block`
--
ALTER TABLE `tbl_block`
  ADD CONSTRAINT `fk-block-previousHash` FOREIGN KEY (`previousHash`) REFERENCES `tbl_block` (`hash`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD CONSTRAINT `fk-course-courseTypeId` FOREIGN KEY (`courseTypeId`) REFERENCES `tbl_coursetype` (`courseTypeId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-course-schoolCampiId` FOREIGN KEY (`schoolCampiId`) REFERENCES `tbl_schoolcampi` (`schoolCampiId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-course-schoolId` FOREIGN KEY (`schoolId`) REFERENCES `tbl_school` (`schoolId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_courseenroll`
--
ALTER TABLE `tbl_courseenroll`
  ADD CONSTRAINT `fk-courseenroll-courseId` FOREIGN KEY (`courseId`) REFERENCES `tbl_course` (`courseId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-courseenroll-studentId` FOREIGN KEY (`studentId`) REFERENCES `tbl_student` (`studentId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_coursefeatures`
--
ALTER TABLE `tbl_coursefeatures`
  ADD CONSTRAINT `fk-coursefeatures-courseId` FOREIGN KEY (`courseId`) REFERENCES `tbl_course` (`courseId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_courseinstructor`
--
ALTER TABLE `tbl_courseinstructor`
  ADD CONSTRAINT `fk-courseinstructor-courseId` FOREIGN KEY (`courseId`) REFERENCES `tbl_course` (`courseId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-courseinstructor-instructorId` FOREIGN KEY (`instructorId`) REFERENCES `tbl_instructor` (`instructorId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_coursesection`
--
ALTER TABLE `tbl_coursesection`
  ADD CONSTRAINT `fk-coursesection-courseId` FOREIGN KEY (`courseId`) REFERENCES `tbl_course` (`courseId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_coursesectionitem`
--
ALTER TABLE `tbl_coursesectionitem`
  ADD CONSTRAINT `fk-coursesectionitem-courseSectionId` FOREIGN KEY (`courseSectionId`) REFERENCES `tbl_coursesection` (`courseSectionId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_coursesectionresource`
--
ALTER TABLE `tbl_coursesectionresource`
  ADD CONSTRAINT `fk-coursesectionresource-courseSectionId` FOREIGN KEY (`courseSectionId`) REFERENCES `tbl_coursesection` (`courseSectionId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_instructor`
--
ALTER TABLE `tbl_instructor`
  ADD CONSTRAINT `fk-instructor-userId` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`);

--
-- Constraints for table `tbl_location`
--
ALTER TABLE `tbl_location`
  ADD CONSTRAINT `fk-location-geographyId` FOREIGN KEY (`geographyId`) REFERENCES `tbl_geography` (`geographyId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_media`
--
ALTER TABLE `tbl_media`
  ADD CONSTRAINT `fk-media-courseId` FOREIGN KEY (`courseId`) REFERENCES `tbl_course` (`courseId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-media-geographyId` FOREIGN KEY (`geographyId`) REFERENCES `tbl_geography` (`geographyId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-media-imageId` FOREIGN KEY (`imageId`) REFERENCES `tbl_image` (`imageId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-media-instructorId` FOREIGN KEY (`instructorId`) REFERENCES `tbl_instructor` (`instructorId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-media-schoolId` FOREIGN KEY (`schoolId`) REFERENCES `tbl_school` (`schoolId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-media-studentId` FOREIGN KEY (`studentId`) REFERENCES `tbl_student` (`studentId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-media-userId` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`),
  ADD CONSTRAINT `fk-media-videoId` FOREIGN KEY (`videoId`) REFERENCES `tbl_video` (`videoId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  ADD CONSTRAINT `fk-payments-courseEnroll` FOREIGN KEY (`courseEnrollId`) REFERENCES `tbl_courseenroll` (`courseEnrollId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-payments-studentId` FOREIGN KEY (`studentId`) REFERENCES `tbl_student` (`studentId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_rating`
--
ALTER TABLE `tbl_rating`
  ADD CONSTRAINT `fk-rating-courseId` FOREIGN KEY (`courseId`) REFERENCES `tbl_course` (`courseId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-rating-instructorId` FOREIGN KEY (`instructorId`) REFERENCES `tbl_instructor` (`instructorId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-rating-schoolId` FOREIGN KEY (`schoolId`) REFERENCES `tbl_school` (`schoolId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-rating-studentId` FOREIGN KEY (`studentId`) REFERENCES `tbl_student` (`studentId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_referencetransaction`
--
ALTER TABLE `tbl_referencetransaction`
  ADD CONSTRAINT `fk-referencetransaction-relationshipId` FOREIGN KEY (`relationshipId`) REFERENCES `tbl_relationship` (`relationshipId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_relationship`
--
ALTER TABLE `tbl_relationship`
  ADD CONSTRAINT `fk-relationship-courseId` FOREIGN KEY (`courseId`) REFERENCES `tbl_course` (`courseId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-relationship-locationId` FOREIGN KEY (`locationId`) REFERENCES `tbl_location` (`locationId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-relationship-referenceId` FOREIGN KEY (`referenceId`) REFERENCES `tbl_referencetransaction` (`referenceTransactionId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-relationship-schoolId` FOREIGN KEY (`schoolId`) REFERENCES `tbl_school` (`schoolId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-relationship-studentId` FOREIGN KEY (`studentId`) REFERENCES `tbl_student` (`studentId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-relationship-transactionId` FOREIGN KEY (`transactionId`) REFERENCES `tbl_transaction` (`transactionId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_school`
--
ALTER TABLE `tbl_school`
  ADD CONSTRAINT `fk-school-locationId` FOREIGN KEY (`locationId`) REFERENCES `tbl_location` (`locationId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-school-userId` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`);

--
-- Constraints for table `tbl_schoolawards`
--
ALTER TABLE `tbl_schoolawards`
  ADD CONSTRAINT `fk-schoolawards-schoolId` FOREIGN KEY (`schoolId`) REFERENCES `tbl_school` (`schoolId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_schoolcampi`
--
ALTER TABLE `tbl_schoolcampi`
  ADD CONSTRAINT `fk-schoolcampi-locationId` FOREIGN KEY (`locationId`) REFERENCES `tbl_location` (`locationId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-schoolcampi-schoolId` FOREIGN KEY (`schoolId`) REFERENCES `tbl_school` (`schoolId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_schoolfeatures`
--
ALTER TABLE `tbl_schoolfeatures`
  ADD CONSTRAINT `fk-schoolfeatures-schoolCampiId` FOREIGN KEY (`schoolCampiId`) REFERENCES `tbl_schoolcampi` (`schoolCampiId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-schoolfeatures-schoolId` FOREIGN KEY (`schoolId`) REFERENCES `tbl_school` (`schoolId`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_schoolinstructor`
--
ALTER TABLE `tbl_schoolinstructor`
  ADD CONSTRAINT `fk-schoolinstructor-instructorId` FOREIGN KEY (`instructorId`) REFERENCES `tbl_instructor` (`instructorId`),
  ADD CONSTRAINT `fk-schoolinstructor-schoolId` FOREIGN KEY (`schoolId`) REFERENCES `tbl_school` (`schoolId`);

--
-- Constraints for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD CONSTRAINT `fk-student-locationId` FOREIGN KEY (`locationId`) REFERENCES `tbl_location` (`locationId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk-student-userId` FOREIGN KEY (`userId`) REFERENCES `tbl_user` (`userId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
