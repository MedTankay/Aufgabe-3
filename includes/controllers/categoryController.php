<?php


require 'db.php';

require '../models/category.class.php';


class EventController
{

    public Database $connectionManger;

    public function __construct()
    {
        $this->connectionManger = new Database();
        $this->connectionManger->connect();
    }

    
    function categoryList()
    {
        $sql = "select * from category";
        $stmt = $this->connectionManger->conn->prepare($sql);
        $stmt->execute();

        // set the resulting array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        return json_encode($stmt->fetchAll());
    }
}
