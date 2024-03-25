<?php


require 'db.php';
require '../models/event.class.php';
require '../models/category.class.php';


class EventController
{

    public Database $connectionManger;

    public function __construct()
    {
        $this->connectionManger = new Database();
        $this->connectionManger->connect();
    }

    function addEvent(Event $event)
    {
        try {
           
            $sql = "INSERT INTO event (eventTitle, startDate, endDate, idCategory) VALUES (?, ?, ?, ?)";
            $stmt = $this->connectionManger->conn->prepare($sql);
    
            
            $stmt->bindParam(1, $event->__get('eventTitle'));
            $stmt->bindParam(2, $event->__get('startDate'));
            $stmt->bindParam(3, $event->__get('endDate'));
            $stmt->bindParam(4, $event->__get('idCategory'));
    
            
            $stmt->execute();
    
            
            if ($stmt->rowCount() > 0) {
                return json_encode(["message" => "success"]);
            } else {
                return json_encode(["message" => "Failed to add event"]);
            }
        } catch (PDOException $e) {
            // Handle any database errors
            return json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
    }
    

    function deleteEvent($idEvent)
    {
        $pdo = $this->connectionManger->conn->prepare("DELETE FROM event WHERE idEvent = :idEvent");
        $pdo->bindValue(':idEvent', $idEvent, PDO::PARAM_STR);
        $pdo->execute();
    }

    function updateEvent($idEvent, $eventTitle, $startDate, $endDate, $idCategory)
    {
        
        $sql = "UPDATE event SET eventTitle = :eventTitle, 
                startDate = :startDate, endDate = :endDate, idCategory = :idCategory 
                WHERE idEvent = :idEvent";
        
        
        $pdo = $this->connectionManger->conn->prepare($sql);
    
        
        $pdo->bindValue(':idEvent', $idEvent, PDO::PARAM_INT);
        $pdo->bindValue(':eventTitle', $eventTitle, PDO::PARAM_STR);
        $pdo->bindValue(':startDate', $startDate, PDO::PARAM_STR);
        $pdo->bindValue(':endDate', $endDate, PDO::PARAM_STR);
        $pdo->bindValue(':idCategory', $idCategory, PDO::PARAM_INT);
    
        
        $pdo->execute();
    }
    

    function eventList()
    {
        
        $sql = "SELECT event.idEvent, event.eventTitle, event.startDate, event.endDate, event.idCategory, category.categoryColor
        FROM event
        JOIN category
        ON event.idCategory = category.idCategory";
        $stmt = $this->connectionManger->conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        return json_encode($stmt->fetchAll());
    }
}
