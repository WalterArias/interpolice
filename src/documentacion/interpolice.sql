-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-03-2026 a las 16:36:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `interpolice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amonestaciones`
--

CREATE TABLE `amonestaciones` (
  `id_amonestacion` int(11) NOT NULL,
  `id_ciudadano` bigint(20) DEFAULT NULL,
  `numero_reincidencia` int(11) DEFAULT 1,
  `valor_multa` decimal(10,2) DEFAULT 400.00,
  `horas_curso` int(11) DEFAULT 48,
  `dias_trabajo_civico` int(11) DEFAULT 0,
  `dias_carcel` int(11) DEFAULT 0,
  `fecha_emision` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo_delitos`
--

CREATE TABLE `catalogo_delitos` (
  `id_delito` int(11) NOT NULL,
  `nombre_delito` varchar(100) NOT NULL,
  `descripcion_legal` text DEFAULT NULL,
  `es_delito_menor` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudadano`
--

CREATE TABLE `ciudadano` (
  `codigo` bigint(20) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `apodo` varchar(180) DEFAULT NULL,
  `fechanace` date NOT NULL,
  `foto` varchar(150) DEFAULT 'FOTO.JPG',
  `idplanetaorigen` int(11) NOT NULL,
  `codigoqr` text DEFAULT NULL,
  `estado` text NOT NULL DEFAULT 'A',
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_incidente_delitos`
--

CREATE TABLE `detalle_incidente_delitos` (
  `id_incidente` int(11) NOT NULL,
  `id_delito` int(11) NOT NULL,
  `observaciones` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidentes`
--

CREATE TABLE `incidentes` (
  `id_incidente` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `lugar_descripcion` varchar(255) DEFAULT NULL,
  `id_planeta` int(11) DEFAULT NULL,
  `id_ciudadano` bigint(100) DEFAULT NULL,
  `relato_policia` text DEFAULT NULL,
  `id_usuario_registra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planetas`
--

CREATE TABLE `planetas` (
  `id_planeta` int(11) NOT NULL,
  `nombre_planeta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planetas`
--

INSERT INTO `planetas` (`id_planeta`, `nombre_planeta`) VALUES
(100, 'Marte'),
(200, 'Tierra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'ADMIN'),
(3, 'POLICIA'),
(4, 'SECRETARIA'),
(5, 'SUPERADMIN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `nombre` varchar(200) NOT NULL,
  `estado` text NOT NULL DEFAULT 'ACTIVO' COMMENT 'A ES ACTIVO\r\nD ES DECESO MUERTO\r\nC ES CRIOGENIA - CONGELADO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `password_hash`, `telefono`, `id_rol`, `nombre`, `estado`) VALUES
(2, 'smith@gmail.com', '$2b$11$0e1Ocs2wql2zCpXf/jC3refTgl6huj2Y8jDeZv48ZcEvBSz21aqOy', '3205897', 3, 'Jhon Smith', 'A');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amonestaciones`
--
ALTER TABLE `amonestaciones`
  ADD PRIMARY KEY (`id_amonestacion`),
  ADD KEY `id_ciudadano` (`id_ciudadano`);

--
-- Indices de la tabla `catalogo_delitos`
--
ALTER TABLE `catalogo_delitos`
  ADD PRIMARY KEY (`id_delito`);

--
-- Indices de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `id_planeta_origen` (`idplanetaorigen`);

--
-- Indices de la tabla `detalle_incidente_delitos`
--
ALTER TABLE `detalle_incidente_delitos`
  ADD PRIMARY KEY (`id_incidente`,`id_delito`),
  ADD KEY `id_delito` (`id_delito`);

--
-- Indices de la tabla `incidentes`
--
ALTER TABLE `incidentes`
  ADD PRIMARY KEY (`id_incidente`),
  ADD KEY `id_planeta` (`id_planeta`),
  ADD KEY `id_ciudadano` (`id_ciudadano`),
  ADD KEY `id_usuario_registra` (`id_usuario_registra`);

--
-- Indices de la tabla `planetas`
--
ALTER TABLE `planetas`
  ADD PRIMARY KEY (`id_planeta`),
  ADD UNIQUE KEY `nombre_planeta` (`nombre_planeta`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `username` (`email`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amonestaciones`
--
ALTER TABLE `amonestaciones`
  MODIFY `id_amonestacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `catalogo_delitos`
--
ALTER TABLE `catalogo_delitos`
  MODIFY `id_delito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  MODIFY `codigo` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `incidentes`
--
ALTER TABLE `incidentes`
  MODIFY `id_incidente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `planetas`
--
ALTER TABLE `planetas`
  MODIFY `id_planeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amonestaciones`
--
ALTER TABLE `amonestaciones`
  ADD CONSTRAINT `amonestaciones_ibfk_1` FOREIGN KEY (`id_ciudadano`) REFERENCES `ciudadano` (`codigo`);

--
-- Filtros para la tabla `ciudadano`
--
ALTER TABLE `ciudadano`
  ADD CONSTRAINT `ciudadano_ibfk_1` FOREIGN KEY (`idplanetaorigen`) REFERENCES `planetas` (`id_planeta`);

--
-- Filtros para la tabla `detalle_incidente_delitos`
--
ALTER TABLE `detalle_incidente_delitos`
  ADD CONSTRAINT `detalle_incidente_delitos_ibfk_1` FOREIGN KEY (`id_incidente`) REFERENCES `incidentes` (`id_incidente`),
  ADD CONSTRAINT `detalle_incidente_delitos_ibfk_2` FOREIGN KEY (`id_delito`) REFERENCES `catalogo_delitos` (`id_delito`);

--
-- Filtros para la tabla `incidentes`
--
ALTER TABLE `incidentes`
  ADD CONSTRAINT `incidentes_ibfk_1` FOREIGN KEY (`id_planeta`) REFERENCES `planetas` (`id_planeta`),
  ADD CONSTRAINT `incidentes_ibfk_2` FOREIGN KEY (`id_ciudadano`) REFERENCES `ciudadano` (`codigo`),
  ADD CONSTRAINT `incidentes_ibfk_3` FOREIGN KEY (`id_usuario_registra`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
