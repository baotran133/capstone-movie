/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `cinema` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cineplexId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cinema_ibfk_1` (`cineplexId`),
  CONSTRAINT `cinema_ibfk_1` FOREIGN KEY (`cineplexId`) REFERENCES `cineplex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cinema_movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cinemaId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cinema_movie_ibfk_1` (`cinemaId`),
  KEY `cinema_movie_ibfk_2` (`movieId`),
  CONSTRAINT `cinema_movie_ibfk_1` FOREIGN KEY (`cinemaId`) REFERENCES `cinema` (`id`),
  CONSTRAINT `cinema_movie_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cineplex` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `time` int DEFAULT NULL,
  `evaluate` int DEFAULT NULL,
  `poster` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trailer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `showtimeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seat_ibfk_1` (`showtimeId`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`showtimeId`) REFERENCES `showtime` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `showtime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `startTime` datetime DEFAULT NULL,
  `cinemaId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `showtime_ibfk_1` (`cinemaId`),
  CONSTRAINT `showtime_ibfk_1` FOREIGN KEY (`cinemaId`) REFERENCES `cinema` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ticket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `movieId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_ibfk_1` (`userId`),
  KEY `ticket_ibfk_2` (`movieId`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` int DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13320000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(1, 'BHD Star Cineplex - 3/2', 'L5-Vincom 3/2, 3C ???????ng 3/2, Q.10', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 1);
INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(2, 'BHD Star Cineplex - Bitexco', 'L3-Bitexco Icon 68, 2 H???i Tri???u, Q.1', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 1);
INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(3, 'BHD Star Cineplex - Ph???m H??ng', 'L4-Satra Ph???m H??ng, C6/27 Ph???m H??ng, B??nh Ch??nh', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 1);
INSERT INTO `cinema` (`id`, `name`, `address`, `image`, `cineplexId`) VALUES
(4, 'BHD Star Cineplex - Vincom L?? V??n Vi???t', 'L4-Vincom Plaza, 50 L?? V??n Vi???t, Q.9', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 1),
(5, 'BHD Star Cineplex - Vincom Quang Trung', 'B1-Vincom QT, 190 Quang Trung, G?? V???p', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 1),
(6, 'CGV - Aeon B??nh T??n', 'T???ng 3, TTTM Aeon Mall B??nh T??n, S??? 1 ???????ng s??? 17A, khu ph??? 11, B??nh Tr??? ????ng B, B??nh T??n', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 2),
(7, 'CGV - Aeon T??n Ph??', '30 B??? Bao T??n Th???ng, S??n K???, T??n Ph??', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 2),
(8, 'CGV - CGV Saigonres Nguy???n X??', 'T???ng 4-5, Saigonres Plaza, 79/81 Nguy???n X??, P. 26, B??nh Th???nh', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 2),
(9, 'CGV - Crescent Mall', 'L???u 5, Crescent Mall, ?????i l??? Nguy???n V??n Linh, Ph?? M??? H??ng, Q. 7', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 2),
(10, 'CNS - Hai B?? Tr??ng', '135 Hai B?? Tr??ng, B???n Ngh??, Q.1[B???n ?????]', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 3),
(11, 'CNS - Qu???c Thanh', '271 Nguy???n Tr??i, Q.1', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 3),
(12, 'GLX - Hu???nh T???n Ph??t', '1362 Hu???nh T???n Ph??t, KP1, Ph?? M???, Q. 7', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 4),
(13, 'GLX - Kinh D????ng V????ng', '718bis Kinh D????ng V????ng, Q.6', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 4),
(14, 'GLX - Nguy???n Du', '116 Nguy???n Du, Q.1', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 4),
(15, 'GLX - Nguy???n V??n Qu??', '119B Nguy???n V??n Qu??, ????ng H??ng Thu???n, Q.12, TPHCM', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 4),
(16, 'GLX - Ph???m V??n Ch??', 'L???u 5, TTTM Platinum Plaza, 634 Ph???m V??n Ch??, Q.6', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 4),
(17, 'Lotte - Cantavil', 'L7-Cantavil Premier, Xa L??? H?? N???i, Q.2', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 5),
(18, 'Lotte - C???ng H??a', 'L4-Pico Plaza, 20 C???ng H??a, T??n B??nh', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 5),
(19, 'Lotte - Diamond', 'L13-Diamond Plaza, 34 L?? Du???n, Q.1', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 5),
(20, 'MegaGS - Cao Th???ng', '19 Cao Th???ng, Q.3', 'https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png', 6);

