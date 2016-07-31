function getColors(c) {
    let colors = {};
    let pixels, r, g, b, a, count;
    r = g = b = a = count = 0;
    pixels = c.getImageData(0, 0, c.width, c.height);
    for(let i = 0, data = pixels.data; i < data.length; i += 4) {
        a = data[i + 3]; // alpha
        // skip pixels >50% transparent
        if (a < (255 / 2))
            continue;

        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
    }
    return {r: Math.round(r/count), g: Math.round(g/count), b: Math.round(b/count)};
}

function getIdealImageSize(imageSize){
	let idealImageWidth = TILE_WIDTH * Math.round(imageSize[0] / TILE_WIDTH);
	let idealImageHeight = TILE_HEIGHT * Math.round(imageSize[1] / TILE_HEIGHT);
	return [idealImageWidth, idealImageHeight];
}

function getImageInformation(srcValue){
	let promise = new Promise(function(resolve, reject){
		if(!srcValue) return reject("No Source Value");

		let image = new Image();
		image.onload = function() {
			return resolve([image, this.width, this.height]);
		};
		image.src = srcValue;
	});
	return promise;
}

function getImagePiecesAvgColor(imagePieces){
	let imagePiecesAverageColor = [];
	imagePieces.forEach((piece) => {
		let colors = getColors(piece);
		imagePiecesAverageColor.push(rgbToHex(colors.r, colors.g, colors.b));
	});
    return imagePiecesAverageColor;
}

function getImagePieces(image, numCols, numRows){
    let imagePiecesByRow = [];
	for(let y = 0; y < numRows; y++) {
    	for(let x = 0; x < numCols; x++) {
	        let canvas = document.createElement('canvas');
	        canvas.width = TILE_WIDTH;
	        canvas.height = TILE_HEIGHT;
	        let context = canvas.getContext('2d');
	        context.width = canvas.width;
	        context.height = canvas.width;
	        context.drawImage(image, x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, 0, 0, canvas.width, canvas.height);
	        imagePiecesByRow.push(context);
	    }
    }
    return imagePiecesByRow;
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}