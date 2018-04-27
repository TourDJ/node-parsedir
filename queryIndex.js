

function queryIndex(cataId) {
	let image = {}, catalog = {};

	if(!cataId)
		return;


	// 根据 cataId 从对象索引表中获取数据
	// let volumes = getVolumes(cataId);
	let volumes = [
		{ 
			batchId: '20180424',
    		cataId: 'SZ01',
		    voluId: '0003',
		    url: 'SZ01\\SZ01-0003\\SZ01-0003-0012.png',
		    page: 1 
		},
  		{ 
  			batchId: '20180424',
	    	cataId: 'SZ01',
	    	voluId: '0003',
	    	url: 'SZ01\\SZ01-0003\\SZ01-0003-0020.png',
	    	page: 2 
		},
  		{ 
  			batchId: '20180424',
		    cataId: 'SZ01',
		    voluId: '0002',
		    url: 'SZ01\\SZ01-0002\\SZ01-0002-0049.png',
		    page: 3 
		},
  		{ 
  			batchId: '20180424',
		    cataId: 'SZ01',
		    voluId: '0001',
		    url: 'SZ01\\SZ01-0001\\SZ01-0001-0172.png',
		    page: 4 
		},
  		{ 
  			batchId: '20180424',
		    cataId: 'SZ01',
		    voluId: '0004',
		    url: 'SZ01\\SZ01-0004\\SZ01-0004-0077.png',
		    page: 1 
		},
  		{ 
  			batchId: '20180424',
		    cataId: 'SZ01',
		    voluId: '0004',
		    url: 'SZ01\\SZ01-0004\\SZ01-0004-0198.png',
		    page: 2 
		} 
	]

	//封装数据
	if(volumes && volumes instanceof Array) {
		let voluId, cataVolu, page
		volumes.forEach(function(volu){
			if(volu){
				voluId = volu.voluId;
				page = volu.page;
				cataVolu = cataId + "-" +voluId;

				if(!catalog[cataVolu]){
					catalog[cataVolu] = {}
				}

				catalog[cataVolu][page] = {
					url: volu.url
				}
			}
		});
	}

	image[cataId] = catalog

	return image;
}

const image = queryIndex("SZ01")
console.log(JSON.stringify(image))