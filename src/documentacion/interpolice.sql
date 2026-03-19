
USE interpolice;

CREATE TABLE planetas (
    id_planeta INT PRIMARY KEY AUTO_INCREMENT,
    nombre_planeta VARCHAR(100) NOT NULL UNIQUE
);

-- 2. Usuarios del Sistema (Control de perfiles solicitado por Smith)
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN', 'GENERAL', 'POLICIA', 'SECRETARIA') NOT NULL,
    rango VARCHAR(50), -- Ej: Capitan, Comandante
    dispositivo_preferido VARCHAR(50) -- Ej: iPhone 47 XPLUS, Tablet Samsung
);

-- 3. Ciudadanos (Identificación Universal y QR)
CREATE TABLE ciudadanos (
    id_ciudadano BIGINT PRIMARY KEY AUTO_INCREMENT, 
    nombre VARCHAR(150) NOT NULL,
    apellidos VARCHAR(200) NOT NULL,
    apodo VARCHAR(180) NULL,
    fechanace DATE NOT NULL,
    foto VARCHAR(150) DEFAULT 'FOTO.JPG',
    id_planeta_origen INT,
    codigo_qr_token TEXT, 
    estado TEXT NOT NULL DEFAULT 'A',
    FOREIGN KEY (id_planeta_origen) REFERENCES planetas(id_planeta)
);

-- 4. Catálogo de Delitos (Basado en Código Penal Terrestre)
CREATE TABLE delitos (
    id_delito INT PRIMARY KEY AUTO_INCREMENT,
    nombre_delito VARCHAR(100) NOT NULL,
    descripcion_legal TEXT,
    es_delito_menor BOOLEAN DEFAULT FALSE -- Para lógica de amonestaciones
);

-- 5. Incidentes (El hecho físico: Fecha, Hora, Lugar)
CREATE TABLE incidentes (
    id_incidente INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    lugar_descripcion VARCHAR(255),
    id_planeta INT,
    id_ciudadano BIGINT(100),
    relato_policia TEXT, -- "El sujeto se encontraba ebrio..."
    id_usuario_registra INT, -- Secretaria de juzgado (IBM 45")
    FOREIGN KEY (id_planeta) REFERENCES planetas(id_planeta),
    FOREIGN KEY (id_ciudadano) REFERENCES ciudadanos(id_ciudadano),
    FOREIGN KEY (id_usuario_registra) REFERENCES usuarios(id_usuario)
);

-- 6. Detalle de Delitos por Incidente (Muchos a Muchos)
-- Permite que a la misma hora y lugar un sujeto cometa varios delitos
CREATE TABLE detalle_incidente_delitos (
    id_incidente INT,
    id_delito INT,
    PRIMARY KEY (id_incidente, id_delito),
    FOREIGN KEY (id_incidente) REFERENCES incidentes(id_incidente),
    FOREIGN KEY (id_delito) REFERENCES delitos(id_delito)
);

-- 7. Amonestaciones (Lógica progresiva de sanciones)
CREATE TABLE Amonestaciones (
    id_amonestacion INT PRIMARY KEY AUTO_INCREMENT,
    id_ciudadano BIGINT,
    numero_reincidencia INT DEFAULT 1, -- 1ra, 2da o 3ra vez
    valor_multa DECIMAL(10,2) DEFAULT 400.00,
    horas_curso INT DEFAULT 48,
    dias_trabajo_civico INT DEFAULT 0,
    dias_carcel INT DEFAULT 0,
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ciudadano) REFERENCES ciudadanos(id_ciudadano)
);
CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE -- ADMIN, GENERAL, POLICIA, SECRETARIA
);

-- 2. Insertar los roles base
INSERT INTO roles (nombre_rol) VALUES ('ADMIN'), ('GENERAL'), ('POLICIA'), ('SECRETARIA');

-- 3. Modificar la tabla de Usuarios para usar FK de Roles
ALTER TABLE usuarios 
DROP COLUMN rol, -- Eliminamos el ENUM anterior
ADD COLUMN id_rol INT,
ADD FOREIGN KEY (id_rol) REFERENCES roles(id_rol);