INSERT INTO `cinema_movie` (`id`, `cinemaId`, `movieId`) VALUES
(1, 1, 1);
INSERT INTO `cinema_movie` (`id`, `cinemaId`, `movieId`) VALUES
(2, 2, 2);
INSERT INTO `cinema_movie` (`id`, `cinemaId`, `movieId`) VALUES
(3, 3, 3);
INSERT INTO `cinema_movie` (`id`, `cinemaId`, `movieId`) VALUES
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 11, 8),
(9, 12, 9),
(10, 13, 10),
(11, 15, 12),
(12, 16, 13),
(13, 17, 1),
(14, 18, 12),
(15, 19, 13),
(16, 2, 4),
(17, 2, 5),
(18, 2, 6),
(19, 2, 7),
(20, 2, 8),
(21, 2, 9),
(22, 3, 1),
(23, 7, 2),
(24, 8, 3),
(25, 9, 4),
(26, 3, 5),
(27, 3, 6),
(28, 3, 7),
(29, 3, 8),
(30, 3, 9),
(31, 3, 10),
(32, 3, 12),
(33, 4, 4),
(34, 4, 5),
(35, 5, 1),
(36, 6, 1),
(37, 7, 1),
(38, 8, 1),
(39, 9, 1),
(40, 10, 1),
(41, NULL, NULL);

