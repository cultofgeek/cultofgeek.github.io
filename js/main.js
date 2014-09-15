
/**
 * Utility function for adding an event. Handles the inconsistencies
 * between the W3C method for adding events (addEventListener) and
 * IE's (attachEvent).
 */
function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    }
    else {
        element.attachEvent(eventName, callback, false);
    }
}
	/**
	 * Called once a vimeo player is loaded and ready to receive
	 * commands. Does nothing right now but it is expected by the Vimeo iframe
	 */
	function ready(player_id) {}

/**
 * A simple text typing animation class
 */
function TextTyper(str, target, speed) {
	this.str = str;
	this.target = target;
	this.speed = speed;
	this.len = this.str.length;
	this.counter = 0;
	this.tracker = 0;
	this.lastCount = 0;
	this.typoText = "_";
}

TextTyper.prototype.render = function(){
	var me = this;  //need a local reference to this for setInterval;
	me.typeInterval = setInterval(function(){me.genText();}, me.speed);
}

TextTyper.prototype.stop = function(){
	clearInterval(this.typeInterval);
}

TextTyper.prototype.genText = function(){

	if (this.tracker >= this.len) {					
		this.stop();
		$(this.target).text(this.str);
	} 
	else {
		this.typoText = "";
		for (var i=0; i<this.tracker; i++){
			this.typoText += this.str.charAt(i);
		}

		this.typoText+="_";
		this.counter++;

		if (this.counter >= (2 + this.lastCount)){
			this.tracker++;
			this.lastCount = this.counter;
		}

		$(this.target).text(this.typoText);
	}
}

var website = {
	headline: "I create digital experiences that make the complex simple and beautiful.",

	resizeBkgd:	function (){
		var goalHeight = Math.round($(window).height() - 200) + "px";
		
		if ($(window).width() < 480 || $(window).height()<=600){
			goalHeight = Math.max(500, $(window).height()-80);			
		}

		$(".main-container").css({"height":goalHeight});
		
		goalHeight = $(".intro").height();
		$(".reel").css({"height":goalHeight});
	},
	init: function(){
		var me = this;
	
		$(window).resize(function(){
			this.resizeBkgd();
		});
		
		$("#enter").click(function(){
			location.href = '/portfolio';
		});
		
		$( ".reel" ).hover(
		  function() {
			$( ".overlay" ).css({"opacity": "0.5"});
		  }, function() {
			$( ".overlay" ).css({"opacity": "0"});
		  }
		);

		$(".reel").click(function(){

			froogaloop.api('play');
			$( ".page-overlay" ).fadeOut();
			$( ".page-overlay" ).fadeIn();
			$("#video-container").fadeIn();
		});
		
		$(".page-overlay").click(function(){
			froogaloop.api('pause');
			$( ".page-overlay" ).fadeOut();
			$("#video-container").fadeOut();
		});
		
		// Listen for the ready event for any vimeo video players on the page
		var playerID = document.getElementById('vimeoplayer');
		var froogaloop = $f(playerID);
		
		// Listen for the ready event for any vimeo video players on the page
		var vimeoPlayers = document.querySelectorAll('iframe'),
			player;

		for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
			player = vimeoPlayers[i];
			$f(player).addEvent('ready', ready);
		}
		var loadLoop = setInterval(checkLoad, 40);

		function checkLoad(){

			if (isReady){
			
			  clearInterval(loadLoop);
			  $(".pace").css({"display":"none"});
			  $(".bar-progress").css({"z-index":"-2"});
			  $( ".main-container" ).fadeIn();
			  $( "#hello" ).css({"z-index":"-1"});
			  $( ".main-container" ).css({"width":"1%"});
			 
			  $( ".main-container" ).animate({ width: "100%"}, 1000, function(){
				
				if (Modernizr.mq('only all and (max-width: 480px)')) { 
					$(".headline h1").text(me.headline);
					$(".headname").css({"margin-top": "40px","opacity": "1"});

					setTimeout(function(){$("#enter").css({"left": "0"});}, 2000);
				}
				else{
					var typer = new TextTyper(me.headline, ".headline h1", 15);
					typer.render();
					setTimeout(function(){$( ".headname" ).css({"opacity": "1"});}, 3000);
					$("#enter").css({"left": "0"});
				}

			  });
			  
			  $( ".footer-container" ).css({"opacity": "1"});			
				me.resizeBkgd();			
			}
		}
	}

}

$(document).ready(function(){

	website.init();

});