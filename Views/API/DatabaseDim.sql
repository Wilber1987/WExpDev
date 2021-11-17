CREATE TABLE `gpsi_psicologos` (
`id_psicologo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
`no_colegiado` varchar(180) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`cv_video` varchar(180) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`cv_doc` varchar(180) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`titulo` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`estado` varchar(180) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`id_area` int(10) UNSIGNED NOT NULL,
`id_usuario` int(10) UNSIGNED NOT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id_psicologo`) ,
INDEX `gpsi_psicologos_id_usuario_foreign` (`id_usuario` ASC) USING BTREE,
INDEX `gpsi_psicologos_id_area_foreign` (`id_area` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 14
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Compact;

CREATE TABLE `log_estados_psicoemocionales` (
`id_log` int(10) NOT NULL AUTO_INCREMENT,
`id_usuario` int(10) UNSIGNED NOT NULL,
`fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
`estado_inicial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`estado_final` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`area_psicoemocional` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
`tipo_evolucion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
`countTest` int(10) NULL DEFAULT NULL,
`id_seguimiento` int(10) NULL,
PRIMARY KEY (`id_log`) ,
INDEX `idus` (`id_usuario` ASC) USING BTREE,
INDEX `area_psicoemocional` (`area_psicoemocional` ASC) USING BTREE,
INDEX `val1` (`estado_final` ASC) USING BTREE,
INDEX `val2` (`estado_inicial` ASC) USING BTREE,
INDEX `logfechaest` (`fecha` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 257995
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
`id_seguimiento` int(10) NULL,
PRIMARY KEY (`id`) ,
INDEX `index_` (`id_usuario` ASC) USING BTREE,
INDEX `index_fecha` (`fecha_crea` ASC) USING BTREE,
INDEX `tipindex` (`tipo` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 11810
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Compact;

CREATE TABLE `tbl_absentismo` (
`id_absentismo` int(10) NOT NULL AUTO_INCREMENT,
`id_usuario` int(10) NULL DEFAULT NULL,
`fecha_inicio` date NULL DEFAULT NULL,
`fecha_final` date NULL DEFAULT NULL,
`dni` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
`tipo_absentismo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
`comentario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
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
`trimestre` int(10) NULL,
`mes` int(10) NULL,
`year` int(10) NULL,
`mes_name` varchar(255) NULL,
`trimestre_name` varchar(255) NULL,
PRIMARY KEY (`id_seguimiento`, `id_usuario`) ,
INDEX `index_prueba` (`id_usuario` ASC) USING BTREE,
INDEX `fecha` (`created_at` ASC) USING BTREE,
INDEX `Fechaindseg` (`fecha` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 33071
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Compact;

CREATE TABLE `gpsi_solicitud_psicologos` (
`id_solicitud` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
`no_autorizacion` varchar(180) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`descripcion` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`empresa` tinyint(4) NULL DEFAULT NULL,
`fecha_visto` datetime NULL DEFAULT NULL,
`localidad` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`precio_consulta` decimal(10,0) NOT NULL,
`estado` varchar(180) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`id_usuario` int(10) UNSIGNED NULL DEFAULT NULL,
`id_psicologo` int(10) UNSIGNED NULL DEFAULT NULL,
`fecha_prevista` datetime NOT NULL,
`hora_prevista` time NOT NULL,
`fecha_feedback` date NULL DEFAULT NULL,
`direccion` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`cod_provincia` int(11) NOT NULL,
`cp` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`tipo_solicitud` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`feedback` int(11) NOT NULL,
`centro_psicologico` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
`centro_telefono` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`clave` int(11) NOT NULL,
`test` tinyint(4) NOT NULL,
`presencial` tinyint(4) NOT NULL,
`fecha_feedback_correo` datetime NULL DEFAULT NULL,
`flag_recordatorio_c` tinyint(4) NOT NULL,
`flag_correo_3` tinyint(4) NOT NULL,
`flag_recordatorio` tinyint(4) NOT NULL,
`centro_direccion` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
`flag_feedback` datetime NULL DEFAULT NULL,
`id_solicitud_empresa` int(11) NULL DEFAULT NULL,
`created_at` timestamp NULL DEFAULT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`id_solicitud`) ,
INDEX `gpsi_solicitud_psicologos_id_usuario_foreign` (`id_usuario` ASC) USING BTREE,
INDEX `gpsi_solicitud_psicologos_id_psicologo_foreign` (`id_psicologo` ASC) USING BTREE,
INDEX `fechain` (`fecha_prevista` ASC) USING BTREE
)
ENGINE = InnoDB
AUTO_INCREMENT = 776
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Compact;

CREATE TRIGGER `insert_log_psicologo` After INSERT ON `gpsi_solicitud_psicologos` FOR EACH ROW BEGIN

			IF EXISTS(SELECT id  FROM log_servicios WHERE tipo = 'psicologo' and id_usuario = NEW.id_usuario
			and (month(fecha_crea) = MONTH(NOW()) AND YEAR(fecha_crea) = YEAR(NOW()))) 
			-- OR (month(fecha_crea) = MONTH(NEW.updated_at) AND YEAR(fecha_crea) = YEAR(NEW.updated_at)) ))
			THEN 
				-- no se inserta porq ya existe el registro
					set @value=@value;-- or print 'TODO' etc
			ELSE 
				
					INSERT INTO log_servicios SET
					log_servicios.id_usuario = NEW.id_usuario,
					log_servicios.id_curso = NEW.id_solicitud,
					log_servicios.id_seccion = NEW.id_solicitud,
					log_servicios.id_tipo_curso = 7,
					log_servicios.tipo= 'psicologo',
					log_servicios.fecha_crea= NOW();
			END IF;
end;
CREATE TRIGGER `update_log_psicologo` After UPDATE ON `gpsi_solicitud_psicologos` FOR EACH ROW BEGIN

			IF EXISTS(SELECT id  FROM log_servicios WHERE tipo = 'psicologo' and id_usuario = NEW.id_usuario
			and (month(fecha_crea) = MONTH(NOW()) AND YEAR(fecha_crea) = YEAR(NOW()))) 
			-- OR (month(fecha_crea) = MONTH(NEW.updated_at) AND YEAR(fecha_crea) = YEAR(NEW.updated_at)) ))
			THEN 
				-- no se inserta porq ya existe el registro
					set @value=@value;-- or print 'TODO' etc
			ELSE 
				
					INSERT INTO log_servicios SET
					log_servicios.id_usuario = NEW.id_usuario,
					log_servicios.id_curso = NEW.id_solicitud,
					log_servicios.id_seccion = NEW.id_solicitud,
					log_servicios.id_tipo_curso = 7,
					log_servicios.tipo= 'psicologo',
					log_servicios.fecha_crea= NOW();
			END IF;
end;

CREATE TABLE `log_absentismo` (

);

CREATE TABLE `log_absentismo` (
`id_absentismo` int(10) NOT NULL AUTO_INCREMENT,
`id_seguimiento` int(10) NULL DEFAULT NULL,
`tipo_absentismo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
PRIMARY KEY (`id_absentismo`) ,
INDEX `iduserab` (`id_seguimiento` ASC) USING BTREE
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

CREATE TABLE `dim_usuarios` (
`id_usuario` int(10) NOT NULL,
`cargo` varchar(255) NULL,
`edad` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
`contrato` varchar(255) NULL,
`antiguedad` timestamp NULL ON UPDATE CURRENT_TIMESTAMP,
`turno` varchar(255) NULL,
`genero` varchar(255) NULL,
`departamento_area` varchar(255) NULL,
`nombre_empresa` varchar(255) NULL,
`id_empresa` int(10) NULL,
`id_genero` int(10) NULL,
`id_departamento` int(11) NULL,
`id_sector` int(10) NULL,
`sector` varchar(255) NULL,
`id_comunidad` int(10) NULL,
`id_provincia` int(11) NULL,
`centro` varchar(255) NULL,
`id_empresa_padre` int(10) NULL,
`empresa_padre` varchar(255) NULL,
`edad_years` int(10) NULL,
`antiguedad_years` int(10) NULL,
`edad_etiqueta` varchar(255) NULL,
`antiguedad_etiqueta` varchar(255) NULL,
PRIMARY KEY (`id_usuario`) 
);

CREATE TABLE `log_solicitud` (
`id_segumiento` int(10) NOT NULL,
`tratamiento` varchar(255) NULL,
`solicita` varchar(255) NULL,
`tiene_psicologo` varchar(255) NULL,
`n_solicitudes` int(10) NULL,
`solicitan` enum(empresa, personal) NULL,
`sesiones_consumidas` int(255) NULL,
`tipo_usuario` enum(Alta, Fuga, Tratamiento) NULL,
PRIMARY KEY (`id_segumiento`) 
);


ALTER TABLE `gpsi_solicitud_psicologos` ADD CONSTRAINT `gpsi_solicitud_psicologos_id_psicologo_foreign` FOREIGN KEY (`id_psicologo`) REFERENCES `gpsi_psicologos` (`id_psicologo`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `tblseguimientousuario` ADD CONSTRAINT `fk_tblseguimientousuario_log_servicios_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `log_servicios` (`id_seguimiento`);
ALTER TABLE `tblseguimientousuario` ADD CONSTRAINT `fk_tblseguimientousuario_log_estados_psicoemocionales_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `log_estados_psicoemocionales` (`id_seguimiento`);
ALTER TABLE `tblseguimientousuario` ADD CONSTRAINT `fk_tblseguimientousuario_log_absentismo_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `log_absentismo` (`id_seguimiento`);
ALTER TABLE `dim_usuarios` ADD CONSTRAINT `fk_dim_usuarios_tblseguimientousuario_1` FOREIGN KEY (`id_usuario`) REFERENCES `tblseguimientousuario` (`id_usuario`);
ALTER TABLE `tblseguimientousuario` ADD CONSTRAINT `fk_tblseguimientousuario_log_solicitud_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `log_solicitud` (`id_segumiento`);

