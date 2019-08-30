const HOURS = 24 // default: 24
const MINUTES = 60 // default: 60
const countdown = document.getElementById("tiles"); // get tag element 
var target_date, days, hours, minutes, seconds;

window.onload = function () {
	if (localStorage.getItem("timer") === null) {
		target_date = new Date().getTime() + (1000 * MINUTES * 60 * HOURS); // initialize the time
	} else {
		target_date = localStorage.getItem("timer") // retrieve the saved time
		document.getElementById("startButton").style.display = 'none';
		getCountdown()
		var timeOutFucntion = setInterval(function () {
			if (((target_date - new Date().getTime()) / 1000) <= 0) {
				document.getElementById("countdown").style.display = 'none';
				document.getElementById("stopHacking").style.display = 'block';
				localStorage.removeItem("timer")
				clearTimeout(timeOutFucntion)
			} else {
				getCountdown();
			}
		}, 1000);
	}
	getCountdown();
}

// start the timer manually
function onStartButtonClick() {
	target_date = new Date().getTime() + (1000 * MINUTES * 60 * HOURS); // initialize the time
	localStorage.setItem("timer", target_date) // save the time here
	document.getElementById("startButton").style.display = 'none';
	getCountdown()
	var timeOutFucntion = setInterval(function () {
		if (((target_date - new Date().getTime()) / 1000) <= 0) {
			document.getElementById("countdown").style.display = 'none';
			document.getElementById("stopHacking").style.display = 'block';
			clearTimeout(timeOutFucntion)
		} else {
			getCountdown();
		}
	}, 1000);
}

function getCountdown() {
	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;
	days = pad(parseInt(seconds_left / 86400));
	seconds_left = seconds_left % 86400;
	hours = pad(parseInt(seconds_left / 3600));
	seconds_left = seconds_left % 3600;
	minutes = pad(parseInt(seconds_left / 60));
	seconds = pad(parseInt(seconds_left % 60));
	countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
}

// helper function for displaying
function pad(n) {
	return (n < 10 ? '0' : '') + n;
}