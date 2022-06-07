//variables to clear specific time slots
let clearStorage = document.getElementById("clear-storage");

//variables for making time text containers into clear buttons
let nineClear = $("#nine-clear");
let tenClear = $("#ten-clear");
let elevenClear = $("#eleven-clear");
let twelveClear = $("#twelve-clear");
let thirteenClear = $("#thirteen-clear");
let fourteenClear = $("#fourteen-clear");
let fifteenClear = $("#fifteen-clear");
let sixteenClear = $("#sixteen-clear");
let seventeenClear = $("#seventeen-clear");

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

// //functions to clear time slots
nineClear.on("click", function (){
    localStorage.removeItem("9-task");
    location.reload();
})
tenClear.on("click", function () {
    localStorage.removeItem("10-task");
    location.reload();
})
elevenClear.on("click", function () {
    localStorage.removeItem("11-task");
    location.reload();
})
twelveClear.on("click", function () {
    localStorage.removeItem("12-task");
    location.reload();
})
thirteenClear.on("click", function () {
    localStorage.removeItem("13-task");
    location.reload();
})
fourteenClear.on("click", function () {
    localStorage.removeItem("14-task");
    location.reload();
})
fifteenClear.on("click", function () {
    localStorage.removeItem("15-task");
    location.reload();
})
sixteenClear.on("click", function () {
    localStorage.removeItem("16-task");
    location.reload();
})
seventeenClear.on("click", function () {
    localStorage.removeItem("17-task");
    location.reload();
})

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

//time display
let currentTime = moment()
let currentHour = currentTime.hours();

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

//hour and element are the paraemeters we will define inside of the funciotn changeColor when we run it above
function changeColor(hour, element) {
    if (currentHour === hour) {
        element.style.backgroundColor = "rgba( 255, 0, 0, .3)";
    } else if (currentHour > hour) {
        element.style.backgroundColor = "rgba(160, 160, 160, .5)";
    } else {
        element.style.backgroundColor = "rgba(0, 255, 0, .1)";
    }
}

//variables to grab save buttons
let nine = document.getElementById("nine");
let ten = document.getElementById("ten");
let eleven = document.getElementById("eleven");
let twelve = document.getElementById("twelve");
let thirteen = document.getElementById("thirteen");
let fourteen = document.getElementById("fourteen");
let fifteen = document.getElementById("fifteen");
let sixteen = document.getElementById("sixteen");
let seventeen = document.getElementById("seventeen");

//inputs current date and time into 
$("#date").text(currentTime.format('MMMM Do YYYY, h:mm:ss a'));

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
}
saveTasks()

//functions to save tasks
nine.addEventListener("click", function() {
    localStorage.setItem("9-task", JSON.stringify(nineSave.value));
})
ten.addEventListener("click", function() {
    localStorage.setItem("10-task", JSON.stringify(tenSave.value));
})
eleven.addEventListener("click", function() {
    localStorage.setItem("11-task", JSON.stringify(elevenSave.value));
})
twelve.addEventListener("click", function() {
    localStorage.setItem("12-task", JSON.stringify(twelveSave.value));
})
thirteen.addEventListener("click", function() {
    localStorage.setItem("13-task", JSON.stringify(thirteenSave.value));
})
fourteen.addEventListener("click", function() {
    localStorage.setItem("14-task", JSON.stringify(fourteenSave.value));
})
fifteen.addEventListener("click", function() {
    localStorage.setItem("15-task", JSON.stringify(fifteenSave.value));
})
sixteen.addEventListener("click", function() {
    localStorage.setItem("16-task", JSON.stringify(sixteenSave.value));
})
seventeen.addEventListener("click", function() {
    localStorage.setItem("17-task", JSON.stringify(seventeenSave.value));
})

//function to clear all
clearStorage.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});