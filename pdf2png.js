//var imageMagick = require('imagemagick');
var gm = require('gm');

let imageMagickOptions = {};
let config = {
	dependencies: {
		ImageMagick: "C:\\Program Files\\ImageMagick-7.0.7-Q16\\"
	}
};

imageMagickOptions.appPath = config.dependencies.ImageMagick;

let imageMagick = gm.subClass(imageMagickOptions);
imageMagick("E:\\nodejs_project\\readDir\\0172.pdf")
		.command("convert")
		.in("-density", "500")
		.write("E:\\nodejs_project\\readDir\\0172.png", function(err){
	        if (err) {
	            throw err;
	        }
		});