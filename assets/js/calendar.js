const date = new Date(); // Erstellt ein neues Date-Objekt, um das aktuelle Datum zu erhalten

// Initialisierung der Datumswerte
let initilizeDate = {
    row: 6, // Mindestwert
    currentYear: date.getFullYear(), // Aktuelles Jahr
    currentMonth: date.getMonth() + 1, // Aktueller Monat (0-basiert)
    currentDay: date.getDate(), // Aktueller Tag
    currentDateFormat: formatDate(new Date()), // Formatierung des aktuellen Datums
    calenderList: [], // Liste für den Kalender
    listMonthViewString: [], // Liste für die Monatsansicht
}

let generalEventList = null; // Allgemeine Ereignisliste
var eventIdGen = null; // Ereignis-ID-Generator

// Abrufen der Buttons für vorherigen und nächsten Monat
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

// Behandlung des "Heute"-Buttons
const todayBtn = document.getElementById("todayBtn");
const calenderSec = document.getElementById("calender");

// Event-Listener für den Button zum Aktualisieren eines Ereignisses
document.getElementById("updateEventBtn").addEventListener("click", function (e) {
    e.preventDefault();
    handleEditEvent(document.getElementById("idEvent").value);
});

// Event-Handler für den "Heute"-Button
todayBtn.onclick = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Fügt eine führende Null hinzu, wenn der Monat kleiner als 10 ist
    const day = String(date.getDate()).padStart(2, '0'); // Fügt eine führende Null hinzu, wenn der Tag kleiner als 10 ist

    const formattedDate = `${year}-${month}-${day}`;

    // Aktualisierung der Initialisierungsdaten
    initilizeDate.currentYear = year;
    initilizeDate.currentMonth = month;
    initilizeDate.currentDay = day;
    initilizeDate.currentDateFormat = formattedDate;

    // Abhängig von der aktuellen Ansicht des Kalenders werden entsprechende Funktionen aufgerufen
    switch (true) {
        case calenderSec.classList.contains("month-view-calendar"):
            fillCalenderList();
            break;
        case calenderSec.classList.contains("week-view-calendar"):
            callEventList();
            fillCalenderWeekList(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);
            break;
        case calenderSec.classList.contains("days-view-calendar"):
            callEventList();
            fillCalenderDaysList(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);
            break;
    }

    console.log(`${year}-${month}-${day}`);
}

// Event-Handler für den Button "Vorheriger Monat"
prevBtn.onclick = () => {
    switch (true) {
        case calenderSec.classList.contains("month-view-calendar"):
            getPreviousMonthDateFormat();
            fillCalenderList();
            break;
        case calenderSec.classList.contains("week-view-calendar"):
            getPrevWeekDateFormat();
            fillCalenderWeekList(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);
            break;
        case calenderSec.classList.contains("days-view-calendar"):
            callEventList();
            getPrevDayDateFormat();
            fillCalenderDaysList(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);
            break;
    }
}

// Event-Handler für den Button "Nächster Monat"
nextBtn.onclick = () => {
    switch (true) {
        case calenderSec.classList.contains("month-view-calendar"):
            getNextMonthDateFormat();
            fillCalenderList();
            break;
        case calenderSec.classList.contains("week-view-calendar"):
            getNextWeekDateFormat();
            fillCalenderWeekList(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);
            break;
        case calenderSec.classList.contains("days-view-calendar"):
            getNextDayDateFormat();
            fillCalenderDaysList(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);
            callEventList();
            break;
    }
}

// Funktion zum Abrufen des Datumsformats für den vorherigen Monat
function getPreviousMonthDateFormat() {
    if (initilizeDate.currentMonth == 1) {
        initilizeDate.currentMonth = 12;
        initilizeDate.currentYear--;
    } else {
        initilizeDate.currentMonth--;
    }

    initilizeDate.currentDateFormat = initilizeDate.currentYear + "-" + pairNbrFormat(initilizeDate.currentMonth) + "-" + "01";

    return initilizeDate.currentYear + "-" + pairNbrFormat(initilizeDate.currentMonth) + "-" + "01";
}

// Funktion zum Abrufen des Datumsformats für den nächsten Monat
function getNextMonthDateFormat() {
    if (initilizeDate.currentMonth == 12) {
        initilizeDate.currentMonth = 1;
        initilizeDate.currentYear++;
    } else {
        initilizeDate.currentMonth++;
    }

    initilizeDate.currentDateFormat = initilizeDate.currentYear + "-" + pairNbrFormat(initilizeDate.currentMonth) + "-" + "01";

    return initilizeDate.currentYear + "-" + pairNbrFormat(initilizeDate.currentMonth) + "-" + "01";
}

// Funktion zum Abrufen des Datumsformats für die nächste Woche
function getNextWeekDateFormat() {
    let date = new Date(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);

    // Navigation zur nächsten Woche
    date.setDate(date.getDate() + 7);
    week = generateNavWeekCalendar(date);

    let [year, month, day] = week[0].split("-");

    initilizeDate.currentYear = year;
    initilizeDate.currentMonth = month;
    initilizeDate.currentDay = day;

    return initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay;
}

