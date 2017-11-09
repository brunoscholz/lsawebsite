-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2017 at 11:13 AM
-- Server version: 5.6.17-log
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
  `updated_at` timestamp NULL,
  PRIMARY KEY (`userId`),
  KEY `idx-user` (`username`,`auth_key`,`password_hash`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`userId`, `username`, `auth_key`, `access_token_expired_at`, `password_hash`, `password_reset_token`, `email`, `unconfirmed_email`, `confirmed_at`, `registration_ip`, `last_login_at`, `last_login_ip`, `blocked_at`, `status`, `role`, `created_at`, `updated_at`) VALUES
('gaS0Xd4iEhLAmbSGSpnxE', 'one', 'iEWa-n7uV-j5s0r_dKOn8KzAIRc8fXyX', NULL, '$2y$13$mmfDo6pVYq4OEyB4bjSo8.GI97EeF2xNRREdoOOCf5LPZD4013roe', NULL, 'one@one.com', 'one@one.com', NULL, '127.0.0.1', NULL, NULL, NULL, 'ACT', 10, '2017-10-11 18:35:43', '2017-10-11 18:35:43'),
('oYyzmGqYwMMbHowjT6TV2', 'admin', 'dVN8fzR_KzJ_lBrymfXI6qyH2QzyXYUU', '2017-11-07 13:06:34', '$2y$13$9Gouh1ZbewVEh4bQIGsifOs8/RWW/7RIs0CAGNd7tapXFm9.WxiXS', NULL, 'admin@demo.com', 'admin@demo.com', '2017-05-05 19:38:48', '127.0.0.1', '2017-11-06 11:06:34', '127.0.0.1', NULL, 'ACT', 99, '2017-05-05 19:38:03', '2017-11-06 13:06:33'),
('swD7NQDa2UDKhvtAdfP12', 'user', 'rNXSqIas_43RdpG0e5_7d1W06iK8pXJ8', '2017-06-04 03:13:02', '$2y$13$nd/F3g6jjIa1/Sk6JZxZ5uVq0OpsbOmW1OdnbDG6BpFqgkFbQotjm', NULL, 'user@demo.com', 'user@demo.com', '2017-06-03 03:12:16', '127.0.0.1', '2017-06-03 03:13:02', '127.0.0.1', NULL, 'ACT', 10, '2017-05-22 02:31:53', '2017-09-22 13:26:49'),
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
