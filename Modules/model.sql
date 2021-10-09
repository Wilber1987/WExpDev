CREATE TABLE `tbl_componentes` (
`id_componente` int NOT NULL AUTO_INCREMENT,
`nombre_componente` varchar(255) NULL,
`descripcion_componente` varchar(1000) NULL,
PRIMARY KEY (`id_componente`) 
);

CREATE TABLE `tbl_indicador` (
`id_indicador` int NOT NULL AUTO_INCREMENT,
`nombre_indicador` varchar(255) NULL,
`descripcion_indicador` varchar(1000) NULL,
`id_componente` int NULL,
PRIMARY KEY (`id_indicador`) 
);

CREATE TABLE `tbl_criterio` (
`id_criterio` int NOT NULL AUTO_INCREMENT,
`descripcion_criterio` varchar(1000) NULL,
`id_indicador` int NULL,
`id_tipo_pregunta` int NULL,
PRIMARY KEY (`id_criterio`) 
);

CREATE TABLE `tbl_evaluacion` (
`id_evaluacion` int NOT NULL AUTO_INCREMENT,
`id_criterio` int NULL,
`evaluacion` varchar(0) NULL,
`id_expediente` int NULL,
PRIMARY KEY (`id_evaluacion`) 
);

CREATE TABLE `cat_tipo_pregunta` (
`id_tipo_pregunta` int NOT NULL AUTO_INCREMENT,
`descripcion` varchar(255) NULL,
PRIMARY KEY (`id_tipo_pregunta`) 
);


ALTER TABLE `cat_tipo_pregunta` ADD CONSTRAINT `fk_cat_tipo_pregunta_tbl_criterio_1` FOREIGN KEY (`id_tipo_pregunta`) REFERENCES `tbl_criterio` (`id_tipo_pregunta`);
ALTER TABLE `tbl_componentes` ADD CONSTRAINT `fk_tbl_componentes_tbl_indicador_1` FOREIGN KEY (`id_componente`) REFERENCES `tbl_indicador` (`id_componente`);
ALTER TABLE `tbl_indicador` ADD CONSTRAINT `fk_tbl_indicador_tbl_criterio_1` FOREIGN KEY (`id_indicador`) REFERENCES `tbl_criterio` (`id_indicador`);
ALTER TABLE `tbl_criterio` ADD CONSTRAINT `fk_tbl_criterio_tbl_evaluacion_1` FOREIGN KEY (`id_criterio`) REFERENCES `tbl_evaluacion` (`id_criterio`);

