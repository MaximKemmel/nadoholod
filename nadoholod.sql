-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Фев 29 2024 г., 21:32
-- Версия сервера: 10.4.24-MariaDB
-- Версия PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `nadoholod`
--

-- --------------------------------------------------------

--
-- Структура таблицы `attributes`
--

CREATE TABLE `attributes` (
  `id` int(11) NOT NULL,
  `attribute` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `attributes`
--

INSERT INTO `attributes` (`id`, `attribute`) VALUES
(0, 'Аттрибут1'),
(1, 'Аттрибут2');

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT -1,
  `img_path` text NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `category`, `description`, `parent_id`, `img_path`, `is_main`) VALUES
(1, 'Камеры хранения готовой продукции', '<p>камеры объемом от 6 до 20м<sup>3</sup></p><p>камеры объемом от 50 до 100м<sup>3 </sup>и высотой более 2м</p><p>камеры большого объема - свыше 100м<sup>3</sup></p>', -1, '/categories/1.png', 1),
(2, 'Генераторы холодной воды', '<p>ГЛВ&nbsp;— установка, позволяющая получать воду до&nbsp;Т=0,5&nbsp;С&nbsp;в&nbsp;замкнутой системе, используя преждевременно накопленный&nbsp;лёд.</p>', -1, '/categories/2.png', 1),
(3, 'Чиллеры', '<p>Благодаря особой конструкции чиллеров их&nbsp;можно эксплуатировать в&nbsp;круглогодичном режиме, при&nbsp;этом процесс полностью автоматизирован.<span class=\"ql-cursor\">﻿</span></p>', -1, '/categories/3.png', 1),
(4, 'Камеры сушки/вялки', '<p>Оборудование для&nbsp;вяления и&nbsp;сушки рыбы представляет собой специальные сушильные камеры с&nbsp;постоянной циркуляцией воздуха. В&nbsp;зависимости от&nbsp;режимов сушки и&nbsp;вяления, внутри камеры поддерживается определённый температурный режим.</p>', -1, '/categories/4.png', 1),
(5, 'Центральное холодоснабжение', '<p>Целесообразно монтировать централизованное холодоснабжение при&nbsp;объёме обслуживаемых площадей от&nbsp;400м².</p><p>Это&nbsp;многокомпрессорные агрегаты, компрессоры в&nbsp;которых подключены параллельно и&nbsp;функционируют в&nbsp;одном температурном режиме.</p>', -1, '/categories/5.png', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `category_attributes`
--

CREATE TABLE `category_attributes` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `category_attributes`
--

INSERT INTO `category_attributes` (`id`, `category_id`, `attribute_id`) VALUES
(2, 7, 0),
(4, 1, 1),
(5, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `category_filters`
--

CREATE TABLE `category_filters` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `filter_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `category_filters`
--

INSERT INTO `category_filters` (`id`, `category_id`, `filter_id`) VALUES
(3, 1, 2),
(4, 1, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `filters`
--

CREATE TABLE `filters` (
  `id` int(11) NOT NULL,
  `filter` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `filters`
--

INSERT INTO `filters` (`id`, `filter`) VALUES
(2, 'Фильтр1'),
(3, 'Фильтр2');

-- --------------------------------------------------------

--
-- Структура таблицы `filter_items`
--

CREATE TABLE `filter_items` (
  `id` int(11) NOT NULL,
  `filter_id` int(11) NOT NULL,
  `filter_item` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `filter_items`
--

INSERT INTO `filter_items` (`id`, `filter_id`, `filter_item`) VALUES
(4, 2, 'Туев'),
(5, 3, 'аа'),
(6, 3, 'пп');

-- --------------------------------------------------------

--
-- Структура таблицы `manufacturers`
--

CREATE TABLE `manufacturers` (
  `id` int(11) NOT NULL,
  `manufacturer` varchar(250) NOT NULL,
  `image_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `manufacturers`
--

INSERT INTO `manufacturers` (`id`, `manufacturer`, `image_path`) VALUES
(1, 'Polair', '/manufacturers/polair.png'),
(2, 'Север', '/manufacturers/sever.png');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `full_description` text NOT NULL,
  `price` int(11) NOT NULL,
  `delivery_info` text NOT NULL,
  `instruction_path` text NOT NULL,
  `manufacturer_id` int(11) NOT NULL DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `product_attributes`
--

CREATE TABLE `product_attributes` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `product_filters`
--

CREATE TABLE `product_filters` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `filter_id` int(11) NOT NULL,
  `filter_item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `path` text NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`) VALUES
(1, 'admin', 'Jz+V8phCvMW9QSPZtn.7D)');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `category_attributes`
--
ALTER TABLE `category_attributes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `category_filters`
--
ALTER TABLE `category_filters`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `filters`
--
ALTER TABLE `filters`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `filter_items`
--
ALTER TABLE `filter_items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `product_filters`
--
ALTER TABLE `product_filters`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `category_attributes`
--
ALTER TABLE `category_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `category_filters`
--
ALTER TABLE `category_filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `filters`
--
ALTER TABLE `filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `filter_items`
--
ALTER TABLE `filter_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `product_attributes`
--
ALTER TABLE `product_attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `product_filters`
--
ALTER TABLE `product_filters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
