var nineSave = document.getElementById("nine-save-task");
var tenSave = document.getElementById("ten-save-task");
var elevenSave = document.getElementById("eleven-save-task");
var twelveSave = document.getElementById("twelve-save-task");
var thirteenSave = document.getElementById("thirteen-save-task");
var fourteenSave = document.getElementById("fourteen-save-task");
var fifteenSave = document.getElementById("fifteen-save-task");
var sixteenSave = document.getElementById("sixteen-save-task");
var seventeenSave = document.getElementById("seventeen-save-task");

var test = $("save");

//
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
var date = moment()
$("#date").text(date.format('MMMM Do YYYY, h:mm:ss a'));

//
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



