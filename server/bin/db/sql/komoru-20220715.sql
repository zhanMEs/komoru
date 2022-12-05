-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1:3306
-- 產生時間： 2022 年 07 月 15 日 08:57
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
  `active_pack_item_content` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `ActivePackItem`
--

INSERT INTO `ActivePackItem` (`active_pack_item_id`, `active_pack_id`, `partnership_id`, `active_pack_item_title`, `active_pack_item_content`) VALUES
(1, 1, 1, '台北 天生藝術家', '前往 板前壽司 游 餐廳用餐'),
(2, 1, 6, '台北 天生藝術家', '台中中央公園吸收芬多精'),
(3, 1, 7, '台北 天生藝術家', '沒有名字的咖啡館點選當日甜點'),
(4, 2, 2, '台北 霸道總裁', '前往 創作麵坊・鮭の大助 餐廳用餐'),
(5, 2, 8, '台北 霸道總裁', '勤美誠品書店挑選暢銷排行一本閱讀'),
(6, 2, 9, '台北 霸道總裁', 'coffee stopover 點選一杯淺培風味咖啡'),
(7, 3, 3, '台北 最強輔助', '前往 新村站著吃燒肉 餐廳用餐'),
(8, 3, 10, '台北 最強輔助', '留白計畫 blank plan 觀賞當期展覽'),
(9, 3, 11, '台北 最強輔助', '珈琲院點選本日特調'),
(10, 4, 4, '台北 左右逢源', '前往 西蒙奶奶法式家鄉廚房 餐廳用餐'),
(11, 4, 12, '台北 左右逢源', '國立自然科學博物館植物園認識三種植物'),
(12, 4, 13, '台北 左右逢源', '五桐號WooTEA台中美村店嚐鮮杏仁凍五桐茶'),
(13, 5, 5, '台北 冒險王', '前往 橘色涮涮屋 餐廳用餐'),
(14, 5, 14, '台北 冒險王', '國立臺灣美術館欣賞一場展覽'),
(15, 5, 15, '台北 冒險王', '嵨峝 voûte 點選一杯本日精選'),
(16, 6, 1, '台中 天生藝術家', '前往 板前壽司 游 餐廳用餐'),
(17, 6, 6, '台中 天生藝術家', '台中中央公園吸收芬多精'),
(18, 6, 7, '台中 天生藝術家', '沒有名字的咖啡館點選當日甜點'),
(19, 7, 2, '台中 霸道總裁', '前往 創作麵坊・鮭の大助 餐廳用餐'),
(20, 7, 8, '台中 霸道總裁', '勤美誠品書店挑選暢銷排行一本閱讀'),
(21, 7, 9, '台中 霸道總裁', 'coffee stopover 點選一杯淺培風味咖啡'),
(22, 8, 3, '台中 最強輔助', '前往 新村站著吃燒肉 餐廳用餐'),
(23, 8, 10, '台中 最強輔助', '留白計畫 blank plan 觀賞當期展覽'),
(24, 8, 11, '台中 最強輔助', '珈琲院點選本日特調'),
(25, 9, 4, '台中 左右逢源', '前往 西蒙奶奶法式家鄉廚房 餐廳用餐'),
(26, 9, 12, '台中 左右逢源', '國立自然科學博物館植物園認識三種植物'),
(27, 9, 13, '台中 左右逢源', '五桐號WooTEA台中美村店嚐鮮杏仁凍五桐茶'),
(28, 10, 5, '台中 冒險王', '前往 橘色涮涮屋 餐廳用餐'),
(29, 10, 14, '台中 冒險王', '國立臺灣美術館欣賞一場展覽'),
(30, 10, 15, '台中 冒險王', '嵨峝 voûte 點選一杯本日精選'),
(31, 11, 1, '台南 天生藝術家', '前往 板前壽司 游 餐廳用餐'),
(32, 11, 6, '台南 天生藝術家', '台中中央公園吸收芬多精'),
(33, 11, 7, '台南 天生藝術家', '沒有名字的咖啡館點選當日甜點'),
(34, 12, 2, '台南 霸道總裁', '前往 創作麵坊・鮭の大助 餐廳用餐'),
(35, 12, 8, '台南 霸道總裁', '勤美誠品書店挑選暢銷排行一本閱讀'),
(36, 12, 9, '台南 霸道總裁', 'coffee stopover 點選一杯淺培風味咖啡'),
(37, 13, 3, '台南 最強輔助', '前往 新村站著吃燒肉 餐廳用餐'),
(38, 13, 10, '台南 最強輔助', '留白計畫 blank plan 觀賞當期展覽'),
(39, 13, 11, '台南 最強輔助', '珈琲院點選本日特調'),
(40, 14, 4, '台南 左右逢源', '前往 西蒙奶奶法式家鄉廚房 餐廳用餐'),
(41, 14, 12, '台南 左右逢源', '國立自然科學博物館植物園認識三種植物'),
(42, 14, 13, '台南 左右逢源', '五桐號WooTEA台中美村店嚐鮮杏仁凍五桐茶'),
(43, 15, 5, '台南 冒險王', '前往 橘色涮涮屋 餐廳用餐'),
(44, 15, 14, '台南 冒險王', '國立臺灣美術館欣賞一場展覽'),
(45, 15, 15, '台南 冒險王', '嵨峝 voûte 點選一杯本日精選'),
(46, 16, 1, '東部 天生藝術家', '前往 板前壽司 游 餐廳用餐'),
(47, 16, 6, '東部 天生藝術家', '台中中央公園吸收芬多精'),
(48, 16, 7, '東部 天生藝術家', '沒有名字的咖啡館點選當日甜點'),
(49, 17, 2, '東部 霸道總裁', '前往 創作麵坊・鮭の大助 餐廳用餐'),
(50, 17, 8, '東部 霸道總裁', '勤美誠品書店挑選暢銷排行一本閱讀'),
(51, 17, 9, '東部 霸道總裁', 'coffee stopover 點選一杯淺培風味咖啡'),
(52, 18, 3, '東部 最強輔助', '前往 新村站著吃燒肉 餐廳用餐'),
(53, 18, 10, '東部 最強輔助', '留白計畫 blank plan 觀賞當期展覽'),
(54, 18, 11, '東部 最強輔助', '珈琲院點選本日特調'),
(55, 19, 4, '東部 左右逢源', '前往 西蒙奶奶法式家鄉廚房 餐廳用餐'),
(56, 19, 12, '東部 左右逢源', '國立自然科學博物館植物園認識三種植物'),
(57, 19, 13, '東部 左右逢源', '五桐號WooTEA台中美村店嚐鮮杏仁凍五桐茶'),
(58, 20, 5, '東部 冒險王', '前往 橘色涮涮屋 餐廳用餐'),
(59, 20, 14, '東部 冒險王', '國立臺灣美術館欣賞一場展覽'),
(60, 20, 15, '東部 冒險王', '嵨峝 voûte 點選一杯本日精選');

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
(1, '北部'),
(2, '中部'),
(3, '南部'),
(4, '東部');

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
(1, 'signIn200Coupon', 200, NULL, NULL, '0');

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
  `employee_passwd` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_invalid` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:已作廢,1:未作廢',
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL,
  `updater_id` int DEFAULT NULL,
  `update_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Employee`
--

INSERT INTO `Employee` (`employee_id`, `employee_account`, `employee_passwd`, `employee_name`, `employee_phone`, `is_invalid`, `creator_id`, `create_datetime`, `updater_id`, `update_datetime`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', '0911339667', '1', 0, '2022-06-12 03:51:52', 1, '2022-07-13 01:01:57');

-- --------------------------------------------------------

--
-- 資料表結構 `ExamItem`
--

CREATE TABLE `ExamItem` (
  `exam_item_id` int NOT NULL,
  `member_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `q_one_ans_value` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:左邊答案,1:右邊答案',
  `q_two_ans_value` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `active_pack_type` enum('0','1','2','3','4') COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:藝術家, 1:霸道總裁, 2:內向輔助, 3:能言善道, 4:冒險家',
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
  `hotel_desc` varchar(800) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_invalid` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:已作廢,1:未作廢',
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL,
  `updater_id` int DEFAULT NULL,
  `update_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Hotel`
--

INSERT INTO `Hotel` (`hotel_id`, `city_id`, `hotel_title`, `hotel_addr`, `hotel_tel`, `hotel_content`, `hotel_desc`, `is_invalid`, `creator_id`, `create_datetime`, `updater_id`, `update_datetime`) VALUES
(1, 1, '夾腳拖的家Flip Flop Hostel', '103 台北市大同區長安西路122號', '02 2558 5050', '旅館建築外觀復古、風格簡約大方，坐落在熱鬧的商業街上，對面即是台北當代藝術館。步行 8 分鐘可到台北車站，距離總統府 2 公里。\r\n\r\n\r\n男女混宿和女性專用宿舍房均可入住 3-6 人，提供免費 Wi-Fi 和設有床簾的上下舖。所有宿舍房均設有置物櫃及共用衛浴。部分私人客房配有私人衛浴。提供毛巾 (需額外付費)。歡迎 4 歲 (含) 以上兒童入住私人客房。\r\n\r\n免費供應熱食早餐。另附設明亮的公用廚房、時尚交誼廳及投幣式洗衣設備。', NULL, '1', 1, '2022-06-15 10:19:38', 1, '2022-07-13 23:36:54'),
(2, 2, 'Star Hostel', '台中市西區公益路68號15樓', '+886 4 2321-9696', 'Star Hostel 2019年嶄新計畫，位於頂層一覽城市天際線，戶外露台以及溫室綠植設計概念，與自然纏繞共生，結合誠品書店、商場為垂直生活聚落，迎接世界旅人感受台中花園城市的魅力。\n\n起始於旅人停留的空間，回歸旅行與生活的本質，不只是棲身之所，而是重新與人、與自然連結、永續生活的啟發之地。\n\n', NULL, '1', 1, '2022-06-14 09:55:47', 1, '2022-07-14 14:19:06'),
(3, 3, '快活慢行', '702 台南市南區樹林街二段420號', '06-2229255', '城市生活的連結器 HiiHub\n快活慢行是一種生活感覺。\n\nHiiHUB，HUBs是一個多重的連結器，以開放的態度來接壤起生活、工作與旅行。\n\n我們的空間裡，是由工作（HiiWORK）、生活與樂（HiiSELECT）、吃食（HiiCHOP)、旅宿（HiiDOZE）、實驗性(HiiLAB)組合起旅人與在地扎根年輕工作者的生命，創造出相遇的機會。我們相信，給予與獲得是相生相息的，人的活動就是城市的活力，年輕世代對城市的想像力與實踐性會獲之於城市，回饋於城市。\n\nHiiHUB就是由生活與每日的快樂與不快樂所組成，在台南的一整日就是每個人某一時刻生命特殊的體悟。', NULL, '1', 1, '2022-06-15 10:19:38', 1, '2022-07-15 14:40:40'),
(4, 4, '山林山鄰', '981 花蓮縣玉里鎮大同路228號', '03-888-7228', '有一種信仰叫做小鎮的日常，\n\n寧靜、質樸 ，散發純粹的美好。\n\n山鄰山林青年文旅，\n深處在群山之間，坐落於小鎮之路。\n\n它不僅僅是一間旅館，\n更適宜處匯集旅人能量的場所。', NULL, '1', 1, '2022-06-15 10:19:38', 1, '2022-07-15 14:46:27');

-- --------------------------------------------------------

--
-- 資料表結構 `HotelImg`
--

CREATE TABLE `HotelImg` (
  `hotel_img_id` int NOT NULL,
  `hotel_id` int NOT NULL,
  `hotel_img_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `hotel_img_is_main` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:主圖,1:非主圖',
  `is_invalid` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:已作廢,1:未作廢',
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL,
  `updater_id` int DEFAULT NULL,
  `update_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `HotelImg`
--

INSERT INTO `HotelImg` (`hotel_img_id`, `hotel_id`, `hotel_img_path`, `hotel_img_is_main`, `is_invalid`, `creator_id`, `create_datetime`, `updater_id`, `update_datetime`) VALUES
(1, 1, '/images/hotel/hotel-1.jpeg', '0', '0', 1, '2022-06-14 10:10:49', 1, '2022-07-04 23:02:37'),
(2, 1, '/images/hotel/hotel-2.jpeg', '1', '0', 1, '2022-06-14 10:10:49', 1, '2022-07-04 23:02:37'),
(3, 1, '/images/hotel/hotel-3.jpeg', '1', '0', 1, '2022-06-14 10:10:49', 1, '2022-07-04 23:02:37'),
(4, 1, '/images/hotel/hotel-4.jpeg', '1', '0', 1, '2022-06-14 10:10:49', 1, '2022-07-04 23:02:37'),
(5, 2, '/images/hotel/hotel-5.jpeg', '0', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(6, 2, '/images/hotel/hotel-6.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(7, 2, '/images/hotel/hotel-7.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(8, 2, '/images/hotel/hotel-8.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(9, 3, '/images/hotel/hotel-9.jpeg', '0', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(10, 3, '/images/hotel/hotel-10.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(11, 3, '/images/hotel/hotel-11.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(12, 3, '/images/hotel/hotel-12.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(13, 4, '/images/hotel/hotel-13.jpeg', '0', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(14, 4, '/images/hotel/hotel-14.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(15, 4, '/images/hotel/hotel-15.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL),
(16, 4, '/images/hotel/hotel-16.jpeg', '1', '1', 1, '2022-06-15 14:14:43', NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `Member`
--

CREATE TABLE `Member` (
  `member_id` int NOT NULL,
  `member_mail` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `member_passwd` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `member_forget_passwd_ans` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `member_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `member_nick_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `member_gender` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:女,1:男,2:無',
  `member_phone` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `member_img_path` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `register_type` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:web,1:google,2:line,3:fb',
  `third_party_register_id` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_datetime` datetime NOT NULL,
  `update_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Order`
