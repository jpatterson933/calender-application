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

//time display
var currentTime = moment()

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


renderNineTask();
renderTenTask();
renderElevenTask();
renderTwelveTask();
renderThirteenTask();
renderFourteenTask();
renderFifteenTask();
renderSixteenTask();
renderSeventeenTask();



//inputs current date and time into 
$("#date").text(currentTime.format('MMMM Do YYYY, h:mm:ss a'));


//event listners that save input
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



//function to save



