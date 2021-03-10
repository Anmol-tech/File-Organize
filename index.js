// To run this cmd Write 
// node index.js [Src Directory] [Output Directory]
// Created By Anmol Sharma

let fs = require("fs");

let dirName = process.argv.slice(2)[0];
let outputdir = process.argv.slice(2)[1];

if(!fs.existsSync(outputdir))
    createDir("./"+outputdir);

getFilesAndFolder(dirName, outputdir)

function getFilesAndFolder(dirName, outputdir) {
    let folders = [];
	let files = [];
	
    let dir = fs.readdirSync(dirName);
	dir.forEach((item) => {
		if (item.includes(".")) {
			files.push( item);
		} else {
			folders.push(item);
		}
	});
    
    for( let x in folders){
        getFilesAndFolder(dirName+"/"+folders[x],outputdir);
    }
    saveFileToType(dirName,files,outputdir);
}

function createDir(path){
    fs.mkdir(path,(err)=>{if(err) throw err;
        console.log("Dir created : "+path);})
}

function saveFileToType(root,path,outputdir){

    for(let idx in path){
        let ext = path[idx].split(".")[1];
        outputDirPath = outputdir+"/"+ext;
        
        if(!fs.existsSync(outputDirPath))
            createDir(outputDirPath)
        
        fs.copyFileSync(root+"/"+path[idx], outputDirPath+"/"+path[idx]);       
    }
}
