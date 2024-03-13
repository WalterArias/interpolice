-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 13, 2024 at 02:45 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interpolice`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int NOT NULL,
  `description` varchar(150) NOT NULL,
  `date` date NOT NULL,
  `note` varchar(250) NOT NULL,
  `id_people` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `lastname` varchar(150) NOT NULL,
  `nickname` varchar(150) DEFAULT NULL,
  `photo` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `type` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`id`, `name`, `lastname`, `nickname`, `photo`, `email`, `type`) VALUES
(9, 'Loraine', 'Tumayan', 'Brown brocket', '', 'ltumayan8@wordpress.com', 3),
(10, 'Delora', 'Tremmel', 'Echidna, short-beaked', '', 'dtremmel9@netlog.com', 3),
(12, 'Clerc', 'Elegood', 'American alligator', '', 'celegoodb@lycos.com', 1),
(13, 'luisa', 'lopez', 'carelogin', '', 'juani@elpais.com', 2),
(14, 'Kennith', 'Hodgins', 'Puna ibis', '', 'khodginsd@wisc.edu', 4),
(15, 'Rock', 'Heinecke', 'Admiral, indian red', '', 'rheineckee@globo.com', 3),
(17, 'Eli', 'Hatrey', 'Baboon, savanna', '', 'ehatreyg@washington.edu', 4),
(18, 'Maryl', 'Vivien', 'Marten, american', '', 'mvivienh@dell.com', 3),
(19, 'Mady', 'Lissimore', 'Violet-eared waxbill', '', 'mlissimorei@weebly.com', 4),
(20, 'Nefen', 'Gatty', 'Grizzly bear', '', 'ngattyj@hibu.com', 3),
(21, 'Josephina', 'Melin', 'Yellow-rumped siskin', '', 'jmelink@goo.gl', 3),
(22, 'Dov', 'Durn', 'Rat, desert kangaroo', '', 'ddurnl@alexa.com', 4),
(23, 'Evelina', 'Arne', 'Cardinal, black-throated', '', 'earnem@spiegel.de', 3),
(24, 'Dale', 'Eads', 'Antelope, roan', '', 'deadsn@census.gov', 4),
(25, 'Selestina', 'Mulqueen', 'Worm snake (unidentified)', '', 'smulqueeno@theglobeandmail.com', 1),
(26, 'narva', 'narvaez', 'narvalin', 'pe-1709051948480-barco.png', 'killer@gmail.com', 2),
(27, 'master', 'mas', 'Police', 'foto.png', 'billy123@gmail.com', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `lastname` varchar(180) NOT NULL,
  `position` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(250) NOT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `position`, `email`, `password`, `photo`, `hora`) VALUES
(7, 'billy', 'Jones', 'Police', 'billyj@gmail.com', '$2b$10$OmNBhh1ubkhH.wU6tWFEl.vhG9aRb89MziJn2cBhIeph58wxpJfdy', NULL, '00:00:00'),
(8, 'billy', 'Jones', 'Police', 'billy@gmail.com', '$2b$10$GhDiQy.S2Vydu0M2YqJYfemisjLCkyLfvyFPlTWqSlzacUBSuR.W6', NULL, '00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_people` (`id_people`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`id_people`) REFERENCES `people` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
