-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Animaux'),(1,'Drôle'),(3,'IT');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Posts_id` int NOT NULL,
  `Users_id` int NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`,`Posts_id`,`Users_id`),
  KEY `fk_Comments_Users1_idx` (`Users_id`),
  KEY `fk_Comments_Posts1_idx` (`Posts_id`),
  CONSTRAINT `fk_Comments_Posts1` FOREIGN KEY (`Posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_Comments_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,2,'2020-07-23 09:40:37','Ceci c\'est un commentaire de test'),(6,1,1,'2020-08-26 09:23:09','Me no entender'),(7,1,3,'2020-08-26 09:24:53','Spongebob Squarepants!');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Users_id` int NOT NULL,
  `Categories_id` int NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `image_url` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`,`Users_id`,`Categories_id`),
  KEY `fk_Posts_Categories_idx` (`Categories_id`),
  KEY `fk_Posts_Users1_idx` (`Users_id`),
  CONSTRAINT `fk_Posts_Categories` FOREIGN KEY (`Categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_Posts_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,2,'2020-07-23 10:35:01','Le meilleur ami de l’homme','https://images-cdn.9gag.com/photo/aAx8pWL_700b.jpg'),(2,2,1,'2020-07-24 09:37:01','Mon chat le ferait !','https://img-9gag-fun.9cache.com/photo/az9pe1b_700bwp.webp'),(3,2,1,'2020-07-23 09:35:01','DELETE TEST','https://img-9gag-fun.9cache.com/photo/aXYoB8d_700bwp.webp'),(4,1,2,'2020-07-26 07:35:01','TITLE TO BE MODIFIED','https://img-9gag-fun.9cache.com/photo/aeMqjmq_700bwp.webp'),(5,3,1,'2020-07-27 06:35:01','TOP LIKED POST','https://img-comment-fun.9cache.com/media/aG1bm35/am0XnRwP_700w_0.jpg');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Posts_id` int NOT NULL,
  `Users_id` int NOT NULL,
  `reaction` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`,`Posts_id`,`Users_id`),
  KEY `fk_Likes_Users1_idx` (`Users_id`),
  KEY `fk_Reactions_Posts1_idx` (`Posts_id`),
  CONSTRAINT `fk_Likes_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_Reactions_Posts1` FOREIGN KEY (`Posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (1,1,2,'like'),(2,2,1,'dislike'),(5,4,1,'like'),(6,4,2,'like'),(7,5,1,'like'),(8,5,2,'like'),(9,5,3,'like'),(12,3,2,'dislike');
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `firstName` varchar(45) COLLATE utf8_bin NOT NULL,
  `lastName` varchar(45) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(60) COLLATE utf8_bin NOT NULL,
  `photo_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `department` varchar(65) COLLATE utf8_bin DEFAULT NULL,
  `role` varchar(65) COLLATE utf8_bin DEFAULT NULL,
  `linkedin_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2020-03-05 11:32:07','Angela','GALINDO','a.galindo@groupomania.fr','$2b$10$nkBYDHxZjjWZCi9Tk59d0ujSOIGebPMxJqW4dCRW7P6Id78saPYhq','https://files.virgool.io/upload/users/127995/posts/pbxripaxe0hd/stviq4afzoq6.jpeg','Resources Humaines','Chargée du Comité d\'Entreprise','https://www.linkedin.com/'),(2,'2020-03-07 10:55:15','Jean','DUPONT','j.dupont@groupomania.fr','$2b$10$JwV1iRlA4H9pclDIJvY6O.bZcOX5H46RgkUtgW2HrnPKA7zpFx/kC','https://gbpoultryblog.files.wordpress.com/2017/06/random-guy.jpg','Gestion de la Relation Client','Chargé de l\'implementation de SalesForce','https://www.linkedin.com/jeandupont'),(3,'2020-07-07 05:55:15','Sheshuang','XIE','s.xie@groupomania.fr','123456','https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','IT','Developpeusse Web','https://www.linkedin.com/'),(4,'2020-07-30 15:40:05','Ricardo','GOMEZ','r.gomez@groupomania.fr','$2b$10$8ws.I0tNTYZklOAMX9Y5l.U4hHfjQf8Ut/EGMiAi69GznmxbUtgmK','https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png',NULL,NULL,NULL),(5,'2020-07-30 15:57:08','Laure','FESSART','l.fessart@groupomania.fr','$2b$10$Eg.U8OWm9cTcXIrawKhYVO5WGISa5ufAfmGVDue3Y4ZADxy6d3juy','https://gbpoultryblog.files.wordpress.com/2017/06/random-guy.jpg',NULL,NULL,NULL),(14,'2020-07-30 16:42:03','Alejandra','LOPEZ','a.lopez@groupomania.fr','$2b$10$TZNldrWiS3qv3m1q.qjQI.qPG3QdC2pwYKL4B.B72jN.JRD7S9oY2','https://gbpoultryblog.files.wordpress.com/2017/06/random-guy.jpg',NULL,NULL,NULL),(26,'2020-07-31 14:33:54','Jean-Marie','DE GAULE','j.degaule@grouporama.fr','$2b$10$nkBYDHxZjjWZCi9Tk59d0ujSOIGebPMxJqW4dCRW7P6Id78saPYhq','https://gbpoultryblog.files.wordpress.com/2017/06/random-guy.jpg','IT','Developpeur Front End','www.linkedin.com/'),(30,'2020-08-17 13:28:14','Jean-Marie','LA BOUFFE','j.labouffe@groupomania.fr','$2b$10$EloBvU5A5tbc6o7z0BXk.OVTI1EQMWukrGLhZ5TzKIY7j4Qpi3BDG','https://gbpoultryblog.files.wordpress.com/2017/06/random-guy.jpg',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-30 12:58:59
