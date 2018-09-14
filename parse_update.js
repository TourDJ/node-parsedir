var pg = require('pg');
const fs = require('fs');
const path = require('path');
//数据库配置
var conString = "tcp://postgres:123456@192.168.0.158/lims";
var client =  new pg.Client(conString);



//sql语句
selectSQLString = "";
//客户端连接，进行数据插入
client.connect(function(error, results){
  if (error) {
    console.log('clientConnectionReady Error:'+error.message);
    client.end();
    return;
  }
  console.log('connection success...\n');

  let datas= repairStruct()
  for(let o in datas){
  	let data = datas[o]
  	if(data) {
      selectSQLString = "update t_equipment set upload_file = '" + JSON.stringify(data) + "' where barno='" + o + "'";
      client.query(selectSQLString,function(error,results){
        if(error)
          console.log(error);

        console.log(results);
      })
  	}
  }

});

function repairStruct() {
  let hook = {
    "07-01": [
      "2002559-2002560",
      "2002561-2002562-2002563-2002564",
      "2002565-2002566",
      "2002569",
      "2002572",
      "2002570-2002571",
      "2002568",
      "2002567",
    ],
    "07-03": [
      "2001578",
      "2001579",
      "2001580",
      "2001585",
      "2001581",
      "2001582",
      "2001583",
      "2001584",
      "2001573",
      "2001576",
      "2001577",
      "2001574",
      "2001575",
    ],
    "07-35": [
      "2003019-2003020-2003021",
      "2003024-2003025-2003026",
      "2003027-2003028-2003029",
      "2003031-2003032-2003033",
      "2003015-2003016",
      "2003017-2003018",
      "2003030",
      "2003034-2003035-2003036-2003037",
      "2003012",
      "2003011",
      "2003022-2003023",
      "2003013",
      "2003014",
    ],
    "07-44": [
      "2002973-2002974-2002975",
      "2002966-2002967-2002968",
      "2002987-2002988-2002989",
      "2002997-2002998-2002999",
      "2003000-2003001-2003002",
      "2002970",
      "2003003-2003004-2003005-2003006-2003007-2003008-2003009",
      "2002964",
      "2002965-2002969",
      "2002976",
      "2002971",
      "2002972",
      "2002977",
      "2002979-2002980-2002981-2002982-2002983-2002984-2002985-2002986",
      "2002990-2002991-2002992-2002993-2002994-2002995-2002996",
    ],
    "07-67": [
      "2002019-2002020",
      "2002022-2002023-2002024",
      "2002025",
      "2002021",
    ],
  }, 
  data = {},
  no, bars, temp;

  for (let key in hook) {
    no = key
    bars = hook[no]
    bars.forEach(function(bar, index){
      temp = generate(no, bar)
      data[bar] = temp
    })
  }
  // console.log(data)
  return data
}

function generate(no, bar) {
  let data = [], equip = {}, uid, name, url
  if(bar.indexOf('-') != -1) {
    let bars = bar.split('-')
    bars.forEach(function(elem, index){
      equip = {};
      equip["uid"] = 'rc-upload-' + elem;
      equip["name"] = elem + '.jpg';
      equip["url"] = '/upload/equipment/attachment/' + no + '/' + elem + '.jpg';
      data.push(equip);
    })
  } else {
    equip["uid"] = 'rc-upload-' + bar;
    equip["name"] = bar + '.jpg';
    equip["url"] = '/upload/equipment/attachment/' + no + '/' + bar + '.jpg';
    data.push(equip);
  }
  return data;
}




