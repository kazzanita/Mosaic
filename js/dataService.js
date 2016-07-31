let memoizedFetchColor = _memoize(fetchColor);

function fetchColor(hex){
	let promise = new Promise(function(resolve, reject){
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange=function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				resolve(xhttp.responseText)
			}
		};
		xhttp.open("GET", "/color/" + hex, true);
		xhttp.send();
	});
	return promise;
}

function fetchColors(imagePiecesAverageColor){
	let length = imagePiecesAverageColor.length;
	let promises = [];
	for(let i=0; i<length; i++){
		promises.push(memoizedFetchColor(imagePiecesAverageColor[i]));
	}
	return Promise.all(promises);
}

// Memoize an expensive function by storing its results.
function _memoize(func){  
    let cache = {};

    return function () {
        let arg_str = JSON.stringify(arguments);
        cache[arg_str] = cache[arg_str] || func.apply(func, arguments);
        return cache[arg_str];
    }
}