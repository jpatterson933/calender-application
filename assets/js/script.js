//time display
let currentTime = moment()

//variables to clear specific time slots
const clearStorage = document.getElementById("clear-storage");

//variabls to pulled stored tasks
let nineTaskStored = JSON.parse(localStorage.getItem("9-task"));
let tenTaskStored = JSON.parse(localStorage.getItem("10-task"));
let elevenTaskStored = JSON.parse(localStorage.getItem("11-task"));
let twelveTaskStored = JSON.parse(localStorage.getItem("12-task"));
let thirteenTaskStored = JSON.parse(localStorage.getItem("13-task"));
let fourteenTaskStored = JSON.parse(localStorage.getItem("14-task"));
let fifteenTaskStored = JSON.parse(localStorage.getItem("15-task"));
let sixteenTaskStored = JSON.parse(localStorage.getItem("16-task"));
let seventeenTaskStored = JSON.parse(localStorage.getItem("17-task"));

//function to display saved tasks
saveTasks = () => {
    $("#nine-save-task").text(nineTaskStored)
    $("#ten-save-task").text(tenTaskStored)
    $("#eleven-save-task").text(elevenTaskStored)
    $("#twelve-save-task").text(twelveTaskStored)
    $("#thirteen-save-task").text(thirteenTaskStored)
    $("#fourteen-save-task").text(fourteenTaskStored)
    $("#fifteen-save-task").text(fifteenTaskStored)
    $("#sixteen-save-task").text(sixteenTaskStored)
    $("#seventeen-save-task").text(seventeenTaskStored)
};
saveTasks();

// //functions to clear time slots
$("#nine-clear").click(function () {
    localStorage.removeItem("9-task");
    location.reload();
});
$("#ten-clear").click(function () {
    localStorage.removeItem("10-task");
    location.reload();
});
$("#eleven-clear").click(function () {
    localStorage.removeItem("11-task");
    location.reload();
});
$("#twelve-clear").click(function () {
    localStorage.removeItem("12-task");
    location.reload();
});
$("#thirteen-clear").click(function () {
    localStorage.removeItem("13-task");
    location.reload();
});
$("#fourteen-clear").click(function () {
    localStorage.removeItem("14-task");
    location.reload();
});
$("#fifteen-clear").click(function () {
    localStorage.removeItem("15-task");
    location.reload();
});
$("#sixteen-clear").click(function () {
    localStorage.removeItem("16-task");
    location.reload();
});
$("#seventeen-clear").click(function () {
    localStorage.removeItem("17-task");
    location.reload();
});


//variables that grab text input
let nineSave = document.getElementById("nine-save-task");
let tenSave = document.getElementById("ten-save-task");
let elevenSave = document.getElementById("eleven-save-task");
let twelveSave = document.getElementById("twelve-save-task");
let thirteenSave = document.getElementById("thirteen-save-task");
let fourteenSave = document.getElementById("fourteen-save-task");
let fifteenSave = document.getElementById("fifteen-save-task");
let sixteenSave = document.getElementById("sixteen-save-task");
let seventeenSave = document.getElementById("seventeen-save-task");

//these run our function changeColor with the paraemters in place
//the number is the hour we paraemeter we are setting it
//nineSave is the box that we want the element paraemterr to affect
changeColor(9, nineSave);
changeColor(10, tenSave);
changeColor(11, elevenSave);
changeColor(12, twelveSave);
changeColor(13, thirteenSave);
changeColor(14, fourteenSave);
changeColor(15, fifteenSave);
changeColor(16, sixteenSave);
changeColor(17, seventeenSave);

finishTask(nineSave);

//hchanges color based off of time, anything we have passed, opacity drops to 50%
function changeColor(hour, element) {
    let currentHour = currentTime.hours();

    if (currentHour === hour) {
        element.style.backgroundColor = "rgba( 255, 0, 0, .3)";
    } else if (currentHour > hour) {
        element.style.backgroundColor = "rgba(160, 160, 160, .5)";
        element.style.opacity = "50%";
    } else {
        element.style.backgroundColor = "rgba(0, 255, 0, .1)";
    }
};

// trying to save the checkbox so it stays check - using local storage
function finishTask(element) {

    let nineBox = document.getElementById('nine-box');
 
    
    nineBox.addEventListener('click', function (event) {
        console.log(event.target, "event target")

        

        const { name, value } = event.target;
        const item = localStorage.getItem(name);
        console.log(item)

        if (document.getElementById('nine-box').checked === true) {
            localStorage.setItem(name, value);
            element.style.textDecoration = "line-through";
            alert("You have complete these tasks!")
        } else if (document.getElementById('nine-box').checked !== true) {
            localStorage.removeItem(name);
            element.style.textDecoration = "none";
            alert("Looks like these tasks have not been completed!")
        }
    })
};

//inputs current date and time into 
$("#date").text(currentTime.format('MMMM Do YYYY, h:mm:ss A'));

//functions to save tasks
$("#nine").click(function () {
    localStorage.setItem("9-task", JSON.stringify(nineSave.value));
});
$("#ten").click(function () {
    localStorage.setItem("10-task", JSON.stringify(tenSave.value));
});
$("#eleven").click(function () {
    localStorage.setItem("11-task", JSON.stringify(elevenSave.value));
});
$("#twelve").click(function () {
    localStorage.setItem("12-task", JSON.stringify(twelveSave.value));
});
$("#thirteen").click(function () {
    localStorage.setItem("13-task", JSON.stringify(thirteenSave.value));
});
$("#fourteen").click(function () {
    localStorage.setItem("14-task", JSON.stringify(fourteenSave.value));
});
$("#fifteen").click(function () {
    localStorage.setItem("15-task", JSON.stringify(fifteenSave.value));
});
$("#sixteen").click(function () {
    localStorage.setItem("16-task", JSON.stringify(sixteenSave.value));
});
$("#seventeen").click(function () {
    localStorage.setItem("17-task", JSON.stringify(seventeenSave.value));
});

//function to clear all
clearStorage.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});