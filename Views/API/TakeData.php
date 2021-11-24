<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json; charset=utf-8');
header("Content-Type: text/html;charset=utf-8");
$JSONData = file_get_contents("php://input");
$Data = json_decode($JSONData);
$Function = $_GET["function"];
$Function($Data);
function GetQuery($conect, $Query)
{
    try {
        $Form = [];
        $q = $conect->query($Query);
        while ($fila = $q->fetch_object()) {
            $Form[] = $fila;
        }
        return $Form;
    } catch (\Throwable $th) {
        echo "error: $Query <hr>";
    }
}
function handle($Data)
{
    $CM_Con = new mysqli('localhost', 'root', '', 'cm_data');
    $Seguimiento = GetQuery($CM_Con, "SELECT * FROM tblseguimientousuario as ls
        INNER JOIN dim_usuarios as du ON du.id_usuario = ls.id_usuario
        WHERE ls.fecha BETWEEN '$Data->fecha1' and '$Data->fecha2'
        limit 200
    ");
    foreach ($Seguimiento as $seg) //recorrer todos los usuarios
    {
        $seg->{"Estados"} = GetQuery($CM_Con, "SELECT * FROM log_estados_psicoemocionales
         WHERE id_seguimiento = $seg->id_seguimiento");
        $seg->{"Servicios"} = GetQuery($CM_Con, "SELECT * FROM log_servicios
         WHERE id_seguimiento = $seg->id_seguimiento");
        $seg->{"Solicitudes"} = GetQuery($CM_Con, "SELECT * FROM log_solicitud
         WHERE id_seguimiento = $seg->id_seguimiento");
        $seg->{"Absentismo"} = GetQuery($CM_Con, "SELECT * FROM tbl_absentismo
         WHERE id_seguimiento = $seg->id_seguimiento");
    }
    echo json_encode($Seguimiento);
    return;
}
function Report( $Params)
{
    $DIM = "";
    $DIMCondicion = "";
    if ($Params->Dimencion != "") {
        $DIM = " INNER JOIN $Params->Dimencion  ON $Params->Dimencion.id_seguimiento = ls.id_seguimiento ";
    }
    if (count($Params->DIMCondicion) > 0) {
        $values = "";
        foreach ($Params->DIMCondicion as $key) {
            $values = $values."$key->id_,";
        }
        $values = substr($values, 0, -1);
        $DIMCondicion = " AND $Params->Dimencion.id_seguimiento IN ($values) ";
    }
    
    $CM_Con = new mysqli('localhost', 'root', '', 'cm_data');
    mysqli_query($CM_Con, "SET NAMES 'utf8'");
    $Query = "SELECT * FROM tblseguimientousuario as ls
        INNER JOIN dim_usuarios as du ON du.id_usuario = ls.id_usuario
        $DIM
        WHERE ls.fecha BETWEEN '$Params->fecha1' and '$Params->fecha2'
        $DIMCondicion 
    ";
    //echo $Query;
    $Seguimiento = GetQuery($CM_Con, $Query);
    echo json_encode($Seguimiento);
    //echo print_r($Seguimiento);
    //echo "success";
    return;
}
