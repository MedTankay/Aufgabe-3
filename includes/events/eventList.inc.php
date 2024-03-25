<?php 

    require "../controllers/eventController.php";

    
    $eventCtr = new EventController();

    

        echo  $eventCtr->eventList();

        
    
    