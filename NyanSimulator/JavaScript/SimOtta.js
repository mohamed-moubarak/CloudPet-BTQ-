var sql ;
var direction = "left";
var eaten = false;
var eatenFood = Math.floor(Math.random() * 50) + 2;
var buttonClicked = false;
var read = new FileReader();
var seconds;
var minute; 
var hours; 
var day;
var month;
var newDate =  new Date();
var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var actualSec;
var actualMin;
var actualHour;

$(document).ready(function(){
var isRunnung = false;

	var date = new Date();
	if(date.getHours() >= 6 && date.getHours() < 18)
	{
        $("body.nyan").css("background-image",  'url(' + "Images/RoomDay.png" +')');	
	}

	else
	{
         $("body.nyan").css("background-image",  'url(' + "Images/RoomNight.png" +')');

	}

	$("#feedButton").click(function(){
		var e = jQuery.Event("keydown");
        e.which = 70; 
        $("#feedButton").trigger(e)
	});

$("#deviceInfo").html("<h3> Press F or click on the button to feed the cat!</h3>");
$("div.sa3d").addClass("nyan");
$("div.nyan").addClass("reverse-left");


newDate.setDate(newDate.getDate());
day  = newDate.getDate();
month = newDate.getMonth();
$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

 actualSec = setInterval( function() {
   seconds = new Date().getSeconds();
  $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
  },1000);
  
actualMin = setInterval( function() {
   minutes = new Date().getMinutes();
  $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
  
actualHour = setInterval( function() {
   hours = new Date().getHours();

  $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000); 



});


$(document).keydown(function(e){
var key = e.which;  
if((key == 70 || buttonClicked ) && !eaten )
{
eaten = true;
$("div.nyan").removeClass("nyan");
$("div.sa3d").addClass("NyanMoving");
$("div.NyanMoving").animate({marginLeft: "-=487px" ,easing: 'linear'}, 3000);	

setTimeout(function(){$("div.sa3d").removeClass("NyanMoving"); }, 3000);
setTimeout(function(){$("div.sa3d").addClass("NyanLoweringTounge");}, 3000);

setTimeout(function()
{
	$("div.sa3d").removeClass("NyanLoweringTounge"); 
	$("div.sa3d").addClass("nyan");
	$("#deviceInfo").html("<h3>Your cat ate " + eatenFood + " grams !</h3>" )}, 6000);
setTimeout(function(){  
    if(direction == "left")
{	
	$("div.nyan").removeClass("reverse-left");
	$("div.nyan").addClass("reverse-right");
	direction = "right"; 
}

 $("div.sa3d").addClass("NyanMoving");
 $("div.NyanMoving").animate({marginLeft: "+=487px", easing: 'linear'}, 3000);

 setTimeout(
 	function()
 	{
 		$("div.NyanMoving").removeClass("NyanMoving"); 
 		$("div.sa3d").addClass("nyan");
 		$("div.nyan").removeClass("reverse-right");
 		direction = "left";
	    $("div.nyan").addClass("reverse-left");
	    $("#deviceInfo").html("<h3> Press F or click on the button to feed the cat!</h3>");
	    eaten = false;
    }
    ,3000);
}, 6000);
}
});




function Run()
{
clearInterval(actualSec);
clearInterval(actualMin);
clearInterval(actualHour);
day = newDate.getDay();
setInterval( function() {
seconds += 60;
  $("#sec").html(seconds);
  $("#min").html(minutes);
  $("#hours").html(hours);
 if (seconds >= 60)
{
  minutes++;
}
if (minutes == 60)
{
  hours++;
}
if (hours == 24)
{
day++;
}
if (month == 2)
{
  if (day == 28)
{
month++;
}
else if (month == 1 || month == 3 || month == 5 || month  == 7 || month == 8 || month == 10 || month == 12)
{
  if (day == 31)
  {
    month++;
  }
}
else
{
  if (day == 30)
    month++;
}
}

if (month == 12)
{
year++;
}
minutes = minutes < 60 ? minutes : 0;
seconds = seconds < 60 ? seconds : 0;
hours = hours < 24 ? hours : 0;
$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
console.log(day);
day = day ==  7 ? day % 7 + 1: day % 7;

 $('#Date').html(dayNames[day] + " " + day + " " + monthNames[month] + ' ' + newDate.getFullYear());

  },0.00000005);

}
  
