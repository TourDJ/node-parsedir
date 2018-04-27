var fs = require("fs")
const path = require("path")
const readPDF = require('read-pdf-as-png')

//
async function genIndex(batchId, source, transDir) {
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

		for(let catalog of catalogs){
			if(catalog) {
				cataId = catalog.cataId;
				voluId = catalog.voluId;

				images = parseImages(source, cataId, voluId);

				if(images && images instanceof Array) {
					for(let i = 0, len = images.length; i < len; i++) {
						let image = images[i];

						if(image) {
							let url;
							const extname = path.extname(image);
							if (extname === '.pdf' && transDir) {
								url = await transPDF(source, transDir, cataId, voluId, image);
							} else {
								url = path.join(cataId, cataId + '-' + voluId, image);
							}
							
							index = {
								batchId: batchId,
								cataId: cataId,
								voluId: voluId,
								url: url,
								page: i + 1
							};
						}
						datas.push(index);
					}
				}
			}
		}
	}

	return datas;
}

/**
* 将 PDF 文件转换成 PNG 格式，并保存到新的目录
*/
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

//将新生成的 PNG 文件移动到指定目录下
function saveImage(src, dest, _path) {
	let sourceFile = path.join(src, _path); //源路径
	let destPath = path.join(dest, _path);	//新路径
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

// 读取卷册下的影像文件
function parseImages(source, cataId, voluId) {
	let images = [], _path;

	if(!source || !cataId || !voluId)
		return images;

	_path = path.resolve(source, cataId, cataId + '-' + voluId);
	images = fs.readdirSync(_path)

	return images;
}

(async function test(){
	let datas = await genIndex("20180424", "E:\\nodejs_project\\node-parsedir", "E:\\nodejs_project\\node-parsedir\\SZ")
	console.log(datas)	
})()
