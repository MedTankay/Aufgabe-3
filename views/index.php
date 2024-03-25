<?php



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta npme="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aufgabe 03</title>

    <!--google font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <!--fontawsome-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!--my style-->
    <link rel="stylesheet" href="../assets/css/style.css">

</head>

<body>

    <!-- Start Kalender -->
    <section id="calender" class="month-view-calendar">
        <div class="calender-wrapper">
            <section class="navigation-wrapper">
                <nav>
                    <div class="left-area-nav">
                        <div class="conected-buttons">
                            <a id="month-view-btn" class="btn primary-btn">Monat</a>
                            <a id="week-view-btn" class="btn primary-btn">Woche</a>
                            <a id="day-view-btn" class="btn primary-btn">Tag</a>
                        </div>
                        <a class="btn primary-btn" id="todayBtn">Heute</a>
                    </div>
                    <div class="current-calender-title">
                        <div>
                            <a id="prev-month" class="btn primary-btn"><i class="fas fa-chevron-left"></i></a>
                        </div>
                        <h2 id="month-year-title"></h2>
                        <div>
                            <a id="next-month" class="btn primary-btn"><i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>
                    <div class="left-area-nav">
                        <label id="addEvent" class="modal-btn btn primary-btn" for="modal-1">Ereignis hinzufügen <i class="far fa-plus"></i></label>

                    </div>
                </nav>
            </section>

            <!-- Start Monatsansicht -->
            <div id="month-view" class="calender-content-wrapper month-view">
                <table cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <td>So</td>
                            <td>Mo</td>
                            <td>Di</td>
                            <td>Mi</td>
                            <td>Do</td>
                            <td>Fr</td>
                            <td>Sa</td>
                        </tr>
                    </thead>
                    <tbody id="tbodyMonthView">



                    </tbody>
                </table>
            </div>
            <!-- Ende Monatsansicht -->


            <!-- Start Wochenansicht -->
            <div id="week-view" class="calender-content-wrapper week-view">
                <!--start days week-->
                <div>
                    <div style="position: relative;height: 750px;overflow: hidden scroll;">

                        <table class="all-days-week-table">
                            <thead id="theadWeekView">

                            </thead>
                            <tbody id="tbodyWeekView">

                            </tbody>
                        </table>
                    </div>

                </div>
                <!-- Ende Tage der Woche -->

            </div>
            <!-- Ende Wochenansicht -->

            <!-- Start Tagesansicht -->
            <div id="day-view" class="calender-content-wrapper day-view">


                <!-- Start Tage der Woche -->
                <div>
                    <div style="position: relative;height: 750px;overflow: hidden scroll;">

                        <table class="all-days-week-table">
                            <thead id="theadDaysView">
                                <tr>
                                    <td style="width: 100px;"></td>
                                    <td>saturday</td>
                                </tr>
                            </thead>
                            <tbody id="tbodyDaysView">

                            </tbody>
                        </table>
                    </div>

                </div>
                <!-- Ende Tage der Woche -->

            </div>
            <!-- Ende Tagesansicht -->

        </div>
    </section>
    <!-- Ende Kalender -->


    <!--end Month view add cell Modal-->


    <!--Starte Modal für Aktualisierung oder Löschung von Ereignissen-->
    <input class="modal-state" id="modal-2" type="checkbox" />

    <div class="modal month-modal " id="addCellModal">
        <label class="modal__bg" for="modal-2"></label>
        <div class="modal__inner">
            <label class="modal__close" for="modal-2"></label>
            <h2>Aktualisieren oder Löschen von Ereignissen</h2>
            <!-- action="../includes/events/addEvent.inc.php" method="POST" -->
            <form id="editEventForm">
                <table>
                    <input type="hidden" id="idEvent">
                    <tr>
                        <div class="form-group">
                            <td><label for="">Ereignistitel : </label></td>
                            <td><input type="text" name="eventTitle" id="eventTitle2" placeholder="Add event title" required /></td>
                        </div>
                    </tr>

                    <tr>
                        <div class="form-group">
                            <td><label for="">Startdatum : </label></td>
                            <td><input type="datetime-local" name="startDate" id="startDate2" required /></td>
                        </div>
                    </tr>

                    <tr>
                        <div class="form-group">
                            <td><label for="">Enddatum : </label></td>
                            <td><input type="datetime-local" name="endDate" id="endDate2" required /></td>
                        </div>
                    </tr>

                    <tr>
                        <div class="form-group">
                            <td><label for="">Ereigniskategorie : </label></td>
                            <td>
                                <select name="category" id="modal2_select" required>
                                    <option value="" selected disabled>
                                        <div class="category-option-container">
                                            <span>Ereigniskategorie </span>
                                            <div class="category-color-box"></div>
                                        </div>
                                    </option>


                                </select>
                            </td>
                        </div>
                    </tr>


                </table>
                <div class="submition-event-container">
                    <div>
                        <button type="submit" class="btn danger-btn" id="deleteEventBtn">Ereignis löschen</button>
                    </div>
                    <div class="right-submit-modal-buttons">
                        <button type="submit" class="btn second-btn" id="updateEventBtn">Ereignis bearbeiten</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!--Ende Modal für Aktualisierung oder Löschung von Ereignissen-->

    <!--Starte Modal zum Hinzufügen von Ereignissen-->



    <input class="modal-state" id="modal-1" type="checkbox" />
    <div class="modal addEventModal">
        <label class="modal__bg" for="modal-1"></label>
        <div class="modal__inner">
            <label class="modal__close" for="modal-1"></label>
            <h2>Ereignis hinzufügen</h2>
            <form id="modal1_form" action="../includes/events/addEvent.inc.php" method="POST">
                <table>
                    <div class="errorMsg" id="errorMsg"></div>

                    <tr>
                        <div class="form-group">
                            <td><label for="">Ereignistitel:</label></td>
                            <td><input type="text" name="eventTitle" id="eventTitle" placeholder="Add event title" required /></td>
                        </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td><label for="">Startdatum:</label></td>
                            <td>
                                <input type="date" name="startDate" id="startDate" required />
                                <input type="time" name="startTime" id="startTime" required />
                            </td>
                        </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td><label for="">Enddatum:</label></td>
                            <td>
                                <input type="date" name="endDate" id="endDate" required />
                                <input type="time" name="endTime" id="endTime" required />
                            </td>
                        </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <td><label for="">Ereigniskategorie:</label></td>
                            <td>
                                <select name="category" id="modal1_select" required>
                                    <option value="" selected disabled>
                                        <div class="category-option-container">
                                            <span>Ereigniskategorie </span>
                                            <div class="category-color-box"></div>
                                        </div>
                                    </option>
                                </select>
                            </td>
                        </div>
                    </tr>
                </table>
                <div class="submition-event-container">
                    <button type="submit" class="btn primary-btn">Ereignis hinzufügen</button>
                </div>
            </form>
        </div>
    </div>
    <!--Ende Ereignismodal-->

    <!--Starte JavaScript-->
    <script type="text/javascript" src="../assets/js/calendar.js"></script>
    <script type="text/javascript" src="../assets/js/main.js"></script>


</body>

</html>