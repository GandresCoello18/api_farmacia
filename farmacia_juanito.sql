-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2020 a las 06:49:34
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmacia_juanito`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `access_code`
--

CREATE TABLE `access_code` (
  `id_access` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `access_code`
--

INSERT INTO `access_code` (`id_access`, `code`, `tipo`) VALUES
(3, 'Md5nSL6z_', 'usuario Común'),
(6, '924BhEGSv', 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_session`
--

CREATE TABLE `historial_session` (
  `id_historial_session` int(11) NOT NULL,
  `id_user` varchar(20) NOT NULL,
  `fecha_session` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `historial_session`
--

INSERT INTO `historial_session` (`id_historial_session`, `id_user`, `fecha_session`) VALUES
(22, 'lXguFYhsP', '7-6-2020 15:15:52'),
(23, 'lXguFYhsP', '7-6-2020 15:18:6'),
(24, 'lXguFYhsP', '7-6-2020 15:31:8'),
(25, 'lXguFYhsP', '7-6-2020 15:34:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nombre_laboratorio`
--

CREATE TABLE `nombre_laboratorio` (
  `id_name_laboratorio` int(11) NOT NULL,
  `nombre_laboratorio` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nombre_laboratorio`
--

INSERT INTO `nombre_laboratorio` (`id_name_laboratorio`, `nombre_laboratorio`) VALUES
(3, 'test 4'),
(4, 'test 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nombre_producto`
--

CREATE TABLE `nombre_producto` (
  `id_product_name` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nombre_producto`
--

INSERT INTO `nombre_producto` (`id_product_name`, `product_name`) VALUES
(15, 'test'),
(16, 'test2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` varchar(45) NOT NULL,
  `imagen` varchar(60) NOT NULL,
  `id_nombre_producto` int(11) NOT NULL,
  `id_nombre_laboratorio` int(11) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `presentacion` varchar(30) NOT NULL,
  `lote` varchar(40) NOT NULL,
  `registro_sanitario` varchar(40) NOT NULL,
  `dosis` double NOT NULL,
  `tipo_dosis` varchar(20) NOT NULL,
  `fecha_elaboracion` varchar(10) NOT NULL,
  `fecha_caducidad` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `imagen`, `id_nombre_producto`, `id_nombre_laboratorio`, `cantidad`, `presentacion`, `lote`, `registro_sanitario`, `dosis`, `tipo_dosis`, `fecha_elaboracion`, `fecha_caducidad`) VALUES
('cbc697c2-7b73-4c60-9543-9d2e7c323f0d', 'individual-02.jpg', 15, 4, 22, 'Option two', '3222', 'efec33', 455, 'Miligramos', '2020-06-27', '2020-06-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` varchar(50) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `foto` varchar(40) NOT NULL,
  `tipo_user` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `email_on` tinyint(1) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `nombres`, `apellidos`, `foto`, `tipo_user`, `email`, `email_on`, `password`) VALUES
('lXguFYhsP', 'Andres', 'coello', 'avatar/hombre-0.jpg', 'Administrador', 'goyeselcoca@gmail.com', 1, '$2a$10$RsoQF3VAWU.eyZklueegLe16fsxSgKD5WSXSsbR0OpsE0Joh4fI1e');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `verificar_email`
--

CREATE TABLE `verificar_email` (
  `id_user` varchar(20) NOT NULL,
  `hash` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `access_code`
--
ALTER TABLE `access_code`
  ADD PRIMARY KEY (`id_access`);

--
-- Indices de la tabla `historial_session`
--
ALTER TABLE `historial_session`
  ADD PRIMARY KEY (`id_historial_session`),
  ADD KEY `historial_session_ibfk_1` (`id_user`);

--
-- Indices de la tabla `nombre_laboratorio`
--
ALTER TABLE `nombre_laboratorio`
  ADD PRIMARY KEY (`id_name_laboratorio`);

--
-- Indices de la tabla `nombre_producto`
--
ALTER TABLE `nombre_producto`
  ADD PRIMARY KEY (`id_product_name`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_nombre_laboratorio` (`id_nombre_laboratorio`),
  ADD KEY `id_nombre_producto` (`id_nombre_producto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `verificar_email`
--
ALTER TABLE `verificar_email`
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `access_code`
--
ALTER TABLE `access_code`
  MODIFY `id_access` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `historial_session`
--
ALTER TABLE `historial_session`
  MODIFY `id_historial_session` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `nombre_laboratorio`
--
ALTER TABLE `nombre_laboratorio`
  MODIFY `id_name_laboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `nombre_producto`
--
ALTER TABLE `nombre_producto`
  MODIFY `id_product_name` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `historial_session`
--
ALTER TABLE `historial_session`
  ADD CONSTRAINT `historial_session_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_nombre_laboratorio`) REFERENCES `nombre_laboratorio` (`id_name_laboratorio`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_nombre_producto`) REFERENCES `nombre_producto` (`id_product_name`);

--
-- Filtros para la tabla `verificar_email`
--
ALTER TABLE `verificar_email`
  ADD CONSTRAINT `verificar_email_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