INSERT INTO `cineplex` (`id`, `name`, `logo`) VALUES
(1, 'BHD Star Cineplex', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png');
INSERT INTO `cineplex` (`id`, `name`, `logo`) VALUES
(2, 'cgv', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png');
INSERT INTO `cineplex` (`id`, `name`, `logo`) VALUES
(3, 'CineStar', 'https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png');
INSERT INTO `cineplex` (`id`, `name`, `logo`) VALUES
(4, 'Galaxy Cinema', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png'),
(5, 'Lotte Cinema', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png'),
(6, 'MegaGS', 'https://movienew.cybersoft.edu.vn/hinhanh/megags.png'),
(7, 'BHD Star Cineplex', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png'),
(8, 'cgv', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png'),
(9, 'CineStar', 'https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png'),
(10, 'Galaxy Cinema', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png'),
(11, 'Lotte Cinema', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png'),
(12, 'MegaGS', 'https://movienew.cybersoft.edu.vn/hinhanh/megags.png'),
(13, 'BHD Star Cineplex', 'https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png'),
(14, 'cgv', 'https://movienew.cybersoft.edu.vn/hinhanh/cgv.png'),
(15, 'CineStar', 'https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png'),
(16, 'Galaxy Cinema', 'https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png'),
(17, 'Lotte Cinema', 'https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png'),
(18, 'MegaGS', 'https://movienew.cybersoft.edu.vn/hinhanh/megags.png');

INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`, `trailer`) VALUES
(1, 'Toy Story', '1995-10-30', 81, 95, '/public/poster/1665088523700_lilia.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`, `trailer`) VALUES
(2, 'James Bond', '1995-10-30', 130, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`, `trailer`) VALUES
(3, 'Thor', '2020-10-01', 130, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg');
INSERT INTO `movie` (`id`, `name`, `startDate`, `time`, `evaluate`, `poster`, `trailer`) VALUES
(4, 'Balto', '1995-10-30', 78, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4'),
(5, 'Ace Ventura', '1995-10-30', 90, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4'),
(6, 'Chili Palmer', '1995-10-30', 105, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4'),
(7, 'Babe', '1995-10-30', 89, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4'),
(8, 'Mortal Kombat', '1995-10-30', 101, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4'),
(9, 'Pocahontas', '1995-10-30', 81, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4'),
(10, 'The Lawnmower Man', '1995-10-30', 92, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4'),
(12, 'Friday', '1995-10-30', 91, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4'),
(13, 'The Neverending Story', '1995-10-30', 95, 95, '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', '/rhIRbceoE9lR4veEXuwCC2wARtG.mp4');

INSERT INTO `seat` (`id`, `name`, `status`, `price`, `type`, `showtimeId`) VALUES
(1, 'Gh??? 49', 1, 80000, 'Th?????ng', 8);
INSERT INTO `seat` (`id`, `name`, `status`, `price`, `type`, `showtimeId`) VALUES
(2, 'Gh??? 100', 1, 100000, 'Vip', 12);
INSERT INTO `seat` (`id`, `name`, `status`, `price`, `type`, `showtimeId`) VALUES
(3, 'Gh??? 2', 1, 80000, 'Th?????ng', 1);
INSERT INTO `seat` (`id`, `name`, `status`, `price`, `type`, `showtimeId`) VALUES
(4, 'Gh??? 23', 1, 100000, 'Vip', 2),
(5, 'Gh??? 21', 1, 75000, 'Th?????ng', 3),
(6, 'Gh??? 24', 1, 200000, 'SWEETBOX', 4),
(7, 'Gh??? 25', 1, 75000, 'Th?????ng', 5),
(8, 'Gh??? 21', 1, 75000, 'Th?????ng', 6),
(9, 'Gh??? 2', 1, 75000, 'Th?????ng', 7),
(10, 'Gh??? 22', 1, 80000, 'Th?????ng', 8),
(11, 'Gh??? 21', 1, 80000, 'Th?????ng', 9),
(12, 'Gh??? 2', 1, 200000, 'Th?????ng', 10),
(13, 'Gh??? 24', 1, 80000, 'Th?????ng', 11),
(14, 'Gh??? 22', 1, 80000, 'Th?????ng', 12),
(15, 'Gh??? 2', 1, 80000, 'Th?????ng', 13),
(16, 'Gh??? 25', 1, 80000, 'Th?????ng', 14),
(17, 'Gh??? 27', 1, 80000, 'Th?????ng', 15),
(18, 'Gh??? 28', 1, 80000, 'Th?????ng', 16),
(19, 'Gh??? 31', 1, 80000, 'Th?????ng', 17),
(20, 'Gh??? 42', 1, 80000, 'Th?????ng', 1),
(21, 'Gh??? 11', 1, 80000, 'Th?????ng', 18),
(22, 'Gh??? 1', 1, 80000, 'Th?????ng', 19),
(23, 'Gh??? 7', 1, 80000, 'Th?????ng', 20),
(24, 'Gh??? 8', 1, 80000, 'Th?????ng', 21),
(25, 'Gh??? 32', 1, 80000, 'Th?????ng', 22),
(26, 'Gh??? 67', 1, 80000, 'Th?????ng', 23),
(27, 'Gh??? 45', 1, 80000, 'Th?????ng', 24),
(28, 'Gh??? 34', 1, 80000, 'Th?????ng', 25),
(29, 'Gh??? 2', 1, 80000, 'Th?????ng', 1),
(30, 'Gh??? 23', 1, 100000, 'Th?????ng', 2),
(31, 'Gh??? 21', 1, 75000, 'Th?????ng', 3),
(32, 'Gh??? 24', 1, 200000, 'SWEETBOX', 4),
(33, 'Gh??? 25', 1, 75000, 'Th?????ng', 5),
(34, 'Gh??? 21', 1, 75000, 'Th?????ng', 6),
(35, 'Gh??? 2', 1, 75000, 'Th?????ng', 7),
(36, 'Gh??? 22', 1, 80000, 'Th?????ng', 8),
(37, 'Gh??? 21', 1, 80000, 'Th?????ng', 9),
(38, 'Gh??? 2', 1, 200000, 'SWEETBOX', 10),
(39, 'Gh??? 24', 1, 80000, 'Th?????ng', 11),
(40, 'Gh??? 22', 1, 80000, 'Th?????ng', 12),
(41, 'Gh??? 2', 1, 80000, 'Th?????ng', 13),
(42, 'Gh??? 25', 1, 80000, 'Th?????ng', 14),
(43, 'Gh??? 27', 1, 80000, 'Th?????ng', 15),
(44, 'Gh??? 28', 1, 80000, 'Th?????ng', 16),
(45, 'Gh??? 31', 1, 80000, 'Th?????ng', 17),
(46, 'Gh??? 42', 1, 80000, 'Th?????ng', 1),
(47, 'Gh??? 11', 1, 80000, 'Th?????ng', 18),
(48, 'Gh??? 1', 1, 80000, 'Th?????ng', 19),
(49, 'Gh??? 7', 1, 80000, 'Th?????ng', 20),
(50, 'Gh??? 8', 1, 80000, 'Th?????ng', 21),
(51, 'Gh??? 32', 1, 80000, 'Th?????ng', 22),
(52, 'Gh??? 67', 1, 80000, 'Th?????ng', 23),
(53, 'Gh??? 45', 1, 80000, 'Th?????ng', 24),
(54, 'Gh??? 34', 1, 80000, 'Th?????ng', 25);

INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(1, '2020-12-07 14:00:00', 1);
INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(2, '2020-12-20 14:00:00', 1);
INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(3, '2020-12-11 14:00:00', 1);
INSERT INTO `showtime` (`id`, `startTime`, `cinemaId`) VALUES
(4, '2020-12-11 19:00:00', 2),
(5, '2020-12-11 20:00:00', 2),
(6, '2020-12-07 11:00:00', 3),
(7, '2020-09-07 14:00:00', 4),
(8, '2020-12-07 13:00:00', 5),
(9, '2020-12-07 18:00:00', 6),
(10, '2020-12-05 23:00:00', 7),
(11, '2020-12-03 22:00:00', 8),
(12, '2020-12-07 12:00:00', 9),
(13, '2020-12-02 14:00:00', 10),
(14, '2020-12-01 17:00:00', 11),
(15, '2020-12-06 21:00:00', 12),
(16, '2020-12-09 20:00:00', 13),
(17, '2020-12-22 09:00:00', 14),
(18, '2020-11-07 05:00:00', 15),
(19, '2020-04-07 03:00:00', 16),
(20, '2020-09-07 12:00:00', 17),
(21, '2020-12-17 10:00:00', 18),
(22, '2020-12-17 10:00:00', 19),
(23, '2020-12-17 10:00:00', 20),
(24, '2020-12-17 10:00:00', 18),
(25, '2020-12-17 10:00:00', 18);

INSERT INTO `ticket` (`id`, `userId`, `movieId`) VALUES
(1, 1, 5);
INSERT INTO `ticket` (`id`, `userId`, `movieId`) VALUES
(2, 1, 6);
INSERT INTO `ticket` (`id`, `userId`, `movieId`) VALUES
(3, 1, 7);
INSERT INTO `ticket` (`id`, `userId`, `movieId`) VALUES
(4, 1, 8),
(5, 1, 9),
(6, 1, 10),
(7, 1, 12),
(8, 1, 13),
(9, 2, 1),
(10, 2, 12),
(11, 2, 13),
(12, 2, 4),
(13, 2, 5),
(14, 2, 6),
(15, 2, 7),
(16, 2, 8),
(17, 2, 9),
(18, 3, 1),
(19, 7, 2),
(20, 8, 3),
(21, 9, 4),
(22, 3, 5),
(23, 3, 6),
(24, 3, 7),
(25, 3, 8),
(26, 3, 9),
(27, 3, 10),
(28, 3, 12),
(29, 4, 4),
(30, 4, 5),
(31, 5, 1),
(32, 6, 1),
(33, 7, 1),
(34, 8, 1),
(35, 9, 1),
(36, 10, 1),
(37, 1, 2),
(38, 1, 3),
(39, 1, 4);

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `password`, `role_id`) VALUES
(1, 'Tony', 'tony@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 1);
INSERT INTO `user` (`id`, `name`, `email`, `phone`, `password`, `role_id`) VALUES
(2, 'Steven', 'Steven@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2);
INSERT INTO `user` (`id`, `name`, `email`, `phone`, `password`, `role_id`) VALUES
(3, 'John', 'John@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2);
INSERT INTO `user` (`id`, `name`, `email`, `phone`, `password`, `role_id`) VALUES
(4, 'Rick', 'Rick@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2),
(5, 'Hamley', 'Hamley@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2),
(6, 'Peter', 'Peter@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2),
(7, 'Dr Strange', 'drstrange@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2),
(8, 'Jack', 'Jack@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2),
(9, 'Nick', 'Nick@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2),
(10, 'zwei', 'zwei@gmail.com', '12345678', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2),
(13319999, 'Bao', 'email22', '113', '$2b$10$LyjXq6uLLhTdD5w9.GCyce0mjjlxR61oyWaGy.kb.2kkcMmoBw9ji', 2);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;