-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 23, 2022 at 03:30 PM
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
  `parent_id` int(9) DEFAULT NULL,
  `body` varchar(500) NOT NULL,
  `date` datetime NOT NULL,
  `is_approved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `post_id`, `parent_id`, `body`, `date`, `is_approved`) VALUES
(1, 1, 1, 0, 'This is a super cute dog!', '2022-02-08 11:08:55', 1),
(2, 2, 1, 0, 'Yeah, I know she is. Thanks Justin!!', '2022-02-09 11:08:55', 1),
(3, 2, 3, NULL, 'This is the third comment', '2022-02-16 13:26:48', 1),
(4, 1, 4, NULL, 'Just a comment for vote testing ', '2022-02-16 21:55:41', 1),
(5, 1, 1, NULL, 'More testing', '2022-02-16 21:59:19', 1),
(6, 2, 5, NULL, 'This is on black dog 2', '2022-02-16 21:59:42', 1),
(7, 2, 5, NULL, 'This is my second comment on black dog 2', '2022-02-16 22:00:10', 1),
(42, 14, 6, 0, 'Someone needs to comment on this! I thinks its SO cool!.', '2022-02-21 20:22:45', 1),
(45, 14, 3, 0, 'No its not Ginny! youre first!', '2022-02-21 20:32:20', 1),
(46, 14, 6, 0, 'aswdfasdfad', '2022-02-22 14:14:32', 1),
(47, 14, 6, 0, 'My name is testman and I just keep commenting on everything!!!', '2022-02-22 20:28:38', 1),
(48, 14, 3, 0, 'This is just another test.', '2022-02-22 21:15:04', 1);

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

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`post_id`, `user_id`, `date`) VALUES
(1, 14, '2022-02-21 17:51:35'),
(3, 14, '2022-02-21 17:51:35');

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
  `votes` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `allow_comments` tinyint(1) NOT NULL,
  `is_published` tinyint(1) NOT NULL,
  `is_winner` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `title`, `image`, `body`, `views`, `votes`, `date`, `user_id`, `allow_comments`, `is_published`, `is_winner`) VALUES
(1, 'Black Dog', 'https://picsum.photos/id/237/600/600', 'This is my dog! How cute right? Comments are allowed and its published. ', 0, 0, '2022-02-17 17:26:00', 2, 1, 1, 0),
(2, 'These are som e mountains  that I like', 'https://picsum.photos/seed/picsum/600/600', 'These are the mountains. And no, you can not comment on it. ', 0, 0, '2022-02-17 17:26:00', 1, 0, 1, 1),
(3, 'a new post', 'https://picsum.photos/600/600', 'This is a beautiful picture that my stepdads moms great aunts cousins husbands sister took. ', 0, 0, '2022-02-17 17:26:00', 14, 1, 1, 1),
(4, 'This posted yesterday', 'https://picsum.photos/600', 'Look at this picture. You should only be able to see it if you arent looking at todays memes though. ', 0, 0, '2022-02-18 17:26:00', 1, 1, 1, 0),
(5, 'Black Dog again', 'https://picsum.photos/id/237/600/600', 'This is my dog! How cute right? Comments are allowed and its published. ', 0, 0, '2022-02-16 17:26:00', 14, 1, 1, 0),
(6, 'Posted by testman', 'https://picsum.photos/600/600', 'I think posting on memeger just might be my favorite thing ever. Dont  you guys just love seeing all these dank memes?', 0, 0, '2022-02-21 20:48:05', 14, 1, 1, 0);

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
  `is_admin` tinyint(1) NOT NULL,
  `access_token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password`, `profile_pic`, `bio`, `join_date`, `last_login`, `is_admin`, `access_token`) VALUES
(1, 'jpwallace22@gmail.com', 'Justin', '123456', 'https://randomuser.me/api/portraits/men/99.jpg', 'Big bearded men you make the rockin world go round. ', '2022-02-09 11:00:19', NULL, 1, ''),
(2, 'ginny@gmail.com', 'ginnygofast', 'password', 'https://randomuser.me/api/portraits/women/26.jpg', 'I\'m Ginny, and I go fast. ', '2022-02-09 11:00:19', NULL, 0, ''),
(3, 'zach@gmail.com', 'zachauvil', '$2y$10$jwFR0k.rgefACsz/rPpUVODYhO7rFS4EB.pfR8Db3HCwmnplC26SW', '/frontend/src/assets/images/avatars/zachauvil.png', '', '2022-02-18 17:17:31', '2022-02-18 17:17:31', 0, ''),
(13, 'lauren@email.com', 'LauenLooLoo', '$2y$10$hT1tA6FjbG0FCjRFctury.TRdH2kgDnZ0AWzKRV4z2zIjSfHh8Jk6', '/frontend/src/assets/images/avatars/LauenLooLoo.png', '', '2022-02-19 10:24:06', '2022-02-19 10:24:06', 0, ''),
(14, 'test@test.com', 'testman', '$2y$10$99NsVnsGOrMZifUKfLC5deu5ZTm8G8KDaxq4fUOE5l01XoeJ/kbsu', '/frontend/src/assets/images/avatars/testman.png', '', '2022-02-19 11:49:02', '2022-02-22 21:08:59', 0, '85c20cd9bd5903d955b90060a169b3f322c65be557e389e76607fccbbc93'),
(15, 'john@example.com', 'johnman', '$2y$10$MVdIeWzXbDqAxTQK2H67duVc6NqP6z1dKAKwJHcYFMNQXNm0TdZkW', '/frontend/src/assets/images/avatars/johnman.png', '', '2022-02-19 12:27:00', '2022-02-19 12:27:00', 0, ''),
(16, 'javajack@email.com', 'javajack', '$2y$10$WyqGk7UV4TfDJ9qg7NylBOBdiC5IbFfQH8et/98Pgkj8zPsock.n2', '/frontend/src/assets/images/avatars/javajack.png', '', '2022-02-22 19:37:42', '2022-02-22 19:37:54', 0, '');

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
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`user_id`, `post_id`, `date`) VALUES
(1, 1, '2022-02-16 13:01:57'),
(2, 1, '2022-02-16 13:01:57'),
(2, 3, '2022-02-16 21:49:56'),
(2, 2, '2022-02-16 21:49:56'),
(3, 1, '2022-02-16 21:50:15'),
(2, 3, '2022-02-16 21:50:15'),
(1, 4, '2022-02-16 21:54:25'),
(2, 4, '2022-02-16 21:54:25'),
(2, 5, '2022-02-16 22:01:11'),
(1, 3, '2022-02-17 20:00:52'),
(2, 3, '2022-02-17 20:00:52'),
(3, 3, '2022-02-17 20:01:43'),
(4, 3, '2022-02-17 20:01:43');

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
  MODIFY `comment_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
