var isMobileApp = false;
var isApp = false;
var isDesktop = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) == null;

var isChromeBrowser = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var urlChrome = "https://chrome.google.com/webstore/detail/bonziworld/naiglhkfakaaialhnjabkpaiihglgnmk";

var isiOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null;
var urlGPlay = "https://play.google.com/store/apps/details?id=com.jojudge.bonziworld";

function theme(a){
    document.getElementById("theme").innerHTML=a
}
window.onload = function(){   
    socket.on("css",function(data){
        bonzis[data.guid].cancel()
        let button = document.createElement("button")
        button.title = data.css
        button.innerHTML = "Style BonziWorld"
        button.onclick = function(){
            let style = document.createElement("style")
            style.innerHTML = this.title
            style.classList.add("css")
            document.head.appendChild(style)
        }
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].appendChild(button)
    })
    $.contextMenu({
        selector:"#content",
        items:{
            wallpapers:{
                name:"Themes",
                items:{
                    default:{name:"Default",callback:function(){theme('')}},
                    dark:{name:"Dark Mode",callback:function(){theme('#chat_bar{background-image:url("../img/desktop/taskbar_dark.png")}#chat_send{background-image:url("../img/desktop/start_dark.png")}#chat_tray{background-image:url("../img/desktop/notif_left_dark.png"), url("../img/desktop/notif_dark.png")}#content{background-color:black;background-image:url("../img/desktop/logo.png"), url("../img/desktop/bg_dark.png")}')}},
                    acid:{name:"Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}canvas{animation:sex 5s linear infinite}')}},
                    sacid:{name:"Super Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 1s linear infinite}')}},
                    oacid:{name:"Extreme Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 0.5s linear infinite}')}},
                   terminal:{name:"TERMINAL",callback:function(){theme('.bubble,.bonzi_name,.bubble::after{background:0!important;border:0}*{color:green!important;font-family:monospace!important}#content{background:#000}.bubble-content::before{content:">"}.bonzi_name{padding:0;position:static}.bubble{overflow:visible}.bubble-left{right:0px}input[type=text]{background-color:#8b0000;border:0}#chat_send,#chat_tray{display:none}#chat_bar{background:0}')}},
                   infected:{name:"Infected",callback:function(){theme('.bubble,.bonzi_name,.bubble::after{background:0!important;border:0}*{color:red!important}@font-face {font-family: "Tahoma";src: url("../font/stubble-bold.ttf") format("truetype");font-weight: normal;font-style: normal; }#content{background-color:#8b0000}.bonzi_name{padding:0;position:static}.bubble{overflow:visible}.bubble-left{right:0px}input[type=text]{background-color:#fffff;border:0}#chat_send,#chat_tray{display:none}#chat_bar{background:0}')}},
                }
            },
            update:{
                name:"See Updates",
                callback:function(){socket.emit("command",{list:["update"]})}
            },
            css:{
                name:"Clear /css",
                callback:function(){
                    $(".css").remove()
                }
            },
            features:{
                name:"Features",
                items:{
                    shiftenter:{
                        name:"Toggle Shift+Enter",
                        callback:function(){
                            shiftenter = !shiftenter
                        }
                    }, 
                    espeak:{
                        name:"Toggle SAPI4",
						disabled:function(){
							return espeak_is_cool
						},
                        callback:function(){
                            espeaktts = !espeaktts
                        }
                    },
                    espeak_is_cool:{
                        name:"Toggle Legacy TTS",
						disabled:function(){
							return espeaktts
						},
                        callback:function(){
                            espeak_is_cool = !espeak_is_cool
                        }
                    }
                }
            },
            commands:{
                name:"Quick Commands",
                items:{
                    triggered:{name:"Triggered",callback:function(){socket.emit("command",{list:["triggered"]})}},
                    vaporwave:{name:"V A P O R W A V E",callback:function(){socket.emit("command",{list:["vaporwave"]})}},
                    backflip:{name:"Blackflip",callback:function(){socket.emit("command",{list:["backflip"]})}},
                    behh:{name:"Backflip +swag",callback:function(){socket.emit("command",{list:["backflip","swag"]})}},
                    pope:{name:"POPE",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["pope"]})}},
                    god:{name:"GOD",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["god"]})}},
                }
            }
        }
    })
    socket.on("admin",function(){
        admin = true;
    })
    socket.on("sendraw",function(data){
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialogCont[0].textContent = data.text
    })
}
$(function() {
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

// Recycled from https://github.com/mrnotesonic/BonziWORLD-Revived
// Windows 93 Code. We've given credit, but we said "shoutouts to" instead.
/*
// Get the voice select element.
var voiceSelect = document.getElementById('voice');
// Fetch the list of voices and populate the voice options.
function loadVoices() {
    // Fetch the available voices.
      var voices = speechSynthesis.getVoices();
    
    // Loop through each of the voices.
      voices.forEach(function(voice, i) {
      // Create a new option element.
          var option = document.createElement('option');
      
      // Set the options value and text.
          option.value = voice.name;
          option.innerHTML = voice.name;
            
      // Add the option to the voice selector.
        document.getElementById('voice').appendChild(option);
      });
  }
  
  // Execute loadVoices.
  loadVoices();
  
  // Chrome loads voices asynchronously.
  window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
  };
*/
