<?php
    header("Access-Control-Allow-Origin: *");
    $Form = [];
    $pMysqli = new mysqli('localhost','root','','dbprueba');   
    $q = $pMysqli->query('DESCRIBE form'); 
    foreach ($q as $row) {
        $Form[] = $row;
    }        
    echo json_encode(array('Form'=> $Form));    
?>