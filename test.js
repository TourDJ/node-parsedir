var fs = require("fs")
const path = require("path")

function genIndex(batchId, source, transDir) {
	let datas = [], index, images;

	if(!batchId || !source)
		return;

	//根据批次号获取谱目
	// let catalogs = getCatalog(batchId);
	let catalogs = [
		{cataId: "SZ01", voluId: "0001"},
		{cataId: "SZ01", voluId: "0002"}
	]

	if(catalogs && catalogs instanceof Array) {
		let cataId, voluId, url;
		console.log(1)
		catalogs.forEach(function(catalog) {
			console.log(2)
			if(catalog) {
				cataId = catalog.cataId;
				voluId = catalog.voluId;
				console.log(3)
				images = parseImages(source, cataId, voluId);
				console.log(4)
				if(images && images instanceof Array) {
					console.log(5)
					images.forEach(function(image){
						if(image) {
							url = cataId + path.sep + cataId + '-' + voluId + path.sep + cataId + '-' + voluId + '-' + image;
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

function parseImages(source, cataId, voluId) {
	let images = [], _path;

	if(!source || !cataId || !voluId)
		return images;

	_path = path.resolve(source, cataId, cataId + '-' + voluId);
	images = fs.readdirSync(_path)

	return images;
}

let datas = genIndex("20180424", "E:\\nodejs_project\\readDir")
console.log(datas)