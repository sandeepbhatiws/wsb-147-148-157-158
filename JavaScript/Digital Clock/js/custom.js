
var date = "30 April 2025 23:59:59";

function digtalClock(){
    var current_date = new Date();
    var sale_date = new Date(date);
    var difference = (sale_date - current_date) / 1000; 
    
    
    var days = Math.floor(difference / 3600 / 24);   // days
    var hours = Math.floor((difference / 3600) % 24);    /// hours
    var minutes = Math.floor((difference / 60) % 60);   // minutes
    var seconds = Math.floor((difference % 60));   // seconds

    if(difference > 0){
        document.getElementById('days').innerText = days+' Days';
        document.getElementById('hours').innerText = hours+' Hours';
        document.getElementById('minutes').innerText = minutes+' Minutes';
        document.getElementById('seconds').innerText = seconds+' Seconds';
    }

    
}

setInterval(digtalClock,1000);

digtalClock();