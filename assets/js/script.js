//variables to clear specific time slots
var clearStorage = document.getElementById("clear-storage");


var nineClear = $("#nine-clear");
var tenClear = $("#ten-clear");
var elevenClear = $("#eleven-clear");
var twelveClear = $("#twelve-clear");
var thirteenClear = $("#thirteen-clear");
var fourteenClear = $("#fourteen-clear");
var fifteenClear = $("#fifteen-clear");
var sixteenClear = $("#sixteen-clear");
var seventeenClear = $("#seventeen-clear");

var children = document.getElementById("hourly-container").children;

// console.log(children);




//for loop cycles through children of hourly-container - the children of hourly container are the 9 hours of the 9-5 day
for (var i = 0; i < children.length; i++) {
    //var - will loop through the length of the children, and each loop will be stored into hourGrab
    var hourGrab = children[i];

    //hourlyGrabChildren will then take the children of each each child of #hourly-container and create an array like so
    //array position: element - id of element - class of element
    // 0: div#ten-clear.time
    // 1: textarea#ten-save-task.text-area
    // 2: button#ten.save
    var hourlyGrabChildren = hourGrab.children;




    //i can set attributes for all looped elements
    hourlyGrabChildren[0].setAttribute("style", "color:black; font-size: 15px");
    hourlyGrabChildren[1].setAttribute("style", "color: blue")
  
    hourlyGrabChildren[0].onclick = function () {
        localStorage.removeItem("9-task");
        location.reload();
    }

    console.log(hourlyGrabChildren[0]);
    
    
}


//set data attribute for each element
//check slack for link
//use data attribute in remove item in functions
//or even set id to be nineTask and use the id 



//functions to clear time slots
// nineClear.on("click", function (){
//     localStorage.removeItem("9-task");
//     location.reload();
// })
// tenClear.on("click", function () {
//     localStorage.removeItem("10-task");
//     location.reload();
// })
// elevenClear.on("click", function () {
//     localStorage.removeItem("11-task");
//     location.reload();
// })
// twelveClear.on("click", function () {
//     localStorage.removeItem("12-task");
//     location.reload();
// })
// thirteenClear.on("click", function () {
//     localStorage.removeItem("13-task");
//     location.reload();
// })
// fourteenClear.on("click", function () {
//     localStorage.removeItem("14-task");
//     location.reload();
// })
// fifteenClear.on("click", function () {
//     localStorage.removeItem("15-task");
//     location.reload();
// })
// sixteenClear.on("click", function () {
//     localStorage.removeItem("16-task");
//     location.reload();
// })
// seventeenClear.on("click", function () {
//     localStorage.removeItem("17-task");
//     location.reload();
// })


//variables that grab input
var nineSave = document.getElementById("nine-save-task");
var tenSave = document.getElementById("ten-save-task");
var elevenSave = document.getElementById("eleven-save-task");
var twelveSave = document.getElementById("twelve-save-task");
var thirteenSave = document.getElementById("thirteen-save-task");
var fourteenSave = document.getElementById("fourteen-save-task");
var fifteenSave = document.getElementById("fifteen-save-task");
var sixteenSave = document.getElementById("sixteen-save-task");
var seventeenSave = document.getElementById("seventeen-save-task");

//ternerary operator ? saying what you return if condition currenthour === 9 is true

//time display
var currentTime = moment()
var currentHour = currentTime.hours();

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


//hour and element are the paraemeters we will defin inside of the funciotn changeColor when we run it above
function changeColor(hour, element) {
    if (currentHour === hour) {
        element.style.backgroundColor = "rgba( 255, 0, 0, .3)";

    } else if (currentHour > hour) {
        element.style.backgroundColor = "rgba(160, 160, 160, .5)";

    } else {
        element.style.backgroundColor = "rgba(0, 255, 0, .1)";
    }
    //console log paraemeters to make sure they appear
    // console.log(hour, currentHour)
}


//variables to grab save buttons
var nine = document.getElementById("nine");
var ten = document.getElementById("ten");
var eleven = document.getElementById("eleven");
var twelve = document.getElementById("twelve");
var thirteen = document.getElementById("thirteen");
var fourteen = document.getElementById("fourteen");
var fifteen = document.getElementById("fifteen");
var sixteen = document.getElementById("sixteen");
var seventeen = document.getElementById("seventeen");


//variabls to pulled stored tasks
var nineTaskStored = JSON.parse(localStorage.getItem("9-task"));
var tenTaskStored = JSON.parse(localStorage.getItem("10-task"));
var elevenTaskStored = JSON.parse(localStorage.getItem("11-task"));
var twelveTaskStored = JSON.parse(localStorage.getItem("12-task"));
var thirteenTaskStored = JSON.parse(localStorage.getItem("13-task"));
var fourteenTaskStored = JSON.parse(localStorage.getItem("14-task"));
var fifteenTaskStored = JSON.parse(localStorage.getItem("15-task"));
var sixteenTaskStored = JSON.parse(localStorage.getItem("16-task"));
var seventeenTaskStored = JSON.parse(localStorage.getItem("17-task"));



//inputs current date and time into 
$("#date").text(currentTime.format('MMMM Do YYYY, h:mm:ss a'));





//functions to store tasks
function renderNineTask() {    
    document.getElementById("nine-save-task").innerHTML = nineTaskStored;
}
function renderTenTask() {
    document.getElementById("ten-save-task").innerHTML = tenTaskStored;
}
function renderElevenTask() {
    document.getElementById("eleven-save-task").innerHTML = elevenTaskStored;
}
function renderTwelveTask() {
    document.getElementById("twelve-save-task").innerHTML = twelveTaskStored;
}
function renderThirteenTask() {
    document.getElementById("thirteen-save-task").innerHTML = thirteenTaskStored;
}
function renderFourteenTask() {
    document.getElementById("fourteen-save-task").innerHTML = fourteenTaskStored;
}
function renderFifteenTask() {
    document.getElementById("fifteen-save-task").innerHTML = fifteenTaskStored;
}
function renderSixteenTask() {
    document.getElementById("sixteen-save-task").innerHTML = sixteenTaskStored;
}
function renderSeventeenTask() {
    document.getElementById("seventeen-save-task").innerHTML = seventeenTaskStored;
}

//shows saved tasks upon page reload
renderNineTask();
renderTenTask();
renderElevenTask();
renderTwelveTask();
renderThirteenTask();
renderFourteenTask();
renderFifteenTask();
renderSixteenTask();
renderSeventeenTask();

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





