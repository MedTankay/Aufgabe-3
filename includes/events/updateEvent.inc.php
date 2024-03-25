<?php

require "../controllers/eventController.php";

$eventCtr = new EventController();


$requestBody = file_get_contents('php://input');


$data = json_decode($requestBody, true);

if (
    isset($data["idEvent"]) &&
    isset($data["eventTitle"]) &&
    isset($data["startDate"]) &&
    isset($data["endDate"]) &&
    isset($data["category"])
) {
    $result = $eventCtr->updateEvent(
        $data["idEvent"],
        $data["eventTitle"],
        $data["startDate"],
        $data["endDate"],
        $data["category"]
    );

    echo json_encode(["message" => $result]);
} else {
 
    echo json_encode(["message" => "error"]);
}
