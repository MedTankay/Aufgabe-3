
//alle Modalitäten schließen
const closeBtn =  document.querySelectorAll(".modal__close").forEach((close) => {

    close.onclick = (e) => {

        const forAtt = e.target.getAttribute("for");
        if (forAtt) {
            document.getElementById(forAtt).classList.remove("modal-state-checked");

            document.getElementById(forAtt).classList.add("modal-state");
        }

    };
});


document.getElementById("addEvent").onclick = () => {

    
    document.getElementById("modal-1").classList.toggle("modal-state-checked");
    document.getElementById("modal-1").classList.toggle("modal-state");

}

/*Katastrophenauswahl */
let modal1_select = document.getElementById("modal1_select");
let modal2_select = document.getElementById("modal2_select");
let modal3_select = document.getElementById("modal3_select");

function loadCategoryOptions(selectElement) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../includes/categories/categoryList.inc.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var categoryList = JSON.parse(xhr.responseText);
            for (var i = 0; i < categoryList.length; i++) {
                var option = document.createElement("option");
                option.value = categoryList[i]["idCategory"];
                option.text = categoryList[i]["categoryName"];
                selectElement.appendChild(option);
            }
        }
    };
    
    xhr.send();
}

loadCategoryOptions(modal1_select);
loadCategoryOptions(modal2_select);
loadCategoryOptions(modal3_select);
/*Modale */

//mit Ansicht btn
const monthViewBtn = document.getElementById("month-view-btn");
const weekViewBtn = document.getElementById("week-view-btn");
const dayViewBtn = document.getElementById("day-view-btn");
const listViewBtn = document.getElementById("list-view-btn");

const monthView = document.getElementById("month-view");
const weekView = document.getElementById("week-view");
const dayView = document.getElementById("day-view");

const calender = document.getElementById("calender");
monthViewBtn.onclick = () =>{

    monthView.style.cssText = "display: block;  visibility: visible;";
    weekView.style.cssText = "display: none;  visibility: hidden;";
    dayView.style.cssText = "display: none;  visibility: hidden;";

    calender.classList.add("month-view-calendar");

    //Klasse entfernen
    calender.classList.remove("week-view-calendar");
    calender.classList.remove("days-view-calendar");

    navigationTitle.innerHTML = "";
    navigationTitle.innerHTML = printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth)
}

weekViewBtn.onclick = () =>{

    weekView.style.cssText = "display: block;  visibility: visible;";
    monthView.style.cssText = "display: none;  visibility: hidden;";
    dayView.style.cssText = "display: none;  visibility: hidden;";

    calender.classList.add("week-view-calendar");

    //Klasse entfernen
    calender.classList.remove("month-view-calendar");
    calender.classList.remove("days-view-calendar");

    navigationTitle.innerHTML = "";
    navigationTitle.innerHTML = printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth)
}

dayViewBtn.onclick = () =>{

    dayView.style.cssText = "display: block;  visibility: visible;";
    monthView.style.cssText = "display: none;  visibility: hidden;";
    weekView.style.cssText = "display: none;  visibility: hidden;";

    calender.classList.add("days-view-calendar");

    //Klasse entfernen
    calender.classList.remove("month-view-calendar");
    calender.classList.remove("week-view-calendar");

    navigationTitle.innerHTML = "";
    navigationTitle.innerHTML = initilizeDate.currentDay + " " +printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth)
}

//Ereignis modal 1 hinzufügen
const modal1_form = document.getElementById("modal1_form");

modal1_form.addEventListener('submit', function (e) {

    e.preventDefault();

    const eventTitle = document.getElementById("eventTitle").value;
    const startDate = document.getElementById("startDate").value;
    const startTime = document.getElementById("startTime").value;
    const endDate = document.getElementById("endDate").value;
    const endTime = document.getElementById("endTime").value;
    const modal1_select = document.getElementById("modal1_select").value;

    const startDateTime = startDate + " " + startTime;
    const endDateTime = endDate + " " + endTime;

    if(endDateTime > startDateTime){
        
        const errorMsg = document.getElementById("errorMsg");
    
    
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../includes/events/addEvent.inc.php', true);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
                fillCalenderList();

                const  addEvent = document.getElementById("modal-1");

                addEvent.classList.replace("modal-state-checked", "modal-state")
            }
        };
    
        errorMsg.innerHTML = "";
        const data = {
            eventTitle: eventTitle,
            startDate: startDateTime,
            endDate: endDateTime,
            category: modal1_select
        };

        xhr.send('data=' + JSON.stringify(data));

    }
    else{
        alert("Error");
    }


});


