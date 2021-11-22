CREATE TABLE `dim_usuarios` (
`id_usuario` int(10) NOT NULL,
`cargo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`edad` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
`contrato` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`antiguedad` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
`turno` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`genero` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`departamento_area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`nombre_empresa` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`id_empresa` int(10) NULL DEFAULT NULL,
`id_genero` int(10) NULL DEFAULT NULL,
`id_departamento` int(11) NULL DEFAULT NULL,
`id_sector` int(10) NULL DEFAULT NULL,
`sector` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`id_comunidad` int(10) NULL DEFAULT NULL,
`id_provincia` int(11) NULL DEFAULT NULL,
`centro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`id_empresa_padre` int(10) NULL DEFAULT NULL,
`empresa_padre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`edad_years` int(10) NULL DEFAULT NULL,
`antiguedad_years` int(10) NULL DEFAULT NULL,
`edad_etiqueta` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`antiguedad_etiqueta` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
PRIMARY KEY (`id_usuario`) 
)
ENGINE = InnoDB
AUTO_INCREMENT = 0
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `log_estados_psicoemocionales` (
`id_log` int(10) NOT NULL AUTO_INCREMENT,
`id_usuario` int(10) UNSIGNED NOT NULL,
`fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
`estado_inicial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`estado_final` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`area_psicoemocional` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`tipo_evolucion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
`countTest` int(10) NULL DEFAULT NULL,
`id_seguimiento` int(10) NULL DEFAULT NULL,
PRIMARY KEY (`id_log`) ,
INDEX `idus` (`id_usuario` ASC) USING BTREE,
INDEX `area_psicoemocional` (`area_psicoemocional` ASC) USING BTREE,
INDEX `val1` (`estado_final` ASC) USING BTREE,
INDEX `val2` (`estado_inicial` ASC) USING BTREE,
INDEX `logfechaest` (`fecha` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 15850
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `log_servicios` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`id_usuario` int(255) NOT NULL,
`id_curso` int(6) NULL DEFAULT NULL,
`id_seccion` int(6) NULL DEFAULT NULL,
`id_tipo_curso` int(11) NULL DEFAULT NULL,
`tipo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`fecha_crea` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
`id_seguimiento` int(10) NULL DEFAULT NULL,
PRIMARY KEY (`id`) ,
INDEX `index_` (`id_usuario` ASC) USING BTREE,
INDEX `index_fecha` (`fecha_crea` ASC) USING BTREE,
INDEX `tipindex` (`tipo` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Compact;

CREATE TABLE `log_solicitud` (
`id_seguimiento` int(10) NOT NULL,
`tratamiento` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`solicita` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`tiene_psicologo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`n_solicitudes` int(10) NULL DEFAULT NULL,
`solicitan` enum('empresa','personal') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`sesiones_consumidas` int(255) NULL DEFAULT NULL,
`tipo_usuario` enum('Alta','Fuga','Tratamiento') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`id_solicitud` int(10) NOT NULL AUTO_INCREMENT,
`solicitud_empresa` varchar(255) NULL,
PRIMARY KEY (`id_solicitud`) 
)
ENGINE = InnoDB
AUTO_INCREMENT = 0
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `tbl_absentismo` (
`id_absentismo` int(10) NOT NULL AUTO_INCREMENT,
`id_usuario` int(10) NULL DEFAULT NULL,
`fecha_inicio` date NULL DEFAULT NULL,
`fecha_final` date NULL DEFAULT NULL,
`dni` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
`tipo_absentismo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
`comentario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
`id_seguimiento` int(10) NULL,
PRIMARY KEY (`id_absentismo`) ,
INDEX `iduserab` (`id_usuario` ASC) USING BTREE,
INDEX `fecin` (`fecha_inicio` ASC) USING BTREE,
INDEX `fechafin` (`fecha_final` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 1
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `tblseguimientousuario` (
`id_seguimiento` int(10) NOT NULL AUTO_INCREMENT,
`id_usuario` int(10) NOT NULL,
`estado` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`actual` tinyint(4) NOT NULL,
`created_at` timestamp NOT NULL DEFAULT current_timestamp(),
`updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
`estado_inicial` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`estado_final` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`area_psicoemocional` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`tipo_evolucion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`fecha` datetime NULL DEFAULT NULL,
`trimestre` int(10) NULL DEFAULT NULL,
`mes` int(10) NULL DEFAULT NULL,
`year` int(10) NULL DEFAULT NULL,
`mes_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`trimestre_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
PRIMARY KEY (`id_seguimiento`) ,
INDEX `index_prueba` (`id_usuario` ASC) USING BTREE,
INDEX `fecha` (`created_at` ASC) USING BTREE,
INDEX `Fechaindseg` (`fecha` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 588
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Compact;


ALTER TABLE `dim_usuarios` ADD CONSTRAINT `fk_dim_usuarios_tblseguimientousuario_1` FOREIGN KEY (`id_usuario`) REFERENCES `tblseguimientousuario` (`id_usuario`);
ALTER TABLE `tblseguimientousuario` ADD CONSTRAINT `fk_tblseguimientousuario_tbl_absentismo_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `tbl_absentismo` (`id_seguimiento`);
ALTER TABLE `tblseguimientousuario` ADD CONSTRAINT `fk_tblseguimientousuario_log_solicitud_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `log_solicitud` (`id_segumiento`);
ALTER TABLE `tblseguimientousuario` ADD CONSTRAINT `fk_tblseguimientousuario_log_servicios_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `log_servicios` (`id_seguimiento`);
ALTER TABLE `tblseguimientousuario` ADD CONSTRAINT `fk_tblseguimientousuario_log_estados_psicoemocionales_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `log_estados_psicoemocionales` (`id_seguimiento`);

