-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2020 a las 07:39:21
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
(6, '924BhEGSv', 'Administrador'),
(7, 'bSx8Rs-mJ', 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` varchar(45) NOT NULL,
  `nombres` varchar(40) NOT NULL,
  `apellidos` varchar(40) NOT NULL,
  `identificacion` int(30) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `direccion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombres`, `apellidos`, `identificacion`, `correo`, `direccion`) VALUES
('0daa619e-bec7-45e6-beac-025d318a5fcc', 'karina kimara', 'coello goyes', 1204848299, 'kari@gmail.com', 'none none'),
('238cad86-2c73-44f5-9199-ed1de169a883', 'Andres roberto', 'Coello', 1207345768, 'goyeselcoca@gmail.com', 'san juan, Kilometro 1 vi a vinces'),
('b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', 'consumidor_final', 'consumidor_final', 0, 'consumidor_final@gmail.com', 'sin direccion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id_factura` varchar(45) NOT NULL,
  `id_cliente` varchar(45) NOT NULL,
  `fecha_factura` varchar(30) NOT NULL,
  `descripcion_f` text NOT NULL,
  `descuento` double NOT NULL,
  `iva` double NOT NULL,
  `total` double NOT NULL,
  `efectivo` double NOT NULL,
  `cambio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`id_factura`, `id_cliente`, `fecha_factura`, `descripcion_f`, `descuento`, `iva`, `total`, `efectivo`, `cambio`) VALUES
('04d7e449-d036-42a0-b4bc-eebf5106d4b5', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-06-14 23:8:49', 'Sin descripcion', 0, 12, 1.74, 0, 0);

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
(28, 'lXguFYhsP', '2020-06-10 12:8:25'),
(29, 'lXguFYhsP', '2020-06-10 20:9:48'),
(30, 'lXguFYhsP', '2020-06-11 11:10:51'),
(31, 'lXguFYhsP', '2020-06-12 12:45:49');

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
(3, 'Life'),
(4, 'Sanofi ');

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
(15, 'Simvastatina '),
(16, 'Omeprazol ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` varchar(45) NOT NULL,
  `id_nombre_producto` int(11) NOT NULL,
  `id_nombre_laboratorio` int(11) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `presentacion` varchar(30) NOT NULL,
  `lote` varchar(40) NOT NULL,
  `registro_sanitario` varchar(40) NOT NULL,
  `medida` double NOT NULL,
  `tipo_medida` varchar(20) NOT NULL,
  `fecha_elaboracion` varchar(10) NOT NULL,
  `fecha_caducidad` varchar(10) NOT NULL,
  `pvp` double NOT NULL,
  `pvf` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_nombre_producto`, `id_nombre_laboratorio`, `cantidad`, `presentacion`, `lote`, `registro_sanitario`, `medida`, `tipo_medida`, `fecha_elaboracion`, `fecha_caducidad`, `pvp`, `pvf`) VALUES
('90c8ebe1-ae12-4e3e-a358-a6fc95872535', 16, 3, 1, 'Tabletas', 'CM91384811Z4', '02214-MAC-10-02', 500, 'Miligramos', '2020-06-10', '2020-06-24', 1.2, 0.82),
('bbce1bb0-27f2-44a2-b517-78967365c060', 15, 3, 1, 'Tabletas', 'CM9138481G4T', '02214-MAC-10-02', 100, 'Miligramos', '2020-06-13', '2020-06-17', 1.55, 1.05),
('cbc697c2-7b73-4c60-9543-9d2e7c323f0d', 15, 4, 2, 'Tabletas', 'CM913848121G', '02214-MAC-10-02', 200, 'Miligramos', '2020-06-27', '2020-06-22', 2.33, 1.91);

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
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id_factura`),
  ADD KEY `id_cliente` (`id_cliente`);

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
  ADD KEY `productos_ibfk_1` (`id_nombre_laboratorio`),
  ADD KEY `productos_ibfk_2` (`id_nombre_producto`);

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
  MODIFY `id_access` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `historial_session`
--
ALTER TABLE `historial_session`
  MODIFY `id_historial_session` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `nombre_laboratorio`
--
ALTER TABLE `nombre_laboratorio`
  MODIFY `id_name_laboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `nombre_producto`
--
ALTER TABLE `nombre_producto`
  MODIFY `id_product_name` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_session`
--
ALTER TABLE `historial_session`
  ADD CONSTRAINT `historial_session_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_nombre_laboratorio`) REFERENCES `nombre_laboratorio` (`id_name_laboratorio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_nombre_producto`) REFERENCES `nombre_producto` (`id_product_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `verificar_email`
--
ALTER TABLE `verificar_email`
  ADD CONSTRAINT `verificar_email_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
