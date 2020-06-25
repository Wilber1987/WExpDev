<?php
    header("Access-Control-Allow-Origin: *");
    $pMysqli = new mysqli('localhost','root','','inclusive_bd');
    if(isset($_GET["param"])){
        $Param =  $_GET["param"]; 
    }else{
        $Param = "";
    }
    $query = "SELECT id_module as id, title, descripcion, image , url     
        FROM tbl_modules 
        where title like '%$Param%' Limit 10";     
    $JsonArray = array();
    $result = $pMysqli->query($query);
    $JsonArray = array();
    foreach ($result as $row ) {
        $jsonObject = array();                    
        $jsonObject["img"]= $row['image'];                     
        $jsonObject["id_"]= $row['id'];
        $jsonObject["title"]= $row['title'];
        $jsonObject["descripcion"]= $row['descripcion'];
        $jsonObject["url_link"]= $row['url'];

        $JsonArray[] = $jsonObject;
    }     
    echo json_encode(array('Modules'=> $JsonArray)); 

    $pMysqli->close();  
?>