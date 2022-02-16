-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 16, 2022 at 08:50 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `memeger`
--
CREATE DATABASE IF NOT EXISTS `memeger` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `memeger`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` mediumint(9) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'Dogs'),
(2, 'Nature');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `comment_id` int(9) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `post_id` int(11) NOT NULL,
  `parent_id` int(9) NOT NULL,
  `body` varchar(500) NOT NULL,
  `date` datetime NOT NULL,
  `is_approved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `post_id`, `parent_id`, `body`, `date`, `is_approved`) VALUES
(1, 1, 1, 0, 'This is a super cute dog!', '2022-02-09 11:08:55', 1),
(2, 2, 1, 0, 'Yeah, I know she is. Thanks Justin!!', '2022-02-09 11:08:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `post_id` int(11) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `body` varchar(2000) NOT NULL,
  `views` mediumint(9) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `allow_comments` tinyint(1) NOT NULL,
  `is_published` tinyint(1) NOT NULL,
  `is_winner` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `title`, `image`, `body`, `views`, `date`, `user_id`, `allow_comments`, `is_published`, `is_winner`) VALUES
(1, 'Black Dog', 'https://picsum.photos/id/237/600/600', 'This is my dog! How cute right? Comments are allowed and its published. ', 0, '2022-02-16 17:26:00', 2, 1, 1, 0),
(2, 'These are som e mountains  that I like', 'https://picsum.photos/seed/picsum/600/600', 'These are the mountains. And no, you can not comment on it. ', 0, '2022-02-16 17:26:00', 1, 0, 1, 0),
(3, 'a new post', 'https://picsum.photos/600/600', 'This is a beautiful picture that my stepdads moms great aunts cousins husbands sister took. ', 0, '2022-02-16 17:26:00', 2, 1, 1, 0),
(4, 'This posted yesterday', 'https://picsum.photos/600', 'Look at this picture. You should only be able to see it if you arent looking at todays memes though. ', 0, '2022-02-14 17:26:00', 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `tag_id` mediumint(9) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `name`) VALUES
(1, 'fast'),
(2, 'bigbeards');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` mediumint(9) NOT NULL,
  `email` varchar(320) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_pic` varchar(150) NOT NULL,
  `bio` varchar(150) DEFAULT NULL,
  `join_date` datetime NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password`, `profile_pic`, `bio`, `join_date`, `last_login`, `is_admin`) VALUES
(1, 'jpwallace22@gmail.com', 'Justin', '123456', 'https://randomuser.me/api/portraits/men/99.jpg', 'Big bearded men you make the rockin world go round. ', '2022-02-09 11:00:19', NULL, 1),
(2, 'ginny@gmail.com', 'ginnygofast', 'password', 'https://randomuser.me/api/portraits/women/26.jpg', 'I\'m Ginny, and I go fast. ', '2022-02-09 11:00:19', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
CREATE TABLE `votes` (
  `user_id` mediumint(9) NOT NULL,
  `post_id` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `posts_ibfk_1` (`user_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
