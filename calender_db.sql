-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2023 at 05:30 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `calender_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `idCategory` int(11) NOT NULL,
  `categoryName` text NOT NULL,
  `categoryColor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`idCategory`, `categoryName`, `categoryColor`) VALUES
(1, 'General', '#795548'),
(2, 'Business', '#2196F3'),
(3, 'Technology', '#4CAF50'),
(4, 'Health', '#FFC107'),
(5, 'Education', '#9C27B0'),
(6, 'Sports', '#FF5722'),
(7, 'Entertainment', '#673AB7'),
(8, 'Food', '#FF9800'),
(9, 'Fashion', '#E91E63'),
(10, 'Travel', '#8BC34A'),
(11, 'Finance', '#00BCD4'),
(12, 'Art', '#3F51B5'),
(13, 'Environment', '#4CAF50');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `idEvent` int(11) NOT NULL,
  `eventTitle` text NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `idCategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`idEvent`, `eventTitle`, `startDate`, `endDate`, `idCategory`) VALUES
(1, 'genral event', '2023-02-19 08:49:00', '2023-02-19 09:50:00', 1),
(2, 'Business Conference', '2024-04-10 09:00:00', '2024-04-12 17:00:00', 2),
(3, 'Tech Expo', '2024-03-15 10:00:00', '2024-03-17 18:00:00', 3),
(4, 'Health Seminar', '2024-04-20 09:00:00', '2024-04-20 12:00:00', 4),
(5, 'Education Fair', '2024-03-01 10:00:00', '2024-03-03 17:00:00', 5),
(6, 'Sports Tournament', '2024-06-05 08:00:00', '2024-06-10 18:00:00', 6),
(7, 'Music Concert', '2024-04-15 19:00:00', '2024-04-17 23:00:00', 7),
(8, 'Food Festival', '2024-03-02 12:00:00', '2024-03-05 22:00:00', 8),
(9, 'Fashion Show', '2024-02-10 15:00:00', '2024-02-10 17:00:00', 9),
(10, 'Travel Expo', '2024-03-20 10:00:00', '2024-03-22 18:00:00', 10),
(11, 'Finance Workshop', '2024-03-05 09:00:00', '2024--05 16:00:00', 11),
(12, 'Art Exhibition', '2024-03-15 11:00:00', '2024-03-20 20:00:00', 12),
(13, 'Environmental Conference', '2025-04-10 08:30:00', '2025-04-12 17:00:00', 13);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idCategory`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`idEvent`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `idCategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `idEvent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