// Funktion zum Abrufen des Datumsformats für die vorherige Woche
function getPrevWeekDateFormat() {
    let date = new Date(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);

    // Navigation zur vorherigen Woche
    date.setDate(date.getDate() - 7);
    week = generateNavWeekCalendar(date);

    let [year, month, day] = week[0].split("-");

    initilizeDate.currentYear = year;
    initilizeDate.currentMonth = month;
    initilizeDate.currentDay = day;


    return initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay;
}

fillCalenderWeekList(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);

function fillCalenderWeekList(weekStart) {
    // Deklaration der Variablen für die Kopfzeile und das Tabellenkopfelement
    let weekTableHead = "";
    let theadWeekView = document.getElementById("theadWeekView");

    // Aktuelle Wochen-Daten werden gespeichert
    var currentWeekDates = [];

    // Array mit Wochentagen
    const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    let j = 0; // Hilft beim Drucken des Wochentagsbeginns

    // Erstellen der Kopfzeile für die Woche
    weekTableHead = `<tr><td style="width: 55px;"></td>`;

    // Generieren der Liste der Wochentage für die gegebene Woche
    var weeksHeadList = generateNavWeekCalendar(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);

    // Iteration über die Wochentage, um die Kopfzeile zu füllen
    for (let i = 0; i < weeksHeadList.length; i++) {
        weekTableHead += `<td attr-date="${weeksHeadList[i]}" >
                            <a>${weeksHeadList[i].slice(-2)} ${daysOfWeek[j]}</a></td>`;
        // Aktuelle Wochentage werden der Liste hinzugefügt
        currentWeekDates.push(weeksHeadList[i]);
        j++;
    }

    weekTableHead += `</tr>`;

    // Setzen der generierten Kopfzeile in das Tabellenkopfelement
    theadWeekView.innerHTML = "";
    theadWeekView.innerHTML = weekTableHead;

    // Beginn des Befüllens des Körper des Wochenkalenders
    var weekTableBody = `<div class="hour-week-row-container"><tr>`;
    tbodyWeekView = document.getElementById("tbodyWeekView");

    // Iteration über Stunden, um den Kalenderkörper zu füllen
    for (let i = 0; i < 24; i++) {
        var hour = i % 12 || 12;
        var suffix = i < 12 ? "AM" : "PM";
        var formattedHour = i < 10 ? `0${i}` : i;
        var minute = ":00";

        // Fügt eine Zeile für jede Stunde hinzu
        weekTableBody += `<div class="hour-date-content">
                            <tr>
                                <div class="hour-week-container">
                                    <td style="height: 32px !important;" attr-time="${formattedHour}${minute}">${hour} ${suffix}</td>
                                </div>
                                <div class="date-week-event" style="position=: relative">`;

        // Fügt Zellen für jeden Wochentag hinzu
        for (let j = 0; j < currentWeekDates.length; j++) {
            weekTableBody += `<td class='td-week-event' attr-date="${currentWeekDates[j]}" 
                                        attr-time="${formattedHour}${minute}" attr-end-time="${formattedHour}:30"></td>`;
        }

        weekTableBody += `</div>
                            </tr>
                        </div>`;

        // Fügt eine weitere Zeile für jede halbe Stunde hinzu
        weekTableBody += `<div class="hour-date-content">
                            <tr>
                                <div class="hour-week-container">
                                    <td style="height: 32px !important;" attr-time="${formattedHour}:30"></td>
                                </div>
                                <div class="date-week-event" style="position=: relative">`;

        // Fügt Zellen für jeden Wochentag hinzu
        for (let j = 0; j < currentWeekDates.length; j++) {
            weekTableBody += `<td class='td-week-event' attr-date="${currentWeekDates[j]}"
                                            attr-time="${formattedHour}:30" 
                                            attr-end-time="${(parseInt(formattedHour) + 1) == 24 ? "00" : (parseInt(formattedHour) + 1).toString().padStart(2, "0")}:00"></td>`;
        }

        weekTableBody += `</div>
                            </tr>
                        </div>`;
    }

    weekTableBody += `<div/><tr/>`;

    // Fügt den Körper in das Tabellenkörperelement ein
    tbodyWeekView.innerHTML = "";
    tbodyWeekView.innerHTML = weekTableBody;

    // Aktualisiert die Header-Navigation
    var navigationTitle = document.getElementById("month-year-title");
    navigationTitle.innerHTML = printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth);
}

/* Start der Navigation durch die Tage */
fillCalenderDaysList(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);

