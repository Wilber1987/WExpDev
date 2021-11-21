<?php
handle();

function Get($conect, $tableName, $condicion = "")
{
    //$conect = new mysqli('localhost', 'root', '', 'psicovitalem');
    $Form = [];
    $q = $conect->query("SELECT * FROM  $tableName $condicion");   
    while ($fila = $q->fetch_object()) {
        $Form[] = $fila;
    }
    return $Form;
}
function GetQuery($conect, $Query)
{
    $Form = [];
    $q = $conect->query($Query);
    while ($fila = $q->fetch_object()) {
        $Form[] = $fila;
    }
    return $Form;
}
function InsertEscalar($pMysqli, $Query)
{
    $response = mysqli_query($pMysqli, $Query);
    if ($response) {
        return array('success' => "true", "id"=>GetQuery($pMysqli, "SELECT LAST_INSERT_ID() as id")[0]->id);
    } else {
        echo "query: $Query <hr>";
        return array('success' => "false");
    }
}
function trimestre($datetime)
    {
        $mes = date("m",strtotime($datetime));//Referencias: http://stackoverflow.com/a/3768112/1883256
        $mes = is_null($mes) ? date('m') : $mes;
        $trim=floor(($mes-1) / 3)+1;
        return $trim;
    }
    function InsertOrUpdateDIMU($CM_Con, $key){
        $QueryInsertUsuarios = "INSERT INTO dim_usuarios(
            id_usuario, 
            centro, 
            cargo, 
            edad, 
            contrato, 
            antiguedad, 
            turno, 
            id_genero, 
            genero, 
            id_departamento, 
            departamento_area, 
            id_empresa, 
            nombre_empresa, 
            id_sector, 
            sector, 
            id_comunidad, 
            id_provincia, 
            id_empresa_padre, 
            empresa_padre, 
            edad_years, 
            antiguedad_years,
            edad_etiqueta,
            antiguedad_etiqueta
        ) values(
            $key->id_usuario, 
            '$key->centro', 
            '$key->CARGO', 
            '$key->edad', 
            '$key->contrato', 
            '$key->antiguedad', 
            '$key->turno', 
            $key->id_genero, 
            '$key->genero', 
            $key->id_departamento, 
            '$key->departamento_area', 
            $key->id_empresa, 
            '$key->nombre_empresa', 
            $key->id_sector, 
            '$key->sector', 
            $key->id_comunidad, 
            $key->id_provincia, 
            $key->id_empresa_padre, 
            '$key->empresa_padre', 
            $key->edad_years, 
            $key->antiguedad_years,
            $key->edad_etiqueta, 
            $key->antiguedad_etiqueta
        )";
        $QueryUpdateUsuarios = "UPDATE  dim_usuarios set
            id_usuario = $key->id_usuario,  
            centro = '$key->centro',  
            cargo = '$key->CARGO',  
            edad = '$key->edad',  
            contrato = '$key->contrato',  
            antiguedad = '$key->antiguedad',  
            turno = '$key->turno',  
            id_genero = $key->id_genero,  
            genero = '$key->genero',  
            id_departamento = $key->id_departamento,  
            departamento_area = '$key->departamento_area',  
            id_empresa = $key->id_empresa,  
            nombre_empresa = '$key->nombre_empresa',  
            id_sector = $key->id_sector,  
            sector = '$key->sector',  
            id_comunidad = $key->id_comunidad,  
            id_provincia = $key->id_provincia,  
            id_empresa_padre = $key->id_empresa_padre,  
            empresa_padre = '$key->empresa_padre',  
            edad_years = $key->edad_years,  
            antiguedad_years = $key->antiguedad_years,
            edad_etiqueta = $key->edad_etiqueta, 
            antiguedad_etiqueta = $key->antiguedad_etiqueta
            where  id_usuario = $key->id_usuario
        ";
        $contUsuas = Get($CM_Con, "dim_usuarios", "WHERE id_usuario = $key->id_usuario"); 
        if (count($contUsuas) == 0) {
            $seguimiento = InsertEscalar($CM_Con, $QuerySeg);
        } else {
            mysqli_query($CM_Con, $QueryUpdateUsuarios );
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
        //echo "lista: ". json_encode(count($Usuarios)) . "<hr>";
        //echo print_r( $Usuarios);
        //return;
        foreach ($Usuarios as $key) //recorrer todos los usuarios
        {
            echo "objeto: ". json_encode($key) . "<hr>";
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
            if (count($consultaLogueo) == 0 && count($seguimientoAct) != 0)  {
                $AstadoA = "Fuga";
            } else if (count($consultaLogueo) != 0 && count($seguimientoAct) != 0) {
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
            if (count($seguimientoAct) !=0) {
                $seguimientoAct = $seguimientoAct[0]->id_seguimiento;
                echo print_r($seguimientoAct)."<hr>";
                mysqli_query($CM_Con, "UPDATE tblseguimientousuario set estado = 0
                where id_seguimiento = $seguimientoAct"
            );

            }
            $current_month = date('m',strtotime($actual));
            $current_year = date('Y',strtotime($actual));
            $trimestre = trimestre($actual);
            $QuerySeg = "INSERT INTO tblseguimientousuario(
                    id_usuario,
                    estado,
                    actual,
                    created_at,
                    updated_at,
                    fecha,
                    trimestre,
                    mes,
                    year
                    )
                VALUES (
                    $key->id_usuario,
                   '$AstadoA',
                    1,
                    '$actual',
                    '$actual',
                    '$actual',
                    $trimestre,
                    $current_month,
                    $current_year
            )";
            $seguimiento = InsertEscalar($CM_Con, $QuerySeg);
            
            InsertOrUpdateDIMU($CM_Con, $key);
            echo print_r($seguimiento)."<hr>";
            $id_seguimiento = $seguimiento["id"];
            $estadosObtenidosA = array();
            $estadosObtenidosN =  array();
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
            //LOGS servicios----------------------------------------------------------------------->
            //TESTs
            $Log = GetQuery($base_Con, "SELECT id FROM log_servicios
                WHERE tipo = 'test'
                and id_usuario = $key->id_usuario
                and (month(fecha_crea) = MONTH(NOW())
                AND YEAR(fecha_crea) = YEAR(NOW()))");
            if (count($Log) == 0) {
                echo "" . "<hr>";

                $Log2 = GetQuery($base_Con, "SELECT * FROM gt_tu_resultados
                where id_usuario = $key->id_usuario
                and (month(fecha) = MONTH(NOW())
                AND YEAR(fecha) = YEAR(NOW()))");
               
                if (count($Log2) != 0) {
                    $Log2O = $Log2[0];
                    mysqli_query($CM_Con, "INSERT INTO log_servicios (
                     $id_seguimiento,
                     $key->id_usuario,
                     $Log2O->id_test,
                     $Log2O->id_test,
                     7,
                     'test',
                     NOW());");
                }
            }
            //entrenamientos
            $Log = GetQuery($base_Con, "SELECT id FROM log_servicios
                WHERE tipo = 'area'
                and id_usuario = $key->id_usuario
                and (month(fecha_crea) = MONTH(NOW())
                AND YEAR(fecha_crea) = YEAR(NOW()))");
            if (count($Log) == 0) {
                $Log2 = GetQuery(
                    $base_Con,
                    "SELECT * FROM `gte_curso_usuarios` 
                    INNER JOIN gte_cursos on gte_curso_usuarios.id_curso = gte_cursos.id_curso
                    where id_usuario = $key->id_usuario GROUP BY id_tipo_curso"
                );
                foreach ($Log2 as $curso) //recorrer todos los usuarios
                {
                    $tipo = "area";
                    switch ($curso->id_tipo_curso) {
                        case 2:
                            $tipo = "taller";
                        case 3:
                            $tipo = "entrenamiento en directo";
                            break;
                    }
                    mysqli_query($CM_Con, "INSERT INTO log_servicios (
                     $id_seguimiento,
                     $key->id_usuario,
                     $curso->id_curso,
                     1,
                     1,
                     $tipo,
                     NOW());");
                }

            }
            $Log = GetQuery($base_Con, "SELECT id FROM log_servicios
                WHERE tipo = 'foro'
                and id_usuario = $key->id_usuario
                and (month(fecha_crea) = MONTH(NOW())
                AND YEAR(fecha_crea) = YEAR(NOW()))");
            if (count($Log) == 0) {
                $Log2 = GetQuery($base_Con, "SELECT id_foro, gf_topics.id_topic
                from gf_respuestas_topics 
                INNER JOIN gf_topics on gf_respuestas_topics.id_topic = gf_topics.id_topic
                where id_usuario = $key->id_usuario
                and (month(gf_topics.fecha_crea) = MONTH(NOW())
                AND YEAR(gf_topics.fecha_crea) = YEAR(NOW()))");
                if (count($Log2) != 0) {
                    mysqli_query($CM_Con, "INSERT INTO log_servicios SET
                    id_seguimiento = $id_seguimiento,
                    id_usuario = $key->id_usuario,
                    id_curso = $Log2->id_foro,
                    id_seccion = $Log2->id_topic,
                    id_tipo_curso = 4,
                    tipo= 'foro',
                    fecha_crea= NOW();");
                }
            }
            $Log = GetQuery($base_Con, "SELECT id FROM log_servicios
                WHERE tipo = 'llamada'
                and id_usuario = $key->id_usuario
                and (month(fecha_crea) = MONTH(NOW())
                AND YEAR(fecha_crea) = YEAR(NOW()))");
            if (count($Log) == 0) {
                $Log2 = GetQuery($base_Con, "SELECT id 
                from historials 
                where id_usuario = $key->id_usuario
                and (month(fecha) = MONTH(NOW())
                AND YEAR(fecha) = YEAR(NOW()))");
                if (count($Log2) != 0) {
                    mysqli_query($CM_Con, "INSERT INTO log_servicios (
                     $id_seguimiento,
                     $key->id_usuario,
                     $Log2->id,
                     $Log2->id,
                     5,
                     'llamada',
                     NOW()
                    );");
                }
            }
            $Log = GetQuery($base_Con, "SELECT id FROM log_servicios
                WHERE tipo = 'chat'
                and id_usuario = $key->id_usuario
                and (month(fecha_crea) = MONTH(NOW())
                AND YEAR(fecha_crea) = YEAR(NOW()))");
            if (count($Log) == 0) {
                $Log2 = GetQuery($base_Con, "SELECT id 
                from historial_mensajes 
                where id_usuario = $key->id_usuario
                and (month(fecha) = MONTH(NOW())
                AND YEAR(fecha) = YEAR(NOW()))");
                if (count($Log2) != 0) {
                    $Log2O = $Log2[0];
                    mysqli_query($CM_Con, "INSERT INTO log_servicios (
                         $id_seguimiento,
                         $key->id_usuario,
                         $Log2O->id,
                         $Log2O->id,
                         6,
                         'chat',
                         NOW();
                    )");
                }
            }
            //ABSENTISMO------------------------------------------------------------------------->
            $Log = GetQuery($base_Con, "SELECT id_absentismo FROM tbl_absentismo
                WHERE  id_usuario = $key->id_usuario
                and (month(fecha_inicio) = MONTH(NOW())
                AND YEAR(fecha_inicio) = YEAR(NOW()))");
            if (count($Log) != 0) {
                $LogObject = $Log[0];
                mysqli_query($CM_Con, "INSERT INTO tbl_absentismo(
                    id_seguimiento,
                    id_absentismo,
                    fecha_inicio,
                    fecha_final,
                    id_usuario,
                    comentario
                ) values(
                    $id_seguimiento,
                    $LogObject->id_absentismo,
                    '$LogObject->fecha_inicio',
                    '$LogObject->fecha_final',
                    $key->id_usuario,
                    '$key->comentario'
                )"
                );                
            }

             //psicologos------------------------------------------------------------------------->
             $Log = GetQuery($base_Con, "SELECT * FROM `gpsi_solicitud_psicologos`
             WHERE  id_usuario = $key->id_usuario
             and (month(fecha_inicio) = MONTH(NOW())
             AND YEAR(fecha_inicio) = YEAR(NOW()))");
            if (count($Log) != 0) {
                $LogObject = $Log[0];
                mysqli_query($CM_Con, "INSERT INTO `cm_data`.`log_solicitud`(
                    `id_segumiento`,
                    `tratamiento`,
                    `solicita`,
                    `tiene_psicologo`,
                    `n_solicitudes`,
                    `solicitan`,
                    `sesiones_consumidas`,
                    `tipo_usuario`
                    `id_solicitud`
                    ) VALUES (
                        $id_seguimiento, 
                        NULL, 
                        NULL,
                        NULL, 
                        NULL, 
                        NULL, 
                        NULL, 
                        NULL, 
                        $LogObject->id_solicitud
                    );"
                );                
            }
        }

    } catch (\Throwable $th) {
        throw $th;
    }
}
