<?php 

require "../controllers/eventController.php";

// Initialize response message
$response = ["message" => "error"];

// Check if data is received via POST
if(isset($_POST['data'])) {
    // Decode JSON data
    $data = json_decode($_POST['data'], true);

    // Check if required fields are present
    if(isset($data["eventTitle"], $data["startDate"], $data["endDate"], $data["category"])) {
        // Create EventController instance
        $eventCtr = new EventController();

        // Create Event model instance
        $eventModel = new Event(
            -1,
            $data["eventTitle"],
            $data["startDate"],
            $data["endDate"],
            $data["category"]
        );

        // Add event and update response message
        $response["message"] = $eventCtr->addEvent($eventModel);
    }
}

// Output JSON response
echo json_encode($response);