// Diese Funktion füllt den Tageskalender mit den Ereignissen für das angegebene Datum.
function fillCalenderDaysList(dateParam) {

    // Das Datum wird aus dem Parameter extrahiert
    let date = new Date(dateParam);

    // Das Tabellenkopfelement für die Tage wird abgerufen
    let theadDaysView = document.getElementById("theadDaysView");

    // Array mit den Wochentagen
    const daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

    // Die Kopfzeile des Tageskalenders wird erstellt und eingefügt
    theadDaysView.innerHTML = `<tr>
                                    <td style="width:100px"></td>
                                    <td>${daysOfWeek[date.getDay()]}</td>
                                </tr>`;

    // Die Überschrift für die Navigation wird aktualisiert
    var navigationTitle = document.getElementById("month-year-title");
    navigationTitle.innerHTML = initilizeDate.currentDay + " " + printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth);

    // Der Körper des Tageskalenders wird geladen
    var daysTableBody = `<div class="hour-week-row-container"><tr>`;
    tbodyDaysView = document.getElementById("tbodyDaysView");

    // Iteration über die Stunden, um den Kalenderkörper zu füllen
    for (let i = 0; i < 24; i++) {
        var hour = i % 12 || 12;
        var suffix = i < 12 ? "AM" : "PM";
        var formattedHour = i < 10 ? `0${i}` : i;
        var minute = ":00";

        // Hinzufügen einer Zeile für jede Stunde und jede halbe Stunde
        daysTableBody += `<div class="hour-date-content">
                            <tr>
                                <div class="hour-day-container">
                                    <td style="height: 32px !important;" attr-time="${formattedHour}${minute}">${hour} ${suffix}</td>
                                </div>
                                <div class="date-day-event" style="position=: relative">`;

        // Hinzufügen einer Zelle für das Ereignis für diese Stunde
        daysTableBody += `<td class='td-day-event' 
                                        attr-date="${initilizeDate.currentYear + "-" + initilizeDate.currentMonth.toString().padStart(2, "0") + "-" + initilizeDate.currentDay.toString().padStart(2, "0")}" 
                                        attr-time="${formattedHour}${minute}" attr-end-time="${formattedHour}:30"></td>`;

        daysTableBody += `</div>
                            </tr>
                        </div>`;

        // Hinzufügen einer weiteren Zeile für jede halbe Stunde
        daysTableBody += `<div class="hour-date-content">
                            <tr>
                                <div class="hour-day-container">
                                    <td style="height: 32px !important;" attr-time="${formattedHour}:30"></td>
                                </div>
                                <div class="date-day-event" style="position=: relative">`;

        // Hinzufügen einer Zelle für das Ereignis für diese halbe Stunde
        daysTableBody += `<td class='td-day-event' 
                                    attr-date="${initilizeDate.currentYear + "-" + initilizeDate.currentMonth.toString().padStart(2, "0") + "-" + initilizeDate.currentDay.toString().padStart(2, "0")}" 
                                    attr-time="${formattedHour}:30" 
                                    attr-end-time="${(parseInt(formattedHour) + 1) == 24 ? "00" : (parseInt(formattedHour) + 1).toString().padStart(2, "0")}:00"></td>`;

        daysTableBody += `</div>
                            </tr>
                        </div>`;
    }

    daysTableBody += `<div/><tr/>`;

    // Der Körper wird in das Tabellenkörperelement eingefügt
    tbodyDaysView.innerHTML = "";
    tbodyDaysView.innerHTML = daysTableBody;
}


// Diese Funktion berechnet das Datum für den nächsten Tag und aktualisiert die Werte im Initialisierungsobjekt.

function getNextDayDateFormat() {
    // Das aktuelle Datum wird aus dem Initialisierungsobjekt extrahiert
    const date = new Date(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);

    // Inkrementierung auf den nächsten Tag
    date.setDate(date.getDate() + 1);

    // Extrahieren des Jahres, Monats und Tages des nächsten Datums
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Aktualisierung der Werte im Initialisierungsobjekt
    initilizeDate.currentYear = year;
    initilizeDate.currentMonth = month.toString().padStart(2, "0"); // Führende Nullen für einstellige Monate hinzufügen
    initilizeDate.currentDay = day.toString().padStart(2, "0"); // Führende Nullen für einstellige Tage hinzufügen

    // Rückgabe des aktualisierten Datums im Format "YYYY-MM-DD"
    return initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay;
}



/**
 * Berechnet das Datum für den vorherigen Tag und aktualisiert die Werte im Initialisierungsobjekt.
 * @returns {string} - Das aktualisierte Datum im Format "YYYY-MM-DD".
 */
function getPrevDayDateFormat() {
    // Das aktuelle Datum wird aus dem Initialisierungsobjekt extrahiert
    const date = new Date(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay);

    // Dekrementierung zum vorherigen Tag
    date.setDate(date.getDate() - 1);

    // Extrahieren des Jahres, Monats und Tages des vorherigen Datums
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Aktualisierung der Werte im Initialisierungsobjekt
    initilizeDate.currentYear = year;
    initilizeDate.currentMonth = month.toString().padStart(2, "0"); // Führende Nullen für einstellige Monate hinzufügen
    initilizeDate.currentDay = day.toString().padStart(2, "0"); // Führende Nullen für einstellige Tage hinzufügen

    // Rückgabe des aktualisierten Datums im Format "YYYY-MM-DD"
    return initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + initilizeDate.currentDay;
}
/* End der Tagesnavigation */


fillCalenderList()

