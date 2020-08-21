<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-Type: application/json; charset=utf-8');
    $JSONData = file_get_contents("php://input");
    $Request = json_decode($JSONData);
    $Function =  $_GET["function"];  
    $Function($Request);  
    //GET MODEL
    function GetModel($data){
        $pMysqli = new mysqli('localhost','root','','dbprueba');    
        $Form = [];        
        $q = $pMysqli->query('DESCRIBE form'); 
        foreach ($q as $row) {
            $Form[] = $row;
        }  
        echo json_encode(array('Form'=> $Form));
        return;   
    }
    //GET DATA--------------------------------
    function Get($data){
        # code...
    }
    //INSERT----------------------------------
    function Insert($Request){
        $pMysqli = new mysqli('localhost','root','','dbprueba');
        if ($pMysqli->connect_error) {
            die("Connection failed: " . $pMysqli->connect_error);
        }
        $values = "";       
        foreach ($Request->data as $key => $valor) {
            $values = $values . $valor.",";
        }
        $values = substr($values, 0, -1);        
        if (mysqli_query($pMysqli, "INSERT into form VALUES($values)")) {
            echo json_encode(array('data'=> "success"));
         } else {
            echo json_encode(array('data'=> "fail"));
         }
         //$pMysqli->close();
    }
    
    function Update($data){
        # code...
    }

?>