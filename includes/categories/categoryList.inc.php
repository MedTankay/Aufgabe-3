<?php 

    // require "../models/event.class.php";
    require "../controllers/categoryController.php";

    
    $categoryCtr = new EventController();

    

    echo  $categoryCtr->categoryList();
    
       // echo json_encode(["message" => "success"]);
        
    
    