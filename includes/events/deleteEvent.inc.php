<?php 

    require "../controllers/eventController.php";

    
    $eventCtr = new EventController();




    if(isset($_GET["idEvent"]))
    {

      
        echo  $eventCtr->deleteEvent($_GET["idEvent"]);
        
        return;
    }
    
    echo json_encode(["message" => "erroooor"]);
