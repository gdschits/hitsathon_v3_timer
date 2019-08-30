const HOURS = 24
var target_date, days, hours, minutes, seconds, countdown;

window.onload = function() {
	if (localStorage.getItem("timer") === null) {
		target_date = new Date().getTime() + (1000 * 3600 * HOURS); // initialize the time
	} else {
		onStartButtonClick()
		target_date = localStorage.getItem("timer") // retrieve the saved time
	}
	days, hours, minutes, seconds; // variables for time units
	countdown = document.getElementById("tiles"); // get tag element
	getCountdownInit();
}

// start the timer manually
function onStartButtonClick() {
	document.getElementById("startButton").style.display = 'none';
	setInterval(function () { getCountdown(); }, 1000);
}

// displays the initial values | called only once
function getCountdownInit() {
	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;
	days = pad(parseInt(seconds_left / 86400));
	seconds_left = seconds_left % 86400;
	hours = pad(parseInt(seconds_left / 3600));
	seconds_left = seconds_left % 3600;
	minutes = pad(parseInt(seconds_left / 60));
	seconds = pad(parseInt(seconds_left % 60));
	// format countdown string + set tag value
	countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
}

//  updates the timer | called using recursion
function getCountdown() {
	localStorage.setItem("timer", target_date) // save the time here
	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;
	days = pad(parseInt(seconds_left / 86400));
	seconds_left = seconds_left % 86400;
	hours = pad(parseInt(seconds_left / 3600));
	seconds_left = seconds_left % 3600;
	minutes = pad(parseInt(seconds_left / 60));
	seconds = pad(parseInt(seconds_left % 60));
	// format countdown string + set tag value
	countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
}

// helper function for displaying
function pad(n) {
	return (n < 10 ? '0' : '') + n;
}