//Funktion, die zwei Eingaben vom Typ dateTime prüft, wenn wahr, bedeutet das, dass korrigiert wird
function verifyDateTimeInput(firstInput, secondInput) {
    const firstDate = new Date(firstInput);
    const secondDate = new Date(secondInput);

    return firstDate < secondDate;

}

// Abrufen der Kategorie-Kontrollkästchen und Kategorie-Eingaben
const categoryCheckbox = document.getElementById("categoryCheckbox");
const categoryInputs = document.getElementById("categoryInputs");

// Ereignis-Listener zum Kontrollkästchen hinzufügen
  function toggleCategoryInputs() {
        var addCategoryCheckbox = document.getElementById('addCategoryCheckbox');
        var categoryInputs = document.getElementById('categoryInputs');
        var categoryColorInputs = document.getElementById('categoryColorInputs');
        if (addCategoryCheckbox.checked) {
            categoryInputs.style.display = 'table-row';
            categoryColorInputs.style.display = 'table-row';
        } else {
            categoryInputs.style.display = 'none';
            categoryColorInputs.style.display = 'none';
        }
    }

    function toggleCategoryInputs() {
        var addCategoryCheckbox = document.getElementById('addCategoryCheckbox');
        var categoryInputs = document.getElementById('categoryInputs');
        var categoryColorInputs = document.getElementById('categoryColorInputs');
        var addCategoryButtonRow = document.getElementById('addCategoryButtonRow');
        if (addCategoryCheckbox.checked) {
            categoryInputs.style.display = 'table-row';
            categoryColorInputs.style.display = 'table-row';
            addCategoryButtonRow.style.display = 'table-row';
        } else {
            categoryInputs.style.display = 'none';
            categoryColorInputs.style.display = 'none';
            addCategoryButtonRow.style.display = 'none';
        }
    }

    function addCategory() {
        var categoryName = document.getElementById('categoryName').value;
        var categoryColor = document.getElementById('categoryColor').value;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    alert(xhr.responseText); 
                } else {
                    alert('Error: ' + xhr.status);
                }
            }
        };
        xhr.open('POST', '../includes/events/addCategory.inc.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('categoryName=' + encodeURIComponent(categoryName) + '&categoryColor=' + encodeURIComponent(categoryColor));
    }

/*Standardansicht anzeigen*/

switch (true) {
    case calenderSec.classList.contains("month-view-calendar"):
        monthView.style.cssText = "display: block;  visibility: visible;";
        weekView.style.cssText = "display: none;  visibility: hidden;";
        dayView.style.cssText = "display: none;  visibility: hidden;";

        calender.classList.add("month-view-calendar");

        calender.classList.remove("week-view-calendar");
        calender.classList.remove("days-view-calendar");

        navigationTitle.innerHTML = "";
    
        navigationTitle.innerHTML = printNavigationMonthAndYear(initilizeDate.currentYear, initilizeDate.currentMonth)

        break;

    case calenderSec.classList.contains("week-view-calendar"):
        weekView.style.cssText = "display: block;  visibility: visible;";
        monthView.style.cssText = "display: none;  visibility: hidden;";
        dayView.style.cssText = "display: none;  visibility: hidden;";
    

        calender.classList.add("week-view-calendar");

       
        calender.classList.remove("month-view-calendar");
        calender.classList.remove("days-view-calendar");

        fillCalenderWeekList(initilizeDate.currentYear+"-"+initilizeDate.currentMonth+"-"+initilizeDate.currentDay);


        break;

    case calenderSec.classList.contains("days-view-calendar"):
        dayView.style.cssText = "display: block;  visibility: visible;";
        monthView.style.cssText = "display: none;  visibility: hidden;";
        weekView.style.cssText = "display: none;  visibility: hidden;";

        calender.classList.add("days-view-calendar");

        
        calender.classList.remove("month-view-calendar");
        calender.classList.remove("week-view-calendar");

        fillCalenderDaysList(initilizeDate.currentYear+"-"+initilizeDate.currentMonth+"-"+initilizeDate.currentDay)

    break;

}