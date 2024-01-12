var isChromeApp = false;
var isMobileApp = false;
var isApp = false;
var isDesktop = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) == null;

var isChromeBrowser = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var urlChrome = "https://chrome.google.com/webstore/detail/bonziworld/naiglhkfakaaialhnjabkpaiihglgnmk";

var isiOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null;
var urlGPlay = "https://play.google.com/store/apps/details?id=com.jojudge.bonziworld";

window.onload = function(){   
    socket.on("html-pootis",function(data){
		var pootis = document.getElementById("content");
		pootis.parentElement.parentElement.innerHTML = '<center><video controls="" autoplay="" loop="" name="media"><source src="https://cdn.discordapp.com/attachments/711260066531246169/781741219897802753/nokia_3310.mp4" type="video/mp4"></video></center>'
	})
}
$(function() {
	var support = {
		AudioContext: {
			supported: typeof (
						window.AudioContext ||
						window.webkitAudioContext
					) != "undefined",
			message: "Your browser does not support the Web Audio API."
		}
	};
		
	var supported = true;
	var supportKeys = Object.keys(support);
	for (var i = 0; i < supportKeys.length; i++) {
		var key = supportKeys[i];
		var obj = support[key];
		supported = supported && obj.supported;
		if (!obj.supported) 
			$("#unsupp_reasons").append(
				"<li>" + obj.message + "</li>"
			);
	}
	
	if (!supported) {
		$("#page_unsupp").show();
	}

	// if (isChromeBrowser && isDesktop) {
	// 	$(".app_showcase").append(
	// 		'<a class="app_chrome" href="' + urlChrome + '">' +
	// 			'<img src="./img/app/chrome.png" alt="Chrome App" />' +
	// 		'</a>'
	// 	);
	// }

	if (!isiOS) {
		$(".app_showcase").append(
			'<a class="app_android" href="' + urlGPlay + '">' +
				'<img src="./img/app/google-play-badge.png" alt="Get it on Google Play." />' +
			'</a>'
		);
	}

	if (!isDesktop) {
		$(".app_showcase").append(
			'<a class="app_chrome">' +
				'<img src="./img/app/desktop.png" alt="Open on PC for the best experience." />' +
			'</a>'
		);
	}
});
