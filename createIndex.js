var fs = require("fs")
const path = require("path")
const readPDF = require('read-pdf-as-png')

function genIndex(batchId, source, transDir) {
	let datas = [], index, images;

	if(!batchId || !source)
		return;

	//根据批次号获取卷册数据
	// let catalogs = getCatalog(batchId);
	let catalogs = [
		{cataId: "SZ01", voluId: "0001"},
		{cataId: "SZ01", voluId: "0002"}
	]

	if(catalogs && catalogs instanceof Array) {
		let cataId, voluId;

		catalogs.forEach(function(catalog) {
			if(catalog) {
				cataId = catalog.cataId;
				voluId = catalog.voluId;

				images = parseImages(source, cataId, voluId);
				if(images && images instanceof Array) {
					images.forEach(function(image){
						if(image) {
							let url;
							const extname = path.extname(image);
							if (extname === '.pdf' && transDir) {
								url = transPDF(source, transDir, cataId, voluId, image)
							} else {
								url = path.join(cataId, cataId + '-' + voluId, image);
							}
							
							index = {
								batchId: batchId,
								cataId: cataId,
								voluId: voluId,
								image: image,
								url: url
							};
						}
						datas.push(index);
					});
				}
			}
		});
	}

	return datas;
}

async function transPDF(src, dest, cataId, voluId, image) {
	let tempUrl = path.join(cataId, cataId + '-' + voluId, image);
	let urlObj = path.parse(tempUrl);
	let absPath = path.resolve(src, `${tempUrl}`);
	let newUrl;

	await new Promise(function(resolve, reject){
		const stream = readPDF(absPath)
		stream.on('error', (err) => {
	      throw(err)
	    })

	    stream.on('data', (data) => {
	      
	    })

	    stream.on('end', () => {
	      let name = urlObj.name;
	      resolve(path.join(urlObj.dir, name + ".png"))
	    })
	}).then(function(url){
		newUrl = url;
	})

	saveImage(src, dest, newUrl)

    return newUrl;
}

function saveImage(src, dest, _path) {
	let sourceFile = path.join(src, _path);
	let destPath = path.join(dest, _path);
	let dirPath = path.dirname(destPath);

	if(!fs.existsSync(dirPath)) {
		mkdirsSync(dirPath)
	}


	fs.rename(sourceFile, destPath, function (err) {
	  if (err) throw err;

	  fs.stat(destPath, function (err, stats) {
	    if (err) throw err;
	    //console.log('stats: ' + JSON.stringify(stats));
	  });
	});
}

function mkdirsSync(dirname, mode){
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSync(path.dirname(dirname), mode)){
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
}

function parseImages(source, cataId, voluId) {
	let images = [], _path;

	if(!source || !cataId || !voluId)
		return images;

	_path = path.resolve(source, cataId, cataId + '-' + voluId);
	images = fs.readdirSync(_path)

	return images;
}

let datas = genIndex("20180424", "E:\\nodejsproject\\parsedir", "E:\\nodejsproject\\parsedir\\SZ")
console.log(datas)