// Funktion zur Befüllung des Kalenders
function fillCalenderList() {

    document.getElementById("tbodyMonthView").innerHTML = "";

    // Beginn des Abrufs der Eventliste
    // Löschen
    initilizeDate.listMonthViewString.length = 0;

    // Erhalten des Index des aktuellen Monats
    const firstDayOfMonth = new Date(initilizeDate.currentYear, initilizeDate.currentMonth - 1, 1);
    let currentMonthFirstDayIndex = firstDayOfMonth.getDay(); // 0 für Sonntag, 1 für Montag usw.

    // Initialisierung des Datumsystems, um festzustellen, ob wir uns im aktuellen Monat befinden
    const dateSys = new Date();
    const currentDate = new Date(initilizeDate.currentDateFormat);

    // Wir benötigen "lastPrevMonthDay" und "lastPrevMonthDayIndex", um den vorherigen Tag im Kalender hinzuzufügen
    const lastPrevMonthDay = getDateByOption({ type: "LAST_PREV_MONTH_DAY", payload: initilizeDate.currentDateFormat });
    const lastPrevMonthDayIndex = getDateByOption({ type: "LAST_PREV_MONTH_DAY_INDEX", payload: initilizeDate.currentDateFormat });

    // Wir benötigen "lastDayOfCurrentMonth" zum Hinzufügen des aktuellen Monats
    const lastDayOfCurrentMonth = getDateByOption({ type: "GET_CURRENT_MONTH_LAST_DAY", payload: initilizeDate.currentDateFormat });

    let tdCount = 1;
    initilizeDate.listMonthViewString.push("<tr>");
    // Wenn der erste Tag des aktuellen Monats = 0 ist, bedeutet das, dass wir die letzten Tage des vorherigen Monats nicht zum Kalender hinzufügen müssen
    if (currentMonthFirstDayIndex == 0) {

        if (compareTwoDates(currentDate, dateSys)) {

            // Fülle den aktuellen Monat
            for (let i = 1; i <= lastDayOfCurrentMonth; i++) {

                // Überprüfe die Spaltenanordnung, um 7 Spalten "Wochen" im Kalender anzuzeigen
                if (tdCount % 7 == 0) {

                    if (i == dateSys.getDate()) {

                        initilizeDate.listMonthViewString.push(`
                            <td class="today" attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}" >
                                    <div class="calender-content">
                                        <div class="days-wrapper">${i}</div>
                                        <div class='list-event'></div>
                                    </div>
                                </td><tr/>`);
                    } else {
                        initilizeDate.listMonthViewString.push(`
                        <td attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td><tr/>`);
                    }
                }
                else {

                    if (i == dateSys.getDate()) {

                        initilizeDate.listMonthViewString.push(`
                                <td class="today" attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                        <div class="calender-content">
                                            <div class="days-wrapper">${i}</div>
                                            <div class='list-event'></div>
                                        </div>
                                    </td>`);
                    } else {
                        initilizeDate.listMonthViewString.push(`
                            <td attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                    <div class="calender-content">
                                        <div class="days-wrapper">${i}</div>
                                        <div class='list-event'></div>
                                    </div>
                                </td>`);
                    }
                }

                tdCount++;

            }

            // Fülle den nächsten Monat
            const diff = (initilizeDate.row) * 7 - lastDayOfCurrentMonth; //"7 == Woche"

            for (let i = 1; i <= diff; i++) {
                if (initilizeDate.calenderList.length < (initilizeDate.row * 7)) {
                    // Überprüfe die Spaltenanordnung, um 7 Spalten "Wochen" im Kalender anzuzeigen
                    if (tdCount % 7 == 0) {

                        initilizeDate.listMonthViewString.push(`
                        <td class="next-month-day" attr-date="${nextMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td><tr/>`);

                    }
                    else {

                        initilizeDate.listMonthViewString.push(`
                        <td class="next-month-day" attr-date="${nextMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td>`);
                    }

                    count++;
                }
            }

            // Aktualisiere DOM
            let parent = document.getElementById("tbodyMonthView");
            parent.innerHTML = "";
            parent.insertAdjacentHTML("beforeend", initilizeDate.listMonthViewString.join(""));

        }
        else {

            // Fülle den aktuellen Monat
            for (let i = 1; i <= lastDayOfCurrentMonth; i++) {

                if (tdCount % 7 == 0) {

                    initilizeDate.listMonthViewString.push(`
                        <td attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                        </td><tr/>`);
                }
                else {

                    initilizeDate.listMonthViewString.push(`
                        <td attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td>`);
                }
                tdCount++;

            }

            // Fülle den nächsten Monat
            const diff = (initilizeDate.row) * 7 - lastDayOfCurrentMonth; //"7 == Woche"

            for (let i = 1; i <= diff; i++) {

                if (initilizeDate.calenderList.length < (initilizeDate.row * 7)) {
                    if (tdCount % 7 == 0) {

                        initilizeDate.listMonthViewString.push(`
                        <td class="next-month-day" attr-date="${nextMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td><tr/>`);
                    }
                    else {

                        initilizeDate.listMonthViewString.push(`
                        <td class="next-month-day" attr-date="${nextMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td>`);
                    }
                }
                tdCount++;
            }

            // Aktualisiere DOM
            let parent = document.getElementById("tbodyMonthView");
            parent.innerHTML = ""; // löschen
            parent.insertAdjacentHTML("beforeend", initilizeDate.listMonthViewString.join(""));
        }

    } else {

        let htmlStringTxt = "<tr>";

        // Wenn diese Bedingung wahr ist, bedeutet das, dass wir uns im aktuellen Datum befinden und auch nicht am Anfang des Monats "ist kein Sonntag"
        if (compareTwoDates(currentDate, dateSys)) {

            // Füge den vorherigen Monat zur Kalenderliste hinzu
            for (let i = lastPrevMonthDay - lastPrevMonthDayIndex; i <= lastPrevMonthDay; i++) {

                initilizeDate.listMonthViewString.push(`
                        <td class="prev-month-day" attr-date="${prevMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td>
                    `);
                tdCount++;

            }

            // Fülle den aktuellen Monat
            for (let i = 1; i <= lastDayOfCurrentMonth; i++) {

                // 1 = 4, 2 = 5, 3 = 6, 4 = 7
                if ((tdCount) % 7 == 0) {

                    if (i == dateSys.getDate()) {

                        initilizeDate.listMonthViewString.push(`
                            <td class="today" attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                    <div class="calender-content">
                                        <div class="days-wrapper">${i}</div>
                                        <div class='list-event'></div>
                                    </div>
                                </td><tr/>`);
                    } else {
                        initilizeDate.listMonthViewString.push(`
                        <td attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td><tr/>`);
                    }

                } else {

                    if (i == dateSys.getDate()) {

                        initilizeDate.listMonthViewString.push(`
                            <td class="today" attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                    <div class="calender-content">
                                        <div class="days-wrapper">${i}</div>
                                        <div class='list-event'></div>
                                    </div>
                                </td>`);
                    } else {
                        initilizeDate.listMonthViewString.push(`
                        <td attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td>`);
                    }

                }

                tdCount++;

            }

            // Fülle den nächsten Monat
            const diff = (initilizeDate.row) * 7 - lastDayOfCurrentMonth; //"7 == Woche"

            for (let i = 1; i <= diff; i++) {
                if (initilizeDate.listMonthViewString.length <= (initilizeDate.row * 7)) //
                {
                    if (tdCount % 7 == 0) {
                        initilizeDate.listMonthViewString.push(`
                            <td class="next-month-day" attr-date="${nextMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                    <div class="calender-content">
                                        <div class="days-wrapper">${i}</div>
                                        <div class='list-event'></div>
                                    </div>
                                </td>
                            <tr/>
                        `);
                    } else {
                        initilizeDate.listMonthViewString.push(`
                            <td class="next-month-day" attr-date="${nextMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                    <div class="calender-content">
                                        <div class="days-wrapper">${i}</div>
                                        <div class='list-event'></div>
                                    </div>
                                </td>`);
                    }
                    tdCount++;
                }
            }


            let parent = document.getElementById("tbodyMonthView");
            parent.innerHTML = ""; // löschen

            parent.insertAdjacentHTML("beforeend", initilizeDate.listMonthViewString.join(""));

        } else {

            // Füge den vorherigen Monat zur Kalenderliste hinzu
            for (let i = lastPrevMonthDay - lastPrevMonthDayIndex; i <= lastPrevMonthDay; i++) {

                initilizeDate.listMonthViewString.push(`
                <td class="prev-month-day" attr-date="${prevMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                        <div class="calender-content">
                            <div class="days-wrapper">${i}</div>
                            <div class='list-event'></div>
                        </div>
                    </td>
                `);

                tdCount++;
            }

            // Fülle den aktuellen Monat
            for (let i = 1; i <= lastDayOfCurrentMonth; i++) {

                if (tdCount % 7 == 0) {

                    initilizeDate.listMonthViewString.push(`
                    <td attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                            <div class="calender-content">
                                <div class="days-wrapper">${i}</div>
                                <div class='list-event'></div>
                            </div>
                        </td><tr/>`);
                } else {
                    initilizeDate.listMonthViewString.push(`
                    <td attr-date="${formatDateCompare(initilizeDate.currentYear + "-" + initilizeDate.currentMonth + "-" + i)}">
                            <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td>`);

                }

                tdCount++;
            }

            // Fülle den nächsten Monat
            const diff = (initilizeDate.row) * 7 - lastDayOfCurrentMonth; //"7 == Woche"

            for (let i = 1; i <= diff; i++) {

                if ((initilizeDate.listMonthViewString.length) < (initilizeDate.row * 7) + 1) {
                    if (tdCount % 7 == 0) {

                        initilizeDate.listMonthViewString.push(`
                        <td class="next-month-day" attr-date="${nextMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td><tr/>`);
                    } else {

                        initilizeDate.listMonthViewString.push(`
                        <td class="next-month-day" attr-date="${nextMonthToString(initilizeDate.currentYear, initilizeDate.currentMonth, i)}">
                                <div class="calender-content">
                                    <div class="days-wrapper">${i}</div>
                                    <div class='list-event'></div>
                                </div>
                            </td>`);
                    }
                }
                tdCount++;
            }

            let parent = document.getElementById("tbodyMonthView");
            parent.innerHTML = ""; // löschen
            parent.insertAdjacentHTML("beforeend", initilizeDate.listMonthViewString.join(""));
        }

    }

    // Diese Methode lädt die Monatsansichtsveranstaltung
    callEventList();

    // Platz für die Verarbeitung von Modals
    document.querySelectorAll('.calender-content').forEach((td) => {
        td.onclick = (e) => {



            if (e.target.tagName === "A") {
                document.getElementById("modal-2").classList.toggle("modal-state-checked");
                document.getElementById("modal-2").classList.toggle("modal-state");

                // Alle Formulareingabe-IDs abrufen
                let eventId = document.getElementById("idEvent");
                let eventTitle2 = document.getElementById("eventTitle2");
                let startDate2 = document.getElementById("startDate2");
                let endDate2 = document.getElementById("endDate2");
                let modal2_select = document.getElementById("modal2_select");

                // idEvent
                let idEvent = null;

                // Alle Eingaben löschen
                eventTitle2.value = startDate2.value = endDate2.value = modal2_select.value = "";
                //  console.log(e.target.id);
                // Stellen Sie sicher, dass generalEventList nicht null ist
                if (generalEventList) {
                    Object.values(generalEventList).forEach(list => {

                        if (e.target.id == list.idEvent) {
                            // Füllen Sie die Eingaben mit Wert, wenn der Benutzer auf eine bestimmte Veranstaltung klickt: Zweck zum Aktualisieren oder Löschen
                            eventTitle2.value = list.eventTitle;
                            startDate2.value = list.startDate;
                            endDate2.value = list.endDate;
                            modal2_select.value = list.idCategory;
                            eventId.value = list.idEvent;

                            idEvent = list.idEvent;

                        }

                    });
                }

            }
            else {
                document.getElementById("modal-1").classList.toggle("modal-state-checked");
                document.getElementById("modal-1").classList.toggle("modal-state");
            }
        };
    });

    var navigationTitle = document.getElementById("month-year-title");
    navigationTitle.innerHTML = printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth)


}






