exports.change = 
	setInterval( function(){
		console.log(".");
	}, 1000)
	
	setTimeout(function() {
		clearInterval(change); 
	}, 5000);