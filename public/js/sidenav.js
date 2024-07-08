var notifsCount = document.getElementsByClassName('notifsCount');
console.log(notifsCount.length);

var countBell = document.getElementById('countBell')
countBell.innerHTML = "(" + notifsCount.length + ")"