--

CREATE TABLE `Order` (
  `order_id` int NOT NULL,
  `order_number` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `member_id` int NOT NULL,
  `room_id` int NOT NULL,
  `coupon_item_id` int DEFAULT NULL,
  `order_status` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:未入住,1:已入住,2:已退房',
  `order_start_date` date NOT NULL,
  `order_end_date` date NOT NULL,
  `order_total` int NOT NULL,
  `create_datetime` datetime NOT NULL,
  `updater_id` int DEFAULT NULL,
  `update_datetime` datetime DEFAULT NULL,
  `payment` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '0' COMMENT '0:現金, 1:信用卡'
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
  `city_id` int NOT NULL,
  `partnership_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `partnership_addr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `partnership_tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `partnership_contact_person` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `partnership_desc` varchar(800) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `creator_id` int NOT NULL DEFAULT '1',
  `create_datetime` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updater_id` int DEFAULT '1',
  `update_datetime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_invalid` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:已作廢,1:未作廢'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Partnership`
--

INSERT INTO `Partnership` (`partnership_id`, `city_id`, `partnership_name`, `partnership_addr`, `partnership_tel`, `partnership_contact_person`, `partnership_desc`, `creator_id`, `create_datetime`, `updater_id`, `update_datetime`, `is_invalid`) VALUES
(1, 2, '板前壽司 游', '台中市西屯區精誠路50巷12號', '04 2329 1858', '游先生', '', 1, '2022-07-14 02:58:57', 1, '2022-07-14 10:58:57', '1'),
(2, 2, '創作麵坊・鮭の大助', '台中市西區中興街271號', '無', '鮭大助', NULL, 1, '2022-07-12 19:28:55', 1, '2022-07-12 19:28:55', '1'),
(3, 2, '新村站著吃燒肉', '台中市西區英才路534號', '04 2301 1659', '陳小姐', NULL, 1, '2022-06-16 04:52:00', 1, '2022-06-16 04:52:00', '1'),
(4, 2, '西蒙奶奶法式家鄉廚房', '台中市西區五權西四街13巷11號', '0902 021 608', '羅小姐', NULL, 1, '2022-07-12 19:29:09', 1, '2022-07-12 19:29:09', '1'),
(5, 2, '橘色涮涮屋', '台中市西屯區台灣大道三段301號4樓', '04 2258 5655', '羅先生', NULL, 1, '2022-07-12 19:29:16', 1, '2022-07-12 19:29:16', '1'),
(6, 2, '台中中央公園', '台中市西屯區中科路2966號', '04 2326 6085', '陳副理', NULL, 1, '2022-07-14 06:56:55', 1, '2022-07-14 14:56:55', '1'),
(7, 2, '沒有名字的咖啡館', '台中市西區精明一街73號', '', '', NULL, 1, '2022-07-14 06:54:29', 1, '2022-07-14 06:54:29', '1'),
(8, 2, '勤美誠品', '台中市西區公益路68號', '', '', NULL, 1, '2022-07-14 06:53:35', 1, '2022-07-14 06:53:35', '1'),
(9, 2, 'coffee stopover', '台中市西區福龍街7號1樓', '', '', NULL, 1, '2022-07-14 06:54:40', 1, '2022-07-14 06:54:40', '1'),
(10, 2, '留白計畫 blank plan', '台中市西區五權西四街45號', '', '', NULL, 1, '2022-07-14 06:54:49', 1, '2022-07-14 06:54:49', '1'),
(11, 2, '珈琲院', '台中市西區存中街165號', '', '', NULL, 1, '2022-07-14 06:54:58', 1, '2022-07-14 06:54:58', '1'),
(12, 2, '國立自然科學博物館', '台中市北區館前路1號', '', '', NULL, 1, '2022-07-14 06:54:07', 1, '2022-07-14 06:54:07', '1'),
(13, 2, '五桐號WooTEA台中美村店', '台中市西區美村路一段97號', '', '', NULL, 1, '2022-07-14 06:55:07', 1, '2022-07-14 06:55:07', '1'),
(14, 2, '國立臺灣美術館', '台中市西區五權西路一段2號', '', '', NULL, 1, '2022-07-14 06:54:18', 1, '2022-07-14 06:54:18', '1'),
(15, 2, '嵨峝 voûte ', '台中市西區五權西六街104號', '', '', NULL, 1, '2022-07-14 06:55:18', 1, '2022-07-14 06:55:18', '1');

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
  `room_type` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:背包客,1:單人房',
  `room_content` varchar(800) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `live_num` int NOT NULL,
  `is_invalid` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:已作廢,1:未作廢',
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL,
  `updater_id` int DEFAULT NULL,
  `update_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `Room`
--

INSERT INTO `Room` (`room_id`, `hotel_id`, `room_type`, `room_content`, `live_num`, `is_invalid`, `creator_id`, `create_datetime`, `updater_id`, `update_datetime`) VALUES
(1, 2, '0', '六人背包床位提供給旅人最基本的起居空間，雖然不算寬敞但絕不至於狹小，房間的一半配置了和式休憩區，讓共用的房間增加了更多與人交流聊天的機會。/你也可以與三兩好友一起包下這間房，也可以享有與好友間的獨處時光，我們房型雖然簡單，但希望能讓你每次入住都能有新的發現和新的感受，並用緩慢悠哉的步調感受台中。', 12, '1', 1, '2022-06-14 10:14:29', 1, '2022-07-13 23:45:13'),
(2, 2, '1', '若是你希望保有個人空間，並且喜愛自在的坐臥在地板上，那麼這間客房會十分適合您入住。/簡約的單人空間沒有華而不實的設備，有的僅是簡單的設施讓你放慢腳步在這生活，為旅人提供一個認識勤美一帶的機會，但或許每次都能讓你有新的發現和新的感受。', 20, '1', 1, '2022-06-14 10:14:29', NULL, NULL),
(3, 3, '0', '六人背包床位提供給旅人最基本的起居空間，雖然不算寬敞但絕不至於狹小，房間的一半配置了和式休憩區，讓共...', 12, '1', 1, '2022-06-14 10:14:29', NULL, NULL),
(4, 3, '1', '若是你希望保有個人空間，並且喜愛自在的坐臥在地板上，那麼這間客房會十分適合您入住。/簡約的單人空間沒有華而不實的設備，有的僅是簡單的設施讓你放慢腳步在這生活，為旅人提供一個認識勤美一帶的機會，但或許每次都能讓你有新的發現和新的感受。', 20, '1', 1, '2022-06-14 10:14:29', NULL, NULL),
(5, 4, '0', '六人背包床位提供給旅人最基本的起居空間，雖然不算寬敞但絕不至於狹小，房間的一半配置了和式休憩區，讓共...', 12, '1', 1, '2022-06-14 10:14:29', NULL, NULL),
(6, 4, '1', '若是你希望保有個人空間，並且喜愛自在的坐臥在地板上，那麼這間客房會十分適合您入住。/簡約的單人空間沒有華而不實的設備，有的僅是簡單的設施讓你放慢腳步在這生活，為旅人提供一個認識勤美一帶的機會，但或許每次都能讓你有新的發現和新的感受。', 20, '1', 1, '2022-06-14 10:14:29', NULL, NULL),
(7, 1, '0', '六人背包床位提供給旅人最基本的起居空間，雖然不算寬敞但絕不至於狹小，房間的一半配置了和式休憩區，讓共用的房間增加了更多與人交流聊天的機會。/，也可以享有與好友間的獨處時光，我們房型雖然簡單，但希望能讓你每次入住都能有新的發現和新的感受，並用緩慢悠哉的步調感受台東。', 12, '1', 1, '2022-06-14 10:14:29', 1, '2022-07-14 16:20:43'),
(8, 1, '1', '若是你希望保有個人空間，並且喜愛自在的坐臥在地板上，那麼這間客房會十分適合您入住。/簡約的單人空間沒...', 20, '1', 1, '2022-06-14 10:14:29', NULL, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `RoomImg`
--

CREATE TABLE `RoomImg` (
  `room_img_id` int NOT NULL,
  `room_id` int NOT NULL,
  `room_img_path` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `room_img_is_main` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0:主圖,1:非主圖',
  `is_invalid` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '0:已作廢,1:未作廢',
  `creator_id` int NOT NULL,
  `create_datetime` datetime NOT NULL,
  `updater_id` int DEFAULT NULL,
  `update_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `RoomImg`
--

INSERT INTO `RoomImg` (`room_img_id`, `room_id`, `room_img_path`, `room_img_is_main`, `is_invalid`, `creator_id`, `create_datetime`, `updater_id`, `update_datetime`) VALUES
(1, 1, '/images/room/room-1.jpeg', '0', '1', 1, '2022-06-14 10:17:18', 1, '2022-07-04 23:16:50'),
(2, 2, '/images/room/room-2.jpeg', '0', '1', 1, '2022-06-14 10:17:18', 1, '2022-07-04 23:16:50'),
(3, 3, '/images/room/room-3.jpeg', '0', '1', 1, '2022-06-14 10:17:18', 1, '2022-07-04 23:16:50'),
(4, 4, '/images/room/room-4.jpeg', '0', '1', 1, '2022-06-14 10:17:18', 1, '2022-07-04 23:16:50'),
(5, 5, '/images/room/room-5.jpeg', '0', '1', 1, '2022-06-14 10:17:18', 1, '2022-07-04 23:16:50'),
(6, 6, '/images/room/room-6.jpeg', '0', '1', 1, '2022-06-14 10:17:18', 1, '2022-07-04 23:16:50'),
(7, 7, '/images/room/room-7.jpeg', '0', '1', 1, '2022-06-14 10:17:18', 1, '2022-07-04 23:16:50'),
(8, 8, '/images/room/room-8.jpeg', '0', '1', 1, '2022-06-14 10:17:18', 1, '2022-07-04 23:16:50');

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
  ADD PRIMARY KEY (`hotel_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `creator_id` (`creator_id`),
  ADD KEY `updater_id` (`updater_id`);

--
-- 資料表索引 `HotelImg`
--
ALTER TABLE `HotelImg`
  ADD PRIMARY KEY (`hotel_img_id`),
  ADD KEY `hotel_id` (`hotel_id`),
  ADD KEY `creator_id` (`creator_id`),
  ADD KEY `updater_id` (`updater_id`);

--
-- 資料表索引 `Member`
--
ALTER TABLE `Member`
  ADD PRIMARY KEY (`member_id`);

--
-- 資料表索引 `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `updater_id` (`updater_id`);

--
-- 資料表索引 `OrderItem`
--
ALTER TABLE `OrderItem`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`);

--
-- 資料表索引 `Partnership`
--
ALTER TABLE `Partnership`
  ADD PRIMARY KEY (`partnership_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `creator_id` (`creator_id`),
  ADD KEY `updater_id` (`updater_id`);

--
-- 資料表索引 `RainbowCard`
--
ALTER TABLE `RainbowCard`
  ADD PRIMARY KEY (`rainbow_card_id`);

--
-- 資料表索引 `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `hotel_id` (`hotel_id`),
  ADD KEY `creator_id` (`creator_id`),
  ADD KEY `updater_id` (`updater_id`);

--
-- 資料表索引 `RoomImg`
--
ALTER TABLE `RoomImg`
  ADD PRIMARY KEY (`room_img_id`),
  ADD KEY `RoomImg_ibfk_1` (`room_id`),
  ADD KEY `RoomImg_ibfk_2` (`creator_id`),
  ADD KEY `updater_id` (`updater_id`);

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
  MODIFY `active_pack_item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

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
  MODIFY `hotel_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `HotelImg`
--
ALTER TABLE `HotelImg`
  MODIFY `hotel_img_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
  MODIFY `partnership_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `RainbowCard`
--
ALTER TABLE `RainbowCard`
  MODIFY `rainbow_card_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Room`
--
ALTER TABLE `Room`
  MODIFY `room_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `RoomImg`
--
ALTER TABLE `RoomImg`
  MODIFY `room_img_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `ActivePack`
--
ALTER TABLE `ActivePack`
  ADD CONSTRAINT `ActivePack_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `City` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `Hotel`
--
ALTER TABLE `Hotel`
  ADD CONSTRAINT `Hotel_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `City` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Hotel_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Hotel_ibfk_3` FOREIGN KEY (`updater_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `HotelImg`
--
ALTER TABLE `HotelImg`
  ADD CONSTRAINT `HotelImg_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `Hotel` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `HotelImg_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `HotelImg_ibfk_3` FOREIGN KEY (`updater_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `OrderItem`
--
ALTER TABLE `OrderItem`
  ADD CONSTRAINT `OrderItem_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Order` (`order_id`);

--
-- 資料表的限制式 `Partnership`
--
ALTER TABLE `Partnership`
  ADD CONSTRAINT `Partnership_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `City` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Partnership_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Partnership_ibfk_3` FOREIGN KEY (`updater_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `Room`
--
ALTER TABLE `Room`
  ADD CONSTRAINT `Room_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `Hotel` (`hotel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Room_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Room_ibfk_3` FOREIGN KEY (`updater_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `RoomImg`
--
ALTER TABLE `RoomImg`
  ADD CONSTRAINT `RoomImg_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `Room` (`room_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RoomImg_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RoomImg_ibfk_3` FOREIGN KEY (`updater_id`) REFERENCES `Employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
