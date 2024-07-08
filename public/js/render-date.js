var todayDate = document.getElementById('todayDate');
var deadlineDate = document.getElementById('deadlineDate');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = "0" + dd
}
if (mm < 10) {
    mm = "0" + mm
}

today = yyyy + "-" + mm + "-" + dd
// console.log(today)

todayDate.value = today;
deadlineDate.min = today;