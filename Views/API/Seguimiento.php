<?php
handle();

function Get($conect, $tableName, $condicion = "")
{
    $Form = [];
    $q = $conect->query("SELECT * FROM  $tableName $condicion");
    foreach ($q as $row) {
        $Form[] = $row;
    }
    return $Form;
}
function GetQuery($conect, $Query)
{
    $Form = [];
    $q = $conect->query($Query);
    foreach ($q as $row) {
        $Form[] = $row;
    }
    return $Form;
}
function InsertEscalar($pMysqli, $Query)
{
    $response = mysqli_query($pMysqli, $Query."; SELECT LAST_INSERT_ID();");
    if ($response) {
        return array('success' => "true");
    } else {
        return array('success' => "false");
    }
}

function handle()
{
    $actual = date("Y-m-d"); //fecha actual
    $timestamp = strtotime($actual);
    $diasdelmes = date("t", $timestamp);
    $inicio30 = date("Y-m-1");
    $fin30 = date("Y-m-" . $diasdelmes);
    $ESTADOS = ['Ansiedad', 'Estado de ánimo bajo',
        'Estrés', "Bienestar Psicológico",
        "Estrés laboral", "Bienestar Laboral General"];

    $dimencionesEL = json_decode('[
        { "id_":"Política","Descripcion":"Política de la empresa"},
        { "id_":"Sueldo","Descripcion":"Sueldo"},
        { "id_":"Relaciones con el jefe","Descripcion":"Relaciones con el jefe"},
        { "id_":"Condiciones de trabajo","Descripcion":"Condiciones de trabajo"},
        { "id_":"Relaciones con los compañeros","Descripcion":"Relaciones con los compañeros"},
        { "id_":"Vida personal","Descripcion":"Vida personal"},
        { "id_":"Status","Descripcion":"Status"},
        { "id_":"Supervisión","Descripcion":"Supervisión"},
        { "id_":"Seguridad","Descripcion":"Seguridad"},
        { "id_":"Responsabilidad","Descripcion":"Responsabilidad otorgada"},
        { "id_":"Trabajo en sí mismo","Descripcion":"Trabajo en sí mismo"},
        { "id_":"Crecimiento y promoción","Descripcion":"Crecimiento y promoción"},
        { "id_":"Reconocimiento","Descripcion":"Reconocimiento otorgado"},
        { "id_":"Igualdad","Descripcion":"Políticas de Igualdad"},
        { "id_":"Logro","Descripcion":"Logro alcanzado"}
    ]');
    $dimencionesBP = json_decode('[
        { "id_":"Autoaceptación","Descripcion":"Autoaceptación"},
        { "id_":"Relaciones positivas","Descripcion":"Relaciones positivas"},
        { "id_":"Autonomía","Descripcion":"Autonomía"},
        { "id_":"Dominio del entorno","Descripcion":"Dominio del entorno"},
        { "id_":"Crecimiento personal","Descripcion":"Crecimiento personal"},
        { "id_":"Propósito de vida","Descripcion":"Propósito de vida"}
    ]');
    $fecha = date("Y-m-d");
    try {
        $base_Con = new mysqli('localhost', 'root', '', 'psicovitalem');
        $CM_Con = new mysqli('localhost', 'root', '', 'cm_data');
        $Usuarios = Get($base_Con, "vw_join_usuarios");
        foreach ($Usuarios as $key) //recorrer todos los usuarios
        {
            $consultaLogueo = Get(
                $base_Con,
                "tbllogueo",
                "WHERE (FechaHoraLogin  Between '$inicio30' and  '$fin30') and id_usuario = $key->id_usuario"
            );
            $AstadoA = "Nuevo";
            $seguimientoAct = Get(
                $CM_Con,
                "tblseguimientousuario",
                "WHERE id_usuario = $key->id_usuario and actual = 1"
            );
            if (count($consultaLogueo) == 0 && count($seguimientoAct) != 0) {
                $AstadoA = "Fuga";
            } else if (count($consultaLogueo) != 0 &&  count($seguimientoAct) != 0) {
                if ($seguimientoAct[0]->estado == 'Fuga') //si eras fuga entonces pasas a ser recuperado
                {
                    $AstadoA = "Recuperado";
                } else if ($seguimientoAct[0]->estado == 'Recuperado') {
                    $AstadoA = "Activo";
                } else if ($seguimientoAct[0]->estado == 'Nuevo') {
                    $AstadoA = "Activo";
                } else {
                    $AstadoA = "Activo";
                }
            }
            mysqli_query($CM_Con, "UPDATE tblseguimientousuario set estado = 0 
                where id_seguimiento = $seguimientoAct->id_seguimiento"
            );

            $QuerySeg = "INSERT INTO tblseguimientousuario(
                    id_usuario,
                    estado,
                    actual,
                    created_at,
                    updated_at,
                    fecha
                    )
                VALUES (
                    $key->id_usuario,
                    $AstadoA,
                    1,
                    '$actual',
                    '$actual',
                    '$actual'
            )";
            $seguimiento = InsertEscalar($CM_Con, $QuerySeg);
            $id_seguimiento = $seguimiento->id;
            foreach ($ESTADOS as $keyEstate) {
                $QueryData = "SELECT TR.id_usuario,
                    (SELECT estado_psicoemocional from gt_tu_resultados
                    WHERE id_usuario = TR.id_usuario and area_psicoemocional = '$keyEstate'
                    ORDER BY fecha desc LIMIT 1) as estadoFinal,
                    (SELECT id_test from gt_tu_resultados
                    WHERE id_usuario = TR.id_usuario and area_psicoemocional = '$keyEstate'
                    ORDER BY fecha desc LIMIT 1) as IdTest,
                    (SELECT estado_psicoemocional from gt_tu_resultados
                    WHERE id_usuario = TR.id_usuario and area_psicoemocional = '$keyEstate'
                    AND estado_psicoemocional != estadoFinal
                    ORDER BY fecha desc LIMIT 1) as estadoInicial
                    from usuarios as TR where id_usuario = $key->id_usuario";
                $UserObtenido2 = GetQuery($base_Con, $QueryData);
                if (count($UserObtenido2) == 0) {
                    continue;
                }
                $User = $UserObtenido2[0];
                $valor = null;
                $valor2 = null;
                if ($User->estadoInicial != null) {
                    $valor = $User->estadoInicial;
                }
                if ($User->estadoFinal != null) {
                    $valor2 = $User->estadoFinal;
                }
                $tipo_evo = "-";
                if ($valor == $valor2) {
                    $tipo_evo = "Neutra";
                } else if (($valor == "Naranja" && $valor2 == "Verde") ||
                    ($valor == "Fresa" && $valor2 == "Verde") ||
                    ($valor == "Fresa" && $valor2 == "Naranja")) {
                    $tipo_evo = "Positiva";
                } else if (($valor == "Verde" && $valor2 == "Naranja") ||
                    ($valor == "Verde" && $valor2 == "Fresa") ||
                    ($valor == "Naranja" && $valor2 == "Fresa")) {
                    $tipo_evo = "Negativa";
                }
                $query = mysqli_query($CM_Con, "INSERT
                    INTO log_estados_psicoemocionales(id_seguimiento, id_usuario, fecha, estado_inicial, estado_final, area_psicoemocional, tipo_evolucion)
                    VALUES ($id_seguimiento, $User->id_usuario,'$fecha','$User->estadoInicial','$User->estadoFinal','$keyEstate','$tipo_evo');"
                );
                if ($keyEstate == "Bienestar Laboral General" || $keyEstate == "Bienestar Psicológico") {
                    if ($keyEstate == "Bienestar Laboral General") {
                        $dimencion = $dimencionesEL;
                    } else if ($keyEstate == "Bienestar Psicológico") {
                        $dimencion = $dimencionesBP;
                    }
                    foreach ($dimencion as $key2) {
                        $subQuery = "SELECT TR.id_usuario,
                       (SELECT estado_psicoemocional from gt_tu_resultados
                       WHERE id_usuario = TR.id_usuario and area_psicoemocional = '$key2->id_'
                       ORDER BY fecha desc LIMIT 1) as estadoFinal,
                       (SELECT id_test from gt_tu_resultados
                       WHERE id_usuario = TR.id_usuario and area_psicoemocional = '$key2->id_'
                       ORDER BY fecha desc LIMIT 1) as IdTest,
                       (SELECT estado_psicoemocional from gt_tu_resultados
                       WHERE id_usuario = TR.id_usuario and area_psicoemocional = '$key2->id_'
                       AND estado_psicoemocional != estadoFinal
                       ORDER BY fecha desc LIMIT 1) as estadoInicial
                       from usuarios as TR where id_usuario = $key->id_usuario
                       ";
                        $User2Obtenido = GetQuery($base_Con, $subQuery);
                        if (count($User2Obtenido) == 0) {
                            continue;
                        }
                        $User2 = $User2Obtenido[0];
                        $valorDimencion = $User2->estadoInicial;
                        $valorDimencion2 = $User2->estadoFinal;
                        $tipo_evo2 = "-";
                        if ($valorDimencion == $valorDimencion2) {
                            $tipo_evo2 = "Neutra";
                        } else if (($valorDimencion == "Naranja" && $valorDimencion2 == "Verde") ||
                            ($valorDimencion == "Fresa" && $valorDimencion2 == "Verde") ||
                            ($valorDimencion == "Fresa" && $valorDimencion2 == "Naranja")) {
                            $tipo_evo2 = "Positiva";
                        } else if (($valorDimencion == "Verde" && $valorDimencion2 == "Naranja") ||
                            ($valorDimencion == "Verde" && $valorDimencion2 == "Fresa") ||
                            ($valorDimencion == "Naranja" && $valorDimencion2 == "Fresa")) {
                            $tipo_evo2 = "Negativa";
                        }
                        $querySub = mysqli_query($CM_Con, "INSERT
                            INTO log_estados_psicoemocionales(id_seguimiento , id_usuario, fecha, estado_inicial, estado_final, area_psicoemocional, tipo_evolucion)
                            VALUES ($id_seguimiento, $User2->id_usuario,'$fecha','$User2->estadoInicial','$User2->estadoFinal','$key2->id_','$tipo_evo2');"
                        );
                    }
                }
                if ($valor != null) {
                    array_push($estadosObtenidosA, $valor);
                }
                if ($valor2 != null) {
                    array_push($estadosObtenidosN, $valor2);
                }

            }
            $AreaP = "BienestarGeneral";
            $estadoInicial = "Verde";
            $estadoFinal = "Verde";
            foreach ($estadosObtenidosA as $keyEA) {
                if ($keyEA == 'Naranja') {
                    $estadoInicial = "Naranja";
                } else if ($keyEA == 'Fresa') {
                    $estadoInicial = "Fresa";
                }
            }
            foreach ($estadosObtenidosN as $keyEN) {
                if ($keyEN == 'Naranja') {
                    $estadoFinal = "Naranja";
                } else if ($keyEN == 'Fresa') {
                    $estadoFinal = "Fresa";
                }
            }
            $ValorSeg = $estadoInicial;
            $ValorSeg2 = $estadoFinal;
            $tipoEvolucion = "-";
            if ($ValorSeg == $ValorSeg2) {
                $tipoEvolucion = "Neutra";
            } else if (($ValorSeg == "Naranja" && $ValorSeg2 == "Verde") ||
                ($ValorSeg == "Fresa" && $ValorSeg2 == "Verde") ||
                ($ValorSeg == "Fresa" && $ValorSeg2 == "Naranja")) {
                $tipoEvolucion = "Positiva";
            } else if (($ValorSeg == "Verde" && $ValorSeg2 == "Naranja") ||
                ($ValorSeg == "Verde" && $ValorSeg2 == "Fresa") ||
                ($ValorSeg == "Naranja" && $ValorSeg2 == "Fresa")) {
                $tipoEvolucion = "Negativa";
            }
            mysqli_query($CM_Con, "UPDATE `tblseguimientousuario` SET                
                `estado_inicial` = '$estadoInicial',
                `estado_final` = '$estadoFinal',
                `area_psicoemocional` = 'BienestarGeneral',
                `tipo_evolucion` = '$tipoEvolucion'
                where id_seguimiento = $id_seguimiento"
            );
            //LOGS
            $Log =  GetQuery($base_Con, "SELECT id FROM log_servicios 
                WHERE tipo = 'test' 
                and id_usuario = $key->id_usuario
                and (month(fecha_crea) = MONTH(NOW()) 
                AND YEAR(fecha_crea) = YEAR(NOW()))");
            if (count($Log) == 0) {
                $Log2 =  GetQuery($base_Con, "SELECT id_test FROM gt_tu_resultados 
                where id_usuario = $key->id_usuario
                and (month(fecha_crea) = MONTH(NOW()) 
                AND YEAR(fecha_crea) = YEAR(NOW()))");
                if (count($Log2) != 0) {
                    mysqli_query($CM_Con, "INSERT INTO log_servicios SET
                    log_servicios.id_usuario = $key->id_usuario,
                    log_servicios.id_curso = $Log2->id_test,
                    log_servicios.id_seccion = $Log2->id_test,
                    log_servicios.id_tipo_curso = 7,
                    log_servicios.tipo= 'test',
                    log_servicios.fecha_crea= NOW();");
                }
            }
        }

    } catch (\Throwable $th) {
        throw $th;
    }
}