// Behandle das Löschen von Ereignissen
// Beginn der Behandlung des Löschvorgangs
const deleteEventBtn = document.getElementById("deleteEventBtn");

deleteEventBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const confirmed = confirm(`Möchten Sie dieses Ereignis mit der ID == ${document.getElementById("idEvent").value} wirklich löschen?`);

    let id = eventIdGen;
    if (confirmed) {
        // handleDeleteEvent(list.idEvent)
        handleDeleteEvent(document.getElementById("idEvent").value);
        //  return;
    }

});
// Start der Behandlung des Löschvorgangs

function handleDeleteEvent(id) {

    const idEvent = id;
    const xhr = new XMLHttpRequest();


    xhr.open("DELETE", `../includes/events/deleteEvent.inc.php?idEvent=${idEvent}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200) {

            fillCalenderList();
            //
            const editDeleteModal = document.getElementById("modal-2");

            editDeleteModal.classList.replace("modal-state-checked", "modal-state")

        } else {
            // Fehler behandeln
        }
    };
    xhr.send();
}

// Behandle das Aktualisieren von Ereignissen
function handleEditEvent(id) {
    // Die ID des Ereignisses abrufen
    const idEvent = id;

    const editEventForm = document.getElementById("editEventForm");
    // Die Formulardaten abrufen
    const formData = new FormData(editEventForm);
    formData.append('idEvent', idEvent);

    // Ein Objekt erstellen, um Formulardaten zu speichern
    const eventData = {};
    for (let [name, value] of formData) {
        eventData[name] = value;
    }
    eventData["idEvent"] = idEvent;

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "../includes/events/updateEvent.inc.php");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Erfolg, Kalenderliste aktualisieren und Modal schließen
            fillCalenderList();
            const editDeleteModal = document.getElementById("modal-2");
            editDeleteModal.classList.replace("modal-state-checked", "modal-state");
        } else {
            // Fehler behandeln
            console.error("Fehler beim Aktualisieren des Ereignisses:", xhr.responseText);
        }
    };

    xhr.send(JSON.stringify(eventData));
}



// Funktion zum Drucken von Monat und Jahr in der Navigation
function printNavigationMonthAndYear(year, month) {

    // Alle Monatsnamen
    const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"];



    return monthNames[month - 1] + " " + year;

}


function getDateByOption(action) {
    // Alle Optionen
    const options = ["GET_CURRENT_YEAR", "GET_CURRENT_MONTH", "GET_CURRENT_DAY_NAME",
        "GET_CURRENT_DAY_NUMBER", "GET_CURRENT_TIME"
    ];

    // Initialisieren des Datums
    var date = new Date(action.payload);


    // Alle Monatsnamen
    const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"];

    // Alle Wochentagsnamen
    const dayNames = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Donnerstag", "Samstag",
        "Sonntag"];


    switch (action.type) {
        case "GET_CURRENT_YEAR":
            return new Date(action.payload).getFullYear();

        case "GET_CURRENT_MONTH_NAME":
            return monthNames[date.getMonth()];

        case "GET_CURRENT_DAY_NAME":
            return dayNames[date.getDay() - 1];

        case "GET_CURRENT_DAY_NUMBER":
            return date.getDate();

        case "GET_CURRENT_TIME":
            return pairNbrFormat(date.getHours()) + " : " + pairNbrFormat(date.getMinutes());
        case "GET_CURRENT_MONTH_FIRST_DAY_INDEX":
            // Rückgabe des ersten Tagesindex des aktuellen Monats
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

            return firstDay.getDay();

        case "GET_CURRENT_MONTH_LAST_DAY":
            const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            return lastDay.getDate();
        case "GET_CURRENT_MONTH_LAST_DAY_INDEX":
            const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            return lastDayIndex.getDay();

        case "LAST_PREV_MONTH_DAY":
            date.setDate(0);
            return date.getDate();

        case "LAST_PREV_MONTH_DAY_INDEX":
            date.setDate(0);
            return date.getDay();
        default:
            break;
    }

}

// Funktion zum Hinzufügen von 0 zu einer Zahl, z. B. 1 ==> 02
function pairNbrFormat(nbr) {
    return (nbr < 10) ? '0' + nbr.toString() : nbr.toString();
}

// Funktion zum Vergleichen von zwei Daten
function compareTwoDates(date1, date2) {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth()) {
        return true;
    }
    else {
        return false;
    }
}


// Funktion zum Drucken des Datums als Jahr-Monat-Tag
function formatDate(datePlaceHolder) {
    // Wenn wir ein neues Datum im Platzhalter platzieren, bedeutet das, dass wir das aktuelle Datum möchten
    var date = datePlaceHolder;
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    return newdate = year + "-" + pairNbrFormat(month) + "-" + pairNbrFormat(day);
}



// DOM aktualisieren
document.getElementById("month-year-title").setAttribute("current-date", initilizeDate.currentDateFormat);

const navigationTitle = document.getElementById("month-year-title");





// Funktion zum Abrufen der Ereignisliste

function getEventList() {
    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();

        xhr.open("GET", "../includes/events/eventList.inc.php", true);

        xhr.onload = function () {
            if (this.status === 200) {

                resolve(JSON.parse(this.responseText));

            } else {
                reject(new Error("can't fetch the event"));
            }
        };
        xhr.send();
    });
}

// Funktion zum Aufrufen der Ereignisliste

function callEventList() {

    getEventList().then(function (data) {
        generalEventList = JSON.parse(JSON.stringify(data));
        let eventList = JSON.parse(JSON.stringify(data));//with like to fix edit to data because it's object it's refrence type


        // Ereignisse nach Startdatum sortieren
        eventList.sort(function (a, b) {
            return new Date(b.startDate) - new Date(a.startDate);
        });

        // Zeit von Datum entfernen
        let newEventList = removeTimeFromDates(eventList);


        // Alle <td> Elemente mit dem Attribut "attr-date" auswählen
        const tds = document.getElementById("tbodyMonthView").querySelectorAll("td[attr-date]");

        // Über jedes <td> Element iterieren
        tds.forEach(td => {
            // Iterate over each event in newEventList
            td.firstElementChild.querySelector(".list-event").innerHTML = "";
            Object.values(newEventList).forEach(event => {
                // Überprüfen, ob das Ereignis das Datum des aktuellen <td> Elements umfasst
                const tdDate = new Date(td.getAttribute("attr-date"));
                const eventStartDate = new Date(event.startDate);
                const eventEndDate = new Date(event.endDate);
                if (tdDate >= eventStartDate && tdDate <= eventEndDate) {
                    // Ereignis-Element zum aktuellen <td> Element hinzufügen
                    const eventElement = document.createElement("a");
                    eventElement.textContent = event.eventTitle;
                    eventElement.id = event.idEvent;
                    eventElement.classList.add("event");
                    eventElement.style.backgroundColor = event.categoryColor;

                    // Breite des Ereignis-Elements basierend auf der Ereignisdauer anpassen
                    const eventDuration = (eventStartDate.getTime() === eventEndDate.getTime()) ? "100%" : "100%";
                    eventElement.style.width = eventDuration;

                    // Ereignis-Element zum aktuellen <td> Element hinzufügen

                    td.firstElementChild.querySelector(".list-event").appendChild(eventElement);
                }
            });
        });



        //Ladeereignis in der Wochenansicht des Kalenders 
        let eventWeekList = JSON.parse(JSON.stringify(data));

        const weekTds = document.getElementById("tbodyWeekView").querySelectorAll('.td-week-event');

        let editedWeekeventList = editWeekDayListEvent(eventWeekList);
        for (let key in editedWeekeventList) {
            let event = editedWeekeventList[key];

            event.startDate = event.startDate.split(" ")[0];
            event.endDate = event.endDate.split(" ")[0];

        }


// Klasse für Wochenereignisse
tdHeight = 0;
        weekTds.forEach(td => {

            for (let key in editedWeekeventList) {

                let event = editedWeekeventList[key];

                if (td.getAttribute("attr-time") <= event.startTime && td.getAttribute("attr-end-time") > event.startTime
                    && td.getAttribute("attr-date") == event.startDate) {
                    const { rowspan, fullTime } = getTimeDifference(event.startTime, event.endTime);

                    let colspan = 0;

                    if (getDaysDiff(new Date(event.startDate), new Date(event.endDate)) > 0) {
                        colspan = getDaysDiff(new Date(event.startDate), new Date(event.endDate));

                    }


                    let eventElement = document.createElement("a");
                    eventElement.textContent = `${event.eventTitle} ${fullTime}`;

                    eventElement.style.cssText = `  position: absolute;
                                                    background-color: ${event.categoryColor};
                                                    height: ${rowspan * 40}px;
                                                    font-size: 14px;
                                                    color: #fff;
                                                    padding: 2px;
                                                    border-radius: 8px;
                                                    width: ${120 + (120 * colspan)}px;
                                                    display: flex;
                                                    flex-direction: column;
                                                    `;

                    td.appendChild(eventElement);
                    break;//this one 
                }
            }
        });


        //load Ereignis in der Ansicht Tage Kalender
        let eventDayList = JSON.parse(JSON.stringify(data));

        const dayTds = document.getElementById("tbodyDaysView").querySelectorAll('.td-day-event');

        //Ändern, um startTime und endTime hinzuzufügen
        let editedDayeventList = editWeekDayListEvent(eventDayList);
        //Zeit aus startDate und endDate entfernen
        for (let key in editedDayeventList) {
            let event = editedDayeventList[key];

            event.startDate = event.startDate.split(" ")[0];
            event.endDate = event.endDate.split(" ")[0];

        }


        //Klassentag-Veranstaltung
        dayTds.forEach(td => {

            for (let key in editedDayeventList) {

                let event = editedDayeventList[key];

                if (td.getAttribute("attr-time") <= event.startTime && td.getAttribute("attr-end-time") > event.startTime
                    && td.getAttribute("attr-date") == event.startDate) {
                    const { rowspan, fullTime } = getTimeDifference(event.startTime, event.endTime);

                    let eventElement = document.createElement("a");
                    eventElement.textContent = `${event.eventTitle} ${fullTime}`;

                    eventElement.style.cssText = `  position: absolute;
                                                    background-color: ${event.categoryColor};
                                                    height: ${rowspan * 40}px;
                                                    font-size: 14px;
                                                    color: #fff;
                                                    padding: 2px;
                                                    border-radius: 8px;
                                                    width: 865px;
                                                    display: flex;
                                                    flex-direction: column;
                                                    `;

                    td.appendChild(eventElement);



                    break;//this one 
                }


            }



        });


    }).catch(function (error) {
        console.error(error.message);
    });
}


function getTimeDifference(time1, time2) {
    const time1Parts = time1.split(':');
    const time2Parts = time2.split(':');
    const hour1 = parseInt(time1Parts[0], 10); 
    const hour2 = parseInt(time2Parts[0], 10);
    const minute1 = parseInt(time1Parts[1], 10);
    const minute2 = parseInt(time2Parts[1], 10);

    // Stunde mit führender Null auffüllen, wenn es sich um eine einstellige Zahl handelt
    const paddedHour1 = hour1 < 10 ? '0' + hour1 : hour1.toString();
    const paddedHour2 = hour2 < 10 ? '0' + hour2 : hour2.toString();

    let newTime1;
    let newTime2;
    let newMinute1;

    if (minute1 > 30) {
        newMinute1 = '30';
    } else {
        newMinute1 = '00';
    }

    let newMinute2;
    let newHour2;

    if (minute2 > 30) {
        newHour2 = hour2 + 1;
        newMinute2 = '00';
    } else {
        newMinute2 = '30';
        newHour2 = hour2;
    }

    const paddedHour2Plus1 = newHour2 < 10 ? '0' + newHour2 : newHour2.toString();

    newTime1 = paddedHour1 + ':' + newMinute1;
    newTime2 = paddedHour2Plus1 + ':' + newMinute2;

    const fullTime = newTime1 + " " + newTime2;

    return { rowspan: getHalfHourIntervals(newTime1, newTime2), fullTime: fullTime };
}


function getHalfHourIntervals(startTime, endTime) {
    const now = new Date();
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute);

    const diff = (end.getTime() - start.getTime()) / 1000 / 60; // get difference in minutes
    const intervals = Math.round(diff / 30); // divide by 30 minutes and round to nearest integer

    return intervals;
}

//Tag abweichend erhalten
function getDaysDiff(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}


function removeTimeFromDates(object) {
    var newObject = Object.assign({}, object);//create a copy of object

    for (let i = 0; i < object.length; i++) {

        newObject[i].startDate = object[i].startDate.split(" ")[0];//override the properite  
        newObject[i].endDate = object[i].endDate.split(" ")[0];

    }

    return newObject;
}

function formatDateCompare(date) {

    const dateArray = date.split("-");

    const year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];

    if (month.length === 1) {
        month = "0" + month;
    }

    if (day.length === 1) {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}

//Ersetzen des Datums zwecks Fixierung des nächsten Monatstages 
function replaceDay(dateStr, newDay) {
    const dateArr = dateStr.split("-");
    dateArr[2] = newDay;
    return dateArr.join("-");
}


//Auslesen des nächsten Monats, der im nächsten Datum gedruckt werden soll td
function nextMonthToString(year, month, day) {

    if (month == 12) {
        month = 1;
        year++;
    }
    else {
        month++;
    }

    return year.toString() + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0');
}

//Auslesen des Vormonats für den Druck im nächsten Datum td
function prevMonthToString(year, month, day) {
    if (month == 1) {
        month = 12;
        year--;
    }
    else {
        month--;
    }


    return year + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0');
}


//Funktion zur Ermittlung der Uhrzeit in Stunde:Minuten
function getTime(date) {
    var date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    return hours + ":" + minutes;
}



function editWeekDayListEvent(objParam) {

    let newObj = Object.assign({}, objParam);


    Object.values(newObj).forEach(obj => {

        obj.startTime = getTime(obj.startDate);
        obj.endTime = getTime(obj.endDate);


    });

    return newObj;
}



//die Funktion Navigation
function generateNavWeekCalendar(date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    let week = [];
    let day = new Date(startOfWeek);
    while (day <= endOfWeek) {
        week.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }


    var newFormattedDate = [];

    Object.values(week).forEach(weekDate => {

        var formattedDate = weekDate.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });


        newFormattedDate.push(formattedDate.split("/").reverse().join("-"));


    });




    return newFormattedDate;
}

