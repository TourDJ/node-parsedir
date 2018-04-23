var fs = require("fs")
var path = require("path")

/**
 * Read all files from given folder recursively
 */
function readDir(_path){
    let sub = fs.readdirSync(_path)

    // ignore hide files
    sub = sub.filter((e)=>{
        return e.indexOf('.') !== 0
    })

    // complete _path
    // sub = sub.map((e)=>{
    //     return path.resolve(_path, e)
    // })

    if(sub.length === 0){
        console.log('😫  build文件夹下没有文件！'.error)
    }else{
        return sub
    }
}

/**
 * Read all path recursively and record the path relations
 */
function readPath(_path){
    let obj = {}, values = [], name;

    if(!_path)
        return "";

    name = _path.substr(_path.lastIndexOf(path.sep) + 1);
    

    // Determine whether the _path is dir or not
    let stat = fs.statSync(_path)

    if(stat.isFile()){
        return name;
    }else if(stat.isDirectory()){
        obj["name"] = name;
        obj["values"] = values;

        let sub_children = readDir(_path);

        sub_children.forEach((e)=>{
            let resolve = readPath(path.resolve(_path, e));
            values.push(resolve)
        })

    }

    return obj;
}

let o = readPath("E:\\nodejs_project\\readDir\\SZ01")
console.log(JSON.stringify(o))