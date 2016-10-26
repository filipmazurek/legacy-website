// JavaScript Document
/*jshint esnext: true */

var displayCanvas;
var userImage = null;
var grayscaleImage = null;
var redImage = null;
var edgesImage = null;
var blurImage = null;
var rainbowImage = null;
var redCutoff = 128;
var blurDistance = 5;
var blurRange = blurDistance * 2 + 1;

function loadUserImage() {
	"use strict";
	displayCanvas = document.getElementById("displayCanvas");
    clearCanvas(displayCanvas);
    var imageInput = document.getElementById("userFile");
    userImage = new SimpleImage(imageInput);
    userImage.drawTo(displayCanvas);
}

function clearCanvas(canvas) {
	"use strict";
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
}

function resetImage() {
	"use strict";
	clearCanvas(displayCanvas);
	userImage.drawTo(displayCanvas);
}

function showGrayscale() {
	"use strict";
	//if(grayscaleImage == null) {
		makeGrayscale();
	//}
	clearCanvas(displayCanvas);
	grayscaleImage.drawTo(displayCanvas);
}

function showRed() {
	"use strict";
	//if(redImage == null) {
		makeRed();
	//}
	clearCanvas(displayCanvas);
	redImage.drawTo(displayCanvas);
}

function showEdges() {
	"use strict";
	//if(edgesImage == null) {
		makeEdges();
	//}
	clearCanvas(displayCanvas);
	edgesImage.drawTo(displayCanvas);
}

function showBlur() {
	"use strict";
	//if(edgesImage == null) {
		makeBlur();
	//}
	clearCanvas(displayCanvas);
	blurImage.drawTo(displayCanvas);
}

function showRainbow() {
	"use strict";
	//if(edgesImage == null) {
		makeRainbow();
	//}
	clearCanvas(displayCanvas);
	rainbowImage.drawTo(displayCanvas);
}


function makeGrayscale() {
	"use strict";
  	grayscaleImage = new SimpleImage(userImage.getWidth(), userImage.getHeight());
  
  	for(var pixel of userImage.values()) {
    	var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    	var grayscalePixel = grayscaleImage.getPixel(pixel.getX(), pixel.getY());
    	grayscalePixel.setRed(average);
    	grayscalePixel.setGreen(average);
    	grayscalePixel.setBlue(average);
    }
}

function makeRed() {
	"use strict";
	redImage = new SimpleImage(userImage.getWidth(), userImage.getHeight());
	
	for(var pixel of userImage.values()) {
    	var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    	var redPixel = redImage.getPixel(pixel.getX(), pixel.getY());
		if(average < redCutoff) {
			redPixel.setRed(2 * average);
    		redPixel.setGreen(0);
    		redPixel.setBlue(0);
		}
		else {
			redPixel.setRed(255);
    		redPixel.setGreen(2 * average - 255);
    		redPixel.setBlue(2 * average - 255);
		}
	}
}

function makeEdges() {
	"use strict";
	edgesImage = new SimpleImage(userImage.getWidth(), userImage.getHeight());
	for(var pixel of userImage.values()) {
		var edgePixel = edgesImage.getPixel(pixel.getX(), pixel.getY());

		
		if(pixel.getY() < 2) {
			edgePixel = pixel;
		}
		else {
			var pixelOneAbove = userImage.getPixel(pixel.getX(), pixel.getY() - 1);
			var pixelTwoAbove = userImage.getPixel(pixel.getX(), pixel.getY() - 2);
			
			edgePixel.setRed(2 * pixel.getRed() - pixelOneAbove.getRed() - pixelTwoAbove.getRed());
			edgePixel.setGreen(2 * pixel.getGreen() - pixelOneAbove.getGreen() - pixelTwoAbove.getGreen());
			edgePixel.setBlue(2 * pixel.getBlue() - pixelOneAbove.getBlue() - pixelTwoAbove.getBlue());
		}
	}
}

function makeBlur() {
	"use strict";
	blurImage = new SimpleImage(userImage.getWidth(), userImage.getHeight());
	
	for(var pixel of userImage.values()) {
		//var blurPixel = blurImage.getPixel(pixel.getX(), pixel.getY());
		
		var pixelX = pixel.getX() + (Math.floor(Math.random() * blurRange) - blurDistance);
		var pixelY = pixel.getY() + (Math.floor(Math.random() * blurRange) - blurDistance);
		
		if (pixelX >= userImage.getWidth()) {
			pixelX -= blurDistance;
		}
		if (pixelX < 0) {
			pixelX += blurDistance;
		}
		if(pixelY >= userImage.getHeight()) {
			pixelY -= blurDistance;
		}
		if(pixelY < 0) {
			pixelY += blurDistance;
		}
		blurImage.setPixel(pixel.getX(), pixel.getY(), userImage.getPixel(pixelX, pixelY));
	}
}

// Author: Duke Java Team
function makeRainbow() {
	"use strict";
  var height = userImage.getHeight();
  var width = userImage.getWidth();
  
  rainbowImage = new SimpleImage(width, height);
  
  for (var pixel of userImage.values()) {
    var y = pixel.getY();
	var x = pixel.getX();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
	
	var rainbowPixel = rainbowImage.getPixel(x, y);
	
    if (y < height / 7) {
      //red
      if (avg < 128) {
        rainbowPixel.setRed(2 * avg);
        rainbowPixel.setGreen(0);
        rainbowPixel.setBlue(0);
      } else {
        rainbowPixel.setRed(255);
        rainbowPixel.setGreen(2 * avg - 255);
        rainbowPixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        rainbowPixel.setRed(2 * avg);
        rainbowPixel.setGreen(0.8*avg);
        rainbowPixel.setBlue(0);
      } else {
        rainbowPixel.setRed(255);
        rainbowPixel.setGreen(1.2*avg-51);
        rainbowPixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        rainbowPixel.setRed(2 * avg);
        rainbowPixel.setGreen(2*avg);
        rainbowPixel.setBlue(0);
      } else {
        rainbowPixel.setRed(255);
        rainbowPixel.setGreen(255);
        rainbowPixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        rainbowPixel.setRed(0);
        rainbowPixel.setGreen(2*avg);
        rainbowPixel.setBlue(0);
      } else {
        rainbowPixel.setRed(2*avg-255);
        rainbowPixel.setGreen(255);
        rainbowPixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        rainbowPixel.setRed(0);
        rainbowPixel.setGreen(0);
        rainbowPixel.setBlue(2*avg);
      } else {
        rainbowPixel.setRed(2*avg-255);
        rainbowPixel.setGreen(2 * avg - 255);
        rainbowPixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        rainbowPixel.setRed(0.8*avg);
        rainbowPixel.setGreen(0);
        rainbowPixel.setBlue(2*avg);
      } else {
        rainbowPixel.setRed(1.2*avg-51);
        rainbowPixel.setGreen(2 * avg - 255);
        rainbowPixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        rainbowPixel.setRed(1.6*avg);
        rainbowPixel.setGreen(0);
        rainbowPixel.setBlue(1.6*avg);
      } else {
        rainbowPixel.setRed(0.4*avg+153);
        rainbowPixel.setGreen(2 * avg - 255);
        rainbowPixel.setBlue(0.4*avg+153);
      }
    }
  }
}

// Author: Duke Java Team
function imageIsLoaded(img) {
	"use strict";
	if (img == null || !img.complete()) {
		alert("Image not loaded");
    	return false;
    } 
	else {
    	return true;
    }
}