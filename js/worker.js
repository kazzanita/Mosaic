"use strict";

(function(){
	importScripts("dataService.js");

	onmessage=function(event){
		let imagePiecesAverageColor = event.data;
		return fetchColors(imagePiecesAverageColor).then(function(result){
			postMessage(result);
		});
	}
})();