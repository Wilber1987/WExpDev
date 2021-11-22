SELECT `US`.`id_usuario` AS `id_usuario`,
    `US`.`centro` AS `centro`,
    `US`.`cargo` AS `CARGO`,
    `US`.`edad` AS `edad`,
    `US`.`contrato` AS `contrato`,
    `US`.`antiguedad` AS `antiguedad`,
    `US`.`turno` AS `turno`,
    `US`.`id_genero` AS `id_genero`,
    `TG`.`descripcion` AS `genero`,
    `US`.`id_departamento` AS `id_departamento`,
    `US`.`departamento_area` AS `departamento_area`,
    `US`.`id_empresa` AS `id_empresa`,
    `EMP`.`nombre_empresa` AS `nombre_empresa`,
    `EMP`.`id_sector` AS `id_sector`,
    `TS`.`descripcion` AS `sector`,
    `US`.`id_comunidad` AS `id_comunidad`,
    `US`.`id_provincia` AS `id_provincia`,
    `EMP`.`id_empresa_padre` AS `id_empresa_padre`,
    `EMPP`.`nombre_empresa` AS `empresa_padre`,
    (((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) AS edad_years,
    (((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) AS antiguedad_years,
		 (
        CASE
            WHEN (
                ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 18)
                AND ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 28)
            ) THEN '18 a 28'
            WHEN (
                ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 29)
                AND ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 39)
            ) THEN '29 a 39'
            WHEN (
                ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 40)
                AND ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 50)
            ) THEN '40 a 50'
            WHEN (
                ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 51)
                AND ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 61)
            ) THEN '51 a 61'
            WHEN (
                ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 62)
                AND ((((YEAR (`US`.`edad`) - YEAR (now())) - ( date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 250)
            ) THEN 'Más de 61'
            ELSE 0
        END
    ) AS `edad_etiqueta`,
    (
        CASE
            WHEN ((((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 1) THEN 'Menos de 1 año'
            WHEN (
                ((((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 1)
                AND ((((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 3)
            ) THEN 'De 1 a 3 años'
            WHEN (
                ((((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 4)
                AND ((((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 6)
            ) THEN 'De 4 a 6 años'
            WHEN (
                ((((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 7)
                AND ((((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) <= 10)
            ) THEN 'De 7 a 10 años'
            WHEN ((((YEAR (`US`.`antiguedad`) - YEAR (now())) - (date_format(`US`.`edad`, '%m%d') < date_format(now(), '%m%d'))) * - (1)) >= 10) THEN 'Más de 10 años'
            ELSE 'Más de 10 años'
        END
    ) AS `antiguedad_etiqueta`
FROM (
        (
            (
                (
                    `usuarios` `US`
                    JOIN `cat_empresas` `EMP` ON ((`EMP`.`id_empresa` = `US`.`id_empresa`))
                )
                JOIN `cat_sectores` `TS` ON ((`TS`.`id_sector` = `EMP`.`id_sector`))
            )
            JOIN `cat_generos` `TG` ON ((`TG`.`id_genero` = `US`.`id_genero`))
        )
        LEFT JOIN `cat_empresas` `EMPP` ON (
            (`EMPP`.`id_empresa` = `EMP`.`id_empresa_padre`)
        )
    ) 