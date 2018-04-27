

function updateVolume(cataId) {
	let volums = [];

	// let catas = getCatas(cataId);
	let catas = [
		{
			cataId: "SZ01",
			voluId: "SZ01-0009",
			url: "SZ01\\SZ01-0003\\SZ01-0003-0012.png",
			page: 1
		},
		{
			cataId: "SZ01",
			voluId: "SZ01-0002",
			url: "SZ01\\SZ01-0002\\SZ01-0002-0014.png",
			page: 1
		},
		{
			cataId: "SZ01",
			voluId: "SZ01-0001",
			url: "SZ01\\SZ01-0001\\SZ01-0001-0015.png",
			page: 1
		},
		{
			cataId: "SZ01",
			voluId: "SZ01-0002",
			url: "SZ01\\SZ01-0002\\SZ01-0002-0017.png",
			page: 1
		},
		{
			cataId: "SZ01",
			voluId: "SZ01-0004",
			url: "SZ01\\SZ01-0004\\SZ01-0004-0016.png",
			page: 1
		}
	];

	if(catas && catas instanceof Array) {
		let index, cataVoluId, voluId
		catas.forEach(function(cata){
			if(cata){
				cataVoluId = cata.voluId;
				if(cataVoluId && (index = cataVoluId.indexOf("-")) != -1) {
					voluId = cataVoluId.substr(index + 1);
					if(volums.indexOf(voluId) == -1) {
						volums.push(voluId)
					}
				}
			}
		});
	}

	return volums;
}

let result = updateVolume("SZ01")
console.log(result)
console.log(result.sort())