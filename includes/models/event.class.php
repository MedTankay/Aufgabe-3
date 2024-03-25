<?php
class Event {

    // Properties
    private $idEvent;
    private $idCategory;
    private $eventTitle;
    private $startDate;
    private $endDate;


    function __construct($idEvent, $eventTitle, $startDate, $endDate, $idCategory) {
        $this->idEvent = $idEvent;
        $this->eventTitle = $eventTitle;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->idCategory = $idCategory;
    }

    // Methods
    public function __get($property) {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }
    
    public function __set($property, $value) {

        if (property_exists($this, $property)) {
            $this->$property = $value;
        }
    
        return $this;
    }


    }
?>