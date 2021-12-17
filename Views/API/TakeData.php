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
function Report( $Params)
{    
    $Basic = "";
    $BasicSelect = "";
    if ($Params->Basic != "") {
        $Basic = ", du.$Params->Basic";
        $BasicSelect = ", du.$Params->Basic";
    }
    $DIMSelect = "";
    $DIMJoin = "";
    $DIMCondicion = "";
    $DIMGroup = "";
    $DIMGroupCondicion = "";
    if ($Params->DIMSelect != "") {
        $DIMSelect = ", DIM.$Params->DIMSelect as DIMName, DIM.$Params->DIMSubSelect as DIMValue ";
        $DIMGroup = ", DIM.$Params->DIMSubSelect";
    }
    if ($Params->Dimencion != "") {
        $DIMJoin = " INNER JOIN $Params->Dimencion as DIM  ON DIM.id_seguimiento = ls.id_seguimiento ";
    }
    //$DimArray = json_decode($Params->DIMCondicion);    
    if (count($Params->DIMCondicion) > 0) {
        $values = "";
        $valuesCondition = "";
       // echo json_encode($Params->DIMCondicion);
        foreach ($Params->DIMCondicion as $key) {
            $values = $values."'$key->id_',";
            if (count($key->selectedItems) > 0) {
                foreach ($key->selectedItems as $SubKey) {
                    $valuesCondition = $valuesCondition."'$SubKey->id_',";
                }
            }            
        }
        $values = substr($values, 0, -1);        
        $DIMCondicion = " AND DIM.$Params->DIMSelect IN ($values) ";
        if ($valuesCondition != "") {
            $valuesCondition = substr($valuesCondition, 0, -1);            
            $DIMGroupCondicion = " AND DIM.$Params->DIMSubSelect IN ($valuesCondition) ";
        }        
    }
    $KpiParamInclude = "";
    if (count($Params->KpiParamInclude) > 0) { 
        $values = "";
        $valuesCondition = "";
        foreach ($Params->KpiParamInclude as $key) {
            $values = $values."'$key->id_',";
        }
        $values = substr($values, 0, -1);        
        $KpiParamInclude = " AND ls.$Params->KpiParam IN ($values) ";       
    }
    $KpiParamExclude = "";
    if (count($Params->KpiParamExclude) > 0) { 
        $values = "";
        $valuesCondition = "";
        foreach ($Params->KpiParamExclude as $key) {
            $values = $values."'$key',";
        }
        $values = substr($values, 0, -1);        
        $KpiParamExclude = " AND ls.$Params->KpiParam NOT IN ($values) ";       
    }
    $CM_Con = new mysqli('localhost', 'root', '', 'cm_data');
    mysqli_query($CM_Con, "SET NAMES 'utf8'");
    $Query = "SELECT  COUNT(distinct ls.id_usuario) AS EvalValue, ls.* 
        $BasicSelect
        $DIMSelect
        FROM $Params->KpiTable as ls
        INNER JOIN dim_usuarios as du ON du.id_usuario = ls.id_usuario
        $DIMJoin
        WHERE ls.fecha BETWEEN '$Params->fecha1' and '$Params->fecha2'
        $DIMCondicion
        $DIMGroupCondicion
        $KpiParamInclude 
        $KpiParamExclude
        GROUP BY ls.$Params->KpiParam, ls.$Params->Time $Basic $DIMGroup
        ORDER BY ls.fecha DESC
    ";
    //echo $Query;
    $Seguimiento = GetQuery($CM_Con, $Query);
    echo json_encode($Seguimiento);
    return;
}
