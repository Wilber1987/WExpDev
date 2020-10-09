<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-Type: application/json; charset=utf-8');
    $JSONData = file_get_contents("php://input");
    $Data = json_decode($JSONData);
    $Function =  $_GET["function"];  
    $Function($Data);
    function GetModel($request)
    { 
        $Form = [];
        $pMysqli = new mysqli('localhost','root','','psicovitalem');
       // echo   "DESCRIBE $request->tablename"; 
        $q = $pMysqli->query("DESCRIBE $request->tablename"); 
        foreach ($q as $row) {
            $Form[] = $row;
        }        
        echo json_encode(array('Form'=> $Form));
    }
    function Get($request)
    {
        $Form = [];
        $pMysqli = new mysqli('localhost','root','','psicovitalem');   
        $q = $pMysqli->query("SELECT * FROM $request->tablename"); 
        foreach ($q as $row) {
            $Form[] = $row;
        }        
        echo json_encode(array('data'=> $Form));
    }
    function Insert($request)
    {
        $pMysqli = new mysqli('localhost','root','','psicovitalem');   
        $colums = "";
        $values = "";
        foreach ($request->dataForm as $key => $value) {
           if ($key != "id") {
                $colums = $colums . $key . ",";
                $values = $values ."'". $value. "',"; 
           }
        }
        $colums = substr($colums, 0, -1);       
        $values = substr($values, 0, -1);
        if (mysqli_query($pMysqli, "INSERT INTO $request->tablename($colums) values($values)")) {
            echo json_encode(array('success'=> "true"));
        }   
        else {
            echo json_encode(array('success'=> "false"));
        }
       // echo json_encode(array('success'=> $request->dataForm));
    }
    function Update($request)
    {
        $pMysqli = new mysqli('localhost','root','','psicovitalem');   
        //$colums = "";
        $values = "";
        foreach ($request->dataForm as $key => $value) {
           if ($key != "id") {
               // $colums = $colums . $key . ",";
                $values = $values ." $key = '$value',"; 
           }
        }
       // $colums = substr($colums, 0, -1);       
        $values = substr($values, 0, -1);
        $id = $request->dataForm->id;
        $query = "UPDATE $request->tablename SET $values where id = $id";
        //echo $query;      
        if (mysqli_query($pMysqli, $query)) {
            echo json_encode(array('success'=> "true"));
        }   
        else {
            echo json_encode(array('success'=> "false"));
        }
    }
    function Delete($request)
    {
        # code...
    }

?>