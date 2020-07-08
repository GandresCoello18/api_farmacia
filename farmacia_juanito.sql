-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-07-2020 a las 19:52:02
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

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
('b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', 'consumidor_final', 'consumidor_final', 0, 'consumidor_final@gmail.com', 'sin direccion'),
('c3e4b3b1-9467-499c-b28d-318e5e4031af', 'san carlos', 'tivan', 1204626526, 'sanCarlos@gmail.com', 'centro via principal'),
('ca3b3592-09b2-464a-b22b-18257a7a9a97', 'andres', 'coello', 1207345768, 'no especificado', 'San juan de ( Puebloviejo ) kilometro 1 via a vinces\nVia a v');

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
('09198257-3c4a-4bcb-aa42-8a9b9319f630', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-06-30 14:0:53', 'Sin descripcion', 0, 12, 78.4, 80, 1.6),
('09e6e649-720e-4a8c-b039-d2e23b2023a2', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-06-30 22:22:48', 'Sin descripcion', 0, 12, 16.07, 20, 3.93),
('15a38e8e-4a69-435d-9042-b0b8a67dc994', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-06-30 16:15:15', 'Sin descripcion', 0, 12, 11.2, 15, 3.8),
('46a5591e-9076-474f-8180-ac522951ad2b', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-07-06 20:11:27', 'Sin descripcion', 0, 12, 0, 0, 0),
('4f11e40b-6dd0-4297-8ccc-c76989b8d256', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-07-01 11:26:28', 'Sin descripcion', 0, 12, 18.37, 20, 1.63),
('511d1f2a-5ee6-41e5-9549-fddb44dea168', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-06-27 13:43:56', 'Sin descripcion', 0, 12, 100.8, 105, 4.2),
('85944377-37d7-434e-a7d5-e85809980978', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-07-06 10:12:59', 'Sin descripcion', 5, 12, 3.54, 5, 1.46),
('8e2cd77c-4e14-4141-aaf4-8f1c24db3db9', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-06-29 13:57:56', 'Sin descripcion', 0, 12, 26.88, 30, 3.12),
('8efce5c5-cca9-44de-963c-8b104f3ed654', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-07-01 11:25:48', 'Sin descripcion', 0, 12, 10.6, 11, 0.4),
('a375ed0a-68a0-4843-818f-545b21381360', 'b1fd154a-d4a2-42a0-b7a1-e4e6b0ffa479', '2020-07-06 10:30:35', 'Sin descripcion', 1, 12, 4.11, 5, 0.89);

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
(52, 'lXguFYhsP', '2020-07-02 12:22:7'),
(53, 'lXguFYhsP', '2020-07-06 9:54:18');

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
(7, 'test-laboratorio');

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
(20, 'test-product-name');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `principio_activo`
--

CREATE TABLE `principio_activo` (
  `id_principio_activo` int(11) NOT NULL,
  `principio_activo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `principio_activo`
--

INSERT INTO `principio_activo` (`id_principio_activo`, `principio_activo`) VALUES
(3, 'test-activo');

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
  `pvf` double NOT NULL,
  `estado` varchar(20) NOT NULL,
  `id_principio_activo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_nombre_producto`, `id_nombre_laboratorio`, `cantidad`, `presentacion`, `lote`, `registro_sanitario`, `medida`, `tipo_medida`, `fecha_elaboracion`, `fecha_caducidad`, `pvp`, `pvf`, `estado`, `id_principio_activo`) VALUES
('10bc595d-4c6f-45cd-9d64-70aefd63061c', 20, 7, 6, 'Tabletas', '505', 'efec33', 100, 'Gramos', '2020-06-09', '2020-08-13', 41, 20, 'Aun disponible', 3),
('15b17f90-0908-4572-ba95-6e978433657d', 20, 7, 7, 'Tabletas', '24200', 'efec33', 200, 'Miligramos', '2020-06-29', '2020-08-08', 10.1, 20.1, 'Aun disponible', 3),
('2be2f7ee-0b0a-4abc-b50b-f7690f4fb35e', 20, 7, 10, 'Tabletas', '40242054', 'efec33', 200, 'Miligramos', '2020-06-16', '2020-07-05', 10, 20, 'Vendido', 3),
('6b98f5b6-f08a-477a-b0e6-1bc26eef7e7c', 20, 7, 9, 'Tabletas', '402540', 'efec33', 200, 'Miligramos', '2020-07-10', '2020-08-03', 10, 20, 'Disponible', 3),
('7a668bce-b10d-4100-86e2-b6cfceb265c4', 20, 7, 1, 'Suero', '02402250', 'efec33', 200, 'Miligramos', '2020-06-11', '2020-07-05', 40, 20, 'Vendido', 3),
('9caaa4f5-2e76-46c5-8106-efbfab302650', 20, 7, 15, 'Suero', '42050', 'efec33', 100, 'Miligramos', '2020-06-08', '2020-06-19', 40, 21, 'Vendido', 3),
('ad833436-335b-42f2-9a7a-d01a1496d36b', 20, 7, 1, 'Jarabe', '242.0', 'efec33', 500, 'Litros', '2020-06-13', '2020-11-16', 70, 20, 'Vendido', 3),
('b0f27de5-6576-472d-9ba1-c6a46b655690', 20, 7, 1, 'Jarabe', '4505', 'efec33', 400, 'Miligramos', '2020-04-10', '2020-06-09', 10, 5, 'Vendido', 3),
('ce2fce7e-5165-45ef-ade7-7d8876b481b2', 20, 7, 4, 'Tabletas', '58200', 'efec33', 400, 'Gramos', '2020-06-01', '2020-10-16', 40, 10, 'Vendido', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_factura`
--

CREATE TABLE `producto_factura` (
  `id_producto_fac` varchar(45) NOT NULL,
  `id_producto` varchar(45) NOT NULL,
  `id_factura` varchar(45) NOT NULL,
  `formato` varchar(11) NOT NULL,
  `cantidad` int(3) NOT NULL,
  `item_total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto_factura`
--

INSERT INTO `producto_factura` (`id_producto_fac`, `id_producto`, `id_factura`, `formato`, `cantidad`, `item_total`) VALUES
('3be45657-a2e2-4ddf-aa6a-ba09e986c378', '2be2f7ee-0b0a-4abc-b50b-f7690f4fb35e', '511d1f2a-5ee6-41e5-9549-fddb44dea168', 'Por Paquete', 1, 0),
('5d3469ec-b76b-4d5f-833f-97f5e0f1026b', '7a668bce-b10d-4100-86e2-b6cfceb265c4', '511d1f2a-5ee6-41e5-9549-fddb44dea168', 'Por Paquete', 1, 0),
('6ab62708-6126-44e9-9461-1b01c20cfc2e', '15b17f90-0908-4572-ba95-6e978433657d', '85944377-37d7-434e-a7d5-e85809980978', 'Por Unidad', 5, 3.54),
('7b2a5b32-d6d7-4342-ad7b-de04df96aaab', '10bc595d-4c6f-45cd-9d64-70aefd63061c', '8efce5c5-cca9-44de-963c-8b104f3ed654', 'Por Unidad', 3, 0),
('80035e8e-7172-427e-b360-71fbb1bc314a', '9caaa4f5-2e76-46c5-8106-efbfab302650', '511d1f2a-5ee6-41e5-9549-fddb44dea168', 'Por Paquete', 1, 0),
('a3254d07-c209-4d1e-9710-352b2d1d1b74', '10bc595d-4c6f-45cd-9d64-70aefd63061c', '09e6e649-720e-4a8c-b039-d2e23b2023a2', 'Por Unidad', 7, 0),
('a542fe5a-56f0-4ff6-b17c-fc6b575efb7e', 'b0f27de5-6576-472d-9ba1-c6a46b655690', '15a38e8e-4a69-435d-9042-b0b8a67dc994', 'Por Paquete', 1, 0),
('b7e9e755-8c46-4883-b999-b9a3210cf69d', '15b17f90-0908-4572-ba95-6e978433657d', 'a375ed0a-68a0-4843-818f-545b21381360', 'Por Unidad', 4, 4.11),
('c33e6012-0a54-4661-815c-a2479b12f212', 'ad833436-335b-42f2-9a7a-d01a1496d36b', '09198257-3c4a-4bcb-aa42-8a9b9319f630', 'Por Paquete', 1, 0),
('e1be6f6b-8593-42b9-8b8a-a328c7f26e4a', 'ce2fce7e-5165-45ef-ade7-7d8876b481b2', '8e2cd77c-4e14-4141-aaf4-8f1c24db3db9', 'Por Unidad', 6, 0),
('f2aafb6c-b661-4f09-9e01-d7bf650f8fda', '10bc595d-4c6f-45cd-9d64-70aefd63061c', '4f11e40b-6dd0-4297-8ccc-c76989b8d256', 'Por Unidad', 4, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_proveedor`
--

CREATE TABLE `producto_proveedor` (
  `id_product_proveedor` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_pago` varchar(20) NOT NULL,
  `total` double NOT NULL,
  `id_proveedor` varchar(50) NOT NULL,
  `fecha_ingreso` varchar(30) NOT NULL,
  `estado_pp` varchar(20) NOT NULL,
  `abonado` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto_proveedor`
--

INSERT INTO `producto_proveedor` (`id_product_proveedor`, `descripcion`, `fecha_pago`, `total`, `id_proveedor`, `fecha_ingreso`, `estado_pp`, `abonado`) VALUES
('c1c03ec6-2096-4901-8c60-35f9ebbce35a', 'este es un test mus simple.....', '2020-07-08', 100, 'f0cca7c1-cba3-422d-8c87-6d9716be79bc', '2020-07-07 16:51:4', 'Pagado', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_proveedores` varchar(50) NOT NULL,
  `id_laboratorio` int(11) NOT NULL,
  `correo` varchar(40) NOT NULL,
  `telefono` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_proveedores`, `id_laboratorio`, `correo`, `telefono`, `nombres`) VALUES
('f0cca7c1-cba3-422d-8c87-6d9716be79bc', 7, 'sanCarlos@gmail.com', 992239138, 'san carlos');

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
('HsYHTsK6Z', 'Belen', 'Quezada', 'avatar/hombre-0.jpg', 'usuario Común', 'belenquezada08@gmail.com', 1, '$2a$10$zTlKvu.ztKAlC/2YAEYituK4JxuVa2Xt0YwuWMgipMdpis/QsMXgS'),
('lXguFYhsP', 'Andres', 'Coello', 'avatar/hombre-0.jpg', 'Administrador', 'goyeselcoca@gmail.com', 1, '$2a$10$RsoQF3VAWU.eyZklueegLe16fsxSgKD5WSXSsbR0OpsE0Joh4fI1e');

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
-- Indices de la tabla `principio_activo`
--
ALTER TABLE `principio_activo`
  ADD PRIMARY KEY (`id_principio_activo`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `productos_ibfk_1` (`id_nombre_laboratorio`),
  ADD KEY `productos_ibfk_2` (`id_nombre_producto`),
  ADD KEY `id_principio_activo` (`id_principio_activo`);

--
-- Indices de la tabla `producto_factura`
--
ALTER TABLE `producto_factura`
  ADD PRIMARY KEY (`id_producto_fac`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_factura` (`id_factura`);

--
-- Indices de la tabla `producto_proveedor`
--
ALTER TABLE `producto_proveedor`
  ADD PRIMARY KEY (`id_product_proveedor`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_proveedores`),
  ADD KEY `id_laboratorio` (`id_laboratorio`);

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
  MODIFY `id_historial_session` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `nombre_laboratorio`
--
ALTER TABLE `nombre_laboratorio`
  MODIFY `id_name_laboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `nombre_producto`
--
ALTER TABLE `nombre_producto`
  MODIFY `id_product_name` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `principio_activo`
--
ALTER TABLE `principio_activo`
  MODIFY `id_principio_activo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_nombre_producto`) REFERENCES `nombre_producto` (`id_product_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_principio_activo`) REFERENCES `principio_activo` (`id_principio_activo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto_factura`
--
ALTER TABLE `producto_factura`
  ADD CONSTRAINT `producto_factura_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_factura_ibfk_2` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto_proveedor`
--
ALTER TABLE `producto_proveedor`
  ADD CONSTRAINT `producto_proveedor_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedores`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD CONSTRAINT `proveedores_ibfk_1` FOREIGN KEY (`id_laboratorio`) REFERENCES `nombre_laboratorio` (`id_name_laboratorio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `verificar_email`
--
ALTER TABLE `verificar_email`
  ADD CONSTRAINT `verificar_email_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
