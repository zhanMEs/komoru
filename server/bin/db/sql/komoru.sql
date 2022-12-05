-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1:3306
-- 產生時間： 2022 年 06 月 14 日 09:05
-- 伺服器版本： 8.0.29
-- PHP 版本： 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `komoru`
--

-- --------------------------------------------------------

--
-- 資料表結構 `ActivePack`
--

CREATE TABLE `ActivePack` (
  `active_pack_id` int NOT NULL,
  `city_id` int NOT NULL,
  `active_pack_type` enum('0','1','2','3','4') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:藝術家, 1:霸道總裁, 2:內向輔助, 3:能言善道, 4:冒險家'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `ActivePack`
--

INSERT INTO `ActivePack` (`active_pack_id`, `city_id`, `active_pack_type`) VALUES
(1, 1, '0'),
(2, 1, '1'),
(3, 1, '2'),
(4, 1, '3'),
(5, 1, '4'),
(6, 2, '0'),
(7, 2, '1'),
(8, 2, '2'),
(9, 2, '3'),
(10, 2, '4'),
(11, 3, '0'),
(12, 3, '1'),
(13, 3, '2'),
(14, 3, '3'),
(15, 3, '4'),
(16, 4, '0'),
(17, 4, '1'),
(18, 4, '2'),
(19, 4, '3'),
(20, 4, '4');

-- --------------------------------------------------------

--
-- 資料表結構 `ActivePackItem`
--

CREATE TABLE `ActivePackItem` (
  `active_pack_item_id` int NOT NULL,
  `active_pack_id` int NOT NULL,
  `partnership_id` int NOT NULL,
  `active_pack_item_title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `active_pack_item_content` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `active_pack_item_start_time` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `active_pack_item_end_time` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `City`
--

CREATE TABLE `City` (
  `city_id` int NOT NULL,
  `city_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `City`
--

INSERT INTO `City` (`city_id`, `city_name`) VALUES
(1, '台北市'),
(2, '台中市'),
(3, '台南市'),
(4, '台東市');

-- --------------------------------------------------------

--
-- 資料表結構 `Coupon`
--

CREATE TABLE `Coupon` (
  `coupon_id` int NOT NULL,
  `coupon_title` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `discount` int NOT NULL,
  `coupon_start_date` date DEFAULT NULL,
  `coupon_end_date` date DEFAULT NULL,
  `coupon_deadline` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:無期限,1:有期限'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Coupon`
--

INSERT INTO `Coupon` (`coupon_id`, `coupon_title`, `discount`, `coupon_start_date`, `coupon_end_date`, `coupon_deadline`) VALUES
(1, 'KOMORU100', 100, NULL, NULL, '0');

-- --------------------------------------------------------

--
-- 資料表結構 `CouponItem`
--

CREATE TABLE `CouponItem` (
  `coupon_item_id` int NOT NULL,
  `member_id` int NOT NULL,
  `coupon_id` int NOT NULL,
  `coupon_item_status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:未使用,1:已使用',
  `create_datetime` datetime NOT NULL,
  `update_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Employee`
--

CREATE TABLE `Employee` (
  `employee_id` int NOT NULL,
  `employee_account` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_passwd` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Employee`
--

INSERT INTO `Employee` (`employee_id`, `employee_account`, `employee_passwd`, `employee_name`, `employee_phone`, `create_datetime`) VALUES
(1, 'admin', 'admin', 'admin', '0911222333', '2022-06-12 03:51:52');

-- --------------------------------------------------------

--
-- 資料表結構 `ExamItem`
--

CREATE TABLE `ExamItem` (
  `exam_item_id` int NOT NULL,
  `member_id` int NOT NULL,
  `order_id` int NOT NULL,
  `q_one_ans_value` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:左邊答案,1:右邊答案',
  `q_two_ans_value` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Feeback`
--

CREATE TABLE `Feeback` (
  `feeback_id` int NOT NULL,
  `order_id` int NOT NULL,
  `feeback_content` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `FeebackImg`
--

CREATE TABLE `FeebackImg` (
  `feeback_img_id` int NOT NULL,
  `feeback_id` int NOT NULL,
  `feedback_img_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Hotel`
--

CREATE TABLE `Hotel` (
  `hotel_id` int NOT NULL,
  `city_id` int NOT NULL,
  `hotel_title` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `hotel_addr` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `hotel_tel` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `hotel_content` varchar(800) COLLATE utf8mb4_general_ci NOT NULL,
  `check_in_time` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `check_out_time` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `HotelImg`
--

CREATE TABLE `HotelImg` (
  `hotel_img_id` int NOT NULL,
  `hotel_id` int NOT NULL,
  `hotel_img_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `hotel_img_is_main` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:主圖,1:非主圖',
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Member`
--

CREATE TABLE `Member` (
  `member_id` int NOT NULL,
  `member_mail` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `member_passwd` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `member_forget_passwd_ans` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `member_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `member_nick_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `member_gender` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:女,1:男',
  `member_phone` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `member_img_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `register_type` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:web,1:google,2:line,3:fb',
  `create_datetime` datetime NOT NULL,
  `update_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Order`
--

CREATE TABLE `Order` (
  `order_id` int NOT NULL,
  `member_id` int NOT NULL,
  `room_id` int NOT NULL,
  `coupon_item_id` int DEFAULT NULL,
  `order_status` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:未入住,1:已入住,2:已退房',
  `order_start_date` date NOT NULL,
  `order_end_date` date NOT NULL,
  `order_total` int NOT NULL,
  `create_datetime` datetime NOT NULL,
  `update_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `OrderItem`
--

CREATE TABLE `OrderItem` (
  `order_item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `active_pack_id` int DEFAULT NULL,
  `order_item_date` date NOT NULL,
  `is_active` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:有活動包,1:無活動包',
  `order_item_price` int NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Partnership`
--

CREATE TABLE `Partnership` (
  `partnership_id` int NOT NULL,
  `partnership_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `partnership_addr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `partnership_tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `partnership_contact_person` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_datetime` datetime NOT NULL,
  `update_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `RainbowCard`
--

CREATE TABLE `RainbowCard` (
  `rainbow_card_id` int NOT NULL,
  `rainbow_card_content` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `RainbowCard`
--

INSERT INTO `RainbowCard` (`rainbow_card_id`, `rainbow_card_content`) VALUES
(1, '當我請求別人協助的時候，我依然值得被愛。'),
(2, '我就是我，我很好。'),
(3, '我放下不再屬於我的一切，敞開心胸接受轉變。'),
(4, '我自由地、帶著愛去創造那些使我生活更豐富、更美好的事物。'),
(5, '生命就是自我探索的旅程。'),
(6, '我面對的終究只有自己。'),
(7, '我用愛和關心的想法來滋潤自己。'),
(8, '我觀察自己的感覺，而非告訴別人他們應該如何感覺。'),
(9, '我有力量和能力去過有意思的生活。'),
(10, '面對心魔是使自己完整，並活在光中的不二法門。'),
(11, '所有我需要的東西，都會適時來到我身邊。'),
(12, '我知道我值得擁有美好的生活。'),
(13, '只要我信任我自己就可以面對任何情況。'),
(14, '我放下跟別人的競爭和比較。'),
(15, '我是有價值並且受歡迎的。');

-- --------------------------------------------------------

--
-- 資料表結構 `RainbowCardItem`
--

CREATE TABLE `RainbowCardItem` (
  `member_id` int NOT NULL,
  `rainbow_card_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Room`
--

CREATE TABLE `Room` (
  `room_id` int NOT NULL,
  `hotel_id` int NOT NULL,
  `room_title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `live_num` int NOT NULL,
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `RoomImg`
--

CREATE TABLE `RoomImg` (
  `room_img_id` int NOT NULL,
  `room_id` int NOT NULL,
  `room_img_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `room_img_is_main` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:主圖,1:非主圖',
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `ActivePack`
--
ALTER TABLE `ActivePack`
  ADD PRIMARY KEY (`active_pack_id`),
  ADD KEY `city_id` (`city_id`);

--
-- 資料表索引 `ActivePackItem`
--
ALTER TABLE `ActivePackItem`
  ADD PRIMARY KEY (`active_pack_item_id`);

--
-- 資料表索引 `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`city_id`);

--
-- 資料表索引 `Coupon`
--
ALTER TABLE `Coupon`
  ADD PRIMARY KEY (`coupon_id`);

--
-- 資料表索引 `CouponItem`
--
ALTER TABLE `CouponItem`
  ADD PRIMARY KEY (`coupon_item_id`);

--
-- 資料表索引 `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- 資料表索引 `ExamItem`
--
ALTER TABLE `ExamItem`
  ADD PRIMARY KEY (`exam_item_id`);

--
-- 資料表索引 `Feeback`
--
ALTER TABLE `Feeback`
  ADD PRIMARY KEY (`feeback_id`);

--
-- 資料表索引 `FeebackImg`
--
ALTER TABLE `FeebackImg`
  ADD PRIMARY KEY (`feeback_img_id`);

--
-- 資料表索引 `Hotel`
--
ALTER TABLE `Hotel`
  ADD PRIMARY KEY (`hotel_id`);

--
-- 資料表索引 `HotelImg`
--
ALTER TABLE `HotelImg`
  ADD PRIMARY KEY (`hotel_img_id`);

--
-- 資料表索引 `Member`
--
ALTER TABLE `Member`
  ADD PRIMARY KEY (`member_id`);

--
-- 資料表索引 `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`order_id`);

--
-- 資料表索引 `OrderItem`
--
ALTER TABLE `OrderItem`
  ADD PRIMARY KEY (`order_item_id`);

--
-- 資料表索引 `Partnership`
--
ALTER TABLE `Partnership`
  ADD PRIMARY KEY (`partnership_id`);

--
-- 資料表索引 `RainbowCard`
--
ALTER TABLE `RainbowCard`
  ADD PRIMARY KEY (`rainbow_card_id`);

--
-- 資料表索引 `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`room_id`);

--
-- 資料表索引 `RoomImg`
--
ALTER TABLE `RoomImg`
  ADD PRIMARY KEY (`room_img_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `ActivePack`
--
ALTER TABLE `ActivePack`
  MODIFY `active_pack_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `ActivePackItem`
--
ALTER TABLE `ActivePackItem`
  MODIFY `active_pack_item_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `City`
--
ALTER TABLE `City`
  MODIFY `city_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Coupon`
--
ALTER TABLE `Coupon`
  MODIFY `coupon_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `CouponItem`
--
ALTER TABLE `CouponItem`
  MODIFY `coupon_item_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Employee`
--
ALTER TABLE `Employee`
  MODIFY `employee_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `ExamItem`
--
ALTER TABLE `ExamItem`
  MODIFY `exam_item_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Feeback`
--
ALTER TABLE `Feeback`
  MODIFY `feeback_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `FeebackImg`
--
ALTER TABLE `FeebackImg`
  MODIFY `feeback_img_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Hotel`
--
ALTER TABLE `Hotel`
  MODIFY `hotel_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `HotelImg`
--
ALTER TABLE `HotelImg`
  MODIFY `hotel_img_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Member`
--
ALTER TABLE `Member`
  MODIFY `member_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Order`
--
ALTER TABLE `Order`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `OrderItem`
--
ALTER TABLE `OrderItem`
  MODIFY `order_item_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Partnership`
--
ALTER TABLE `Partnership`
  MODIFY `partnership_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `RainbowCard`
--
ALTER TABLE `RainbowCard`
  MODIFY `rainbow_card_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Room`
--
ALTER TABLE `Room`
  MODIFY `room_id` int NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `RoomImg`
--
ALTER TABLE `RoomImg`
  MODIFY `room_img_id` int NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `ActivePack`
--
ALTER TABLE `ActivePack`
  ADD CONSTRAINT `ActivePack_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `City` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
