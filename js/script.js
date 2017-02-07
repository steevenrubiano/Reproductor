'use strict';
document.addEventListener("DOMContentLoaded", main, false);
function main (){
	//VIDEO *********************************************
	var myVideo = document.getElementsByTagName("video")[0];
	//START VOLUME *********************************************
	myVideo.volume = 0.5;
	//VOLUME BUTTONS AND EVENTS *********************************************
	var btnMute = document.getElementsByTagName("img")[0];
	var btnLowVol = document.getElementsByTagName("img")[1];
	btnLowVol.addEventListener("click", ctrlVol, false);
	var btnHighVol = document.getElementsByTagName("img")[2];
	btnHighVol.addEventListener("click", ctrlVol, false);
	//PLAY BUTTONS AND EVENTS *********************************************
	var btnRewind = document.getElementsByTagName("img")[3];
	btnRewind.addEventListener("click", rewindAndForward, false);
	var btnPlay = document.getElementsByTagName("img")[4];
	btnPlay.addEventListener("click", ctrlPlayPause, false);
	var btnPause = document.getElementsByTagName("img")[5];
	btnPause.addEventListener("click", ctrlPlayPause, false);
	var btnForward = document.getElementsByTagName("img")[6];
	btnForward.addEventListener("click", rewindAndForward, false);
	//FULLSCREEN BUTTONS AND EVENTS *********************************************
	var contenedor = document.getElementById("contenedor");
	var btnFullScreen = document.getElementsByTagName("img")[7];
	var btnSmallScreen = document.getElementsByTagName("img")[8];
	btnFullScreen.addEventListener("click", fullScreenVideo, false);
	btnSmallScreen.addEventListener("click", fullScreenVideo, false);
	//VOLUMEN AND TIME RANGES AND EVENTS *********************************************
	var rangeVol = document.getElementById("rangeVol");
	var rangeTime = document.getElementById("rangeTime");
	rangeVol.addEventListener("change", volumenSlider, false);
	rangeTime.addEventListener("change", playSlider, false);
	//SPANS SHOW CURRENT TIME AND DURATION *********************************************
	var spanCurrentTime = rangeTime.previousElementSibling;
	var spanVideoDuration = rangeTime.nextElementSibling;
	//SPAN AND EVENTS INFO VOL *********************************************
	var spanInfoVol = document.getElementsByTagName("span")[0];
	btnMute.addEventListener("mouseover", setInfoVol, false);
	btnLowVol.addEventListener("mouseover", setInfoVol, false);
	btnHighVol.addEventListener("mouseover", setInfoVol, false);
	rangeVol.addEventListener("mouseover", setInfoVol, false);
	btnMute.addEventListener("mouseout", removeInfoVol, false);
	btnLowVol.addEventListener("mouseout", removeInfoVol, false);
	btnHighVol.addEventListener("mouseout", removeInfoVol, false);
	rangeVol.addEventListener("mouseout", removeInfoVol, false);
	//KEY EVENTS *********************************************
	var count = 0;
	document.addEventListener("keydown", ctrlPlayPause, false);
	document.addEventListener("keydown", ctrlVol, false);
	document.addEventListener("keydown", rewindAndForward, false);
	//CONTROL TASK 1: VOLUME *********************************************
	function ctrlVol(evt){
		if (evt.target == btnLowVol || evt.keyCode == 40) {
			myVideo.volume -= 0.1;
			if(myVideo.volume.toFixed(1) == 0){
				myVideo.muted = true;
				btnLowVol.style.display = "none";
				btnMute.style.display = "flex";
			}
			rangeVol.value = myVideo.volume;
		}
		else if (evt.target == btnHighVol || evt.keyCode == 38){
			if (myVideo.muted = true) {
				myVideo.muted = false;
				btnMute.style.display = "none";
				btnLowVol.style.display = "flex";
			}
			myVideo.volume += 0.1;
			rangeVol.value = myVideo.volume;
		}
	}
	function volumenSlider(evt) {
		myVideo.volume = evt.target.value;
		if(myVideo.volume.toFixed(1) == 0){
				myVideo.muted = true;
				btnLowVol.style.display = "none";
				btnMute.style.display = "flex";
		}
		if(myVideo.volume.toFixed(1) > 0){
				myVideo.muted = false;
				btnMute.style.display = "none";
				btnLowVol.style.display = "flex";
		}
	}
	//CONTROL TASK 2: PLAY *********************************************
	function rewindAndForward(evt){
		if (evt.target == btnRewind || evt.keyCode == 37) {
			myVideo.currentTime -= (myVideo.duration * 0.2);
		}
		else if (evt.target == btnForward || evt.keyCode == 39){
			myVideo.currentTime += (myVideo.duration * 0.2);
		}
	}
	function ctrlPlayPause(evt){
		if (evt.target == btnPlay || (evt.keyCode == 32 && count%2==0)) {
			//LAUNCH INTERVAL
			var myIdInterval = setInterval(function() { 
				myIntervalCurrentTime();
			}, 500);
			btnPlay.style.display = "none";
			btnPause.style.display = "flex";
			myVideo.play();
			count++;
		}
		else if (evt.target == btnPause || (evt.keyCode == 32 && count%2!==0)){
 			clearInterval(myIdInterval);
 			btnPause.style.display = "none";
			btnPlay.style.display = "flex";
			myVideo.pause();
			count = 0;
		}
	}
	//CONTROL TASK 3: FULLSCREEN *********************************************
	function fullScreenVideo(evt){
		if (evt.target == btnFullScreen) {		
			if (contenedor.requestFullscreen) {
				contenedor.requestFullscreen();
			} else if (contenedor.webkitRequestFullscreen) {
				contenedor.webkitRequestFullscreen();
			} else if (contenedor.mozRequestFullScreen) {
				contenedor.mozRequestFullScreen();
			} else if (contenedor.msRequestFullscreen) {
				contenedor.msRequestFullscreen();
			}
			btnFullScreen.style.display = "none";
			btnSmallScreen.style.display = "flex";
		}
		else {   
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			btnSmallScreen.style.display = "none";
			btnFullScreen.style.display = "flex";
		}
	}
	//CONTROL TASK 4: SHOW CURRENT TIME *********************************************
	spanCurrentTime.textContent = changeTime(myVideo.currentTime);
	function myIntervalCurrentTime() {
	    spanCurrentTime.textContent = changeTime(myVideo.currentTime);
	    if (myVideo.currentTime == myVideo.duration) {
		 	btnPause.style.display = "none";
			btnPlay.style.display = "flex";
			myVideo.currentTime = 0;
	    }
	    rangeTime.value = myVideo.currentTime;
	}
	//CONTROL TASK 5: SLIDER TIME *********************************************
	function playSlider(evt) {
		myVideo.currentTime = evt.target.value;
	}
	//CONTROL TASK 6: SHOW VIDEO DURATION *********************************************
	myVideo.addEventListener('loadedmetadata', function() {
	    spanVideoDuration.textContent = changeTime(myVideo.duration);
	    rangeTime.setAttribute("max", myVideo.duration.toFixed(1));
	});
	//INFO VOLUME *********************************************
	function setInfoVol(evt) {
		spanInfoVol.style.display = "flex";
		spanInfoVol.textContent = (myVideo.volume.toFixed(1)) * 100 + "%";
	}
	function removeInfoVol(evt) {
		spanInfoVol.style.display = "none";
	}
	//AUXILIARY FUNCTIONS*********************************************
	//FORMAT SECONDS
	function changeTime(time) {
		var hours = Math.floor( time / 3600 );  
		var minutes = Math.floor( (time % 3600) / 60 );
		var seconds = Math.floor( time % 60 );
		hours = hours == 0 ? '00' : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		var result = hours + ":" + minutes + ":" + seconds;
		return result;
	}
}