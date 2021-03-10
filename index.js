#!/usr/bin/env node
// To run this cmd Write 
// node index.js -s [Src Directory] -o [Output Directory]
// Created By Anmol Sharma

let fs = require("fs");
let cmds = process.argv.slice(2);

if(cmds.includes("--help") || cmds.includes("-h")){
    usage()
}

if(cmds.includes("--version") || cmds.includes("-v")){
    console.log("File Organizer");
    console.log("version 0.1");
    process.exit(0);
}

if(!cmds.includes("-s") && !cmds.includes("-o")){
    console.log("\nInvalid Commands passed");
    usage();
}

let dirNames = cmds.slice(cmds.indexOf("-s") + 1,cmds.indexOf("-o"));
let outputdirs = cmds.slice(cmds.indexOf("-o") + 1,cmds.length);

let isToMove = false;

if(cmds.includes("-m"))
    isToMove = true;
    
for(let idx in dirNames){
    if(!fs.existsSync(dirNames[idx])){
        console.log( " No such directory : "+ dirNames[idx] );
        usage();
        process.exit();
    }
}

for(let x in dirNames)
    if(!fs.existsSync(outputdirs[x]))
        createDir("./"+outputdirs[x]);

    
for(let idx in dirNames){
    console.log("------------------------------------------------------------------------");
    console.log("Source Directory : " + dirNames[idx]);
    console.log("Output Directory : " + outputdirs[idx]);
    console.log("Move Files : " + (isToMove).toString());
    console.log("------------------------------------------------------------------------");
    getFilesAndFolder(dirNames[idx], outputdirs[idx], isToMove);
    if(isToMove){
        deleteDir(dirNames[idx]);
    }
    // console.log("Source Directory : " + dirNames[idx] + " Done");
    console.log("------------------------------------------------------------------------");
}
    
function usage(){
    console.log("\nfo to organize files according to their type.\n");
    console.log("usage\n");
    console.log("fo -s [Src Directory] -o [Output Directory]\n");
    console.log("-s : To indicate source directory");
    console.log("-o : To indicate output directory");
    console.log("-m : To move files and remove source directory");
    process.exit(0);
}

function getFilesAndFolder(dirName, outputdir,isToMove) {
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
        getFilesAndFolder(dirName+"/"+folders[x],outputdir,isToMove);
    }
    saveFileToType(dirName,files,outputdir,isToMove);
}


function saveFileToType(root,path,outputdir,isToMove){
    for(let idx in path){
        let ext = path[idx].split(".")[1];
        outputDirPath = outputdir+"/"+ext;
        
        if(!fs.existsSync(outputDirPath))
            createDir(outputDirPath)
    
        fs.copyFileSync(root+"/"+path[idx], outputDirPath+"/"+path[idx],); 
        console.log(path[idx]+ " --------> Done ");

        if(isToMove){
            deletefile(root+"/"+path[idx]);
        }
    }
}


function createDir(path){
    fs.mkdirSync(path,(err)=>{
        if(err) throw err;
        // console.log("Dir created : "+path);
    })
}

function deletefile(path){
    fs.rm(path,(err)=>{
        if(err) throw err;
        // console.log("File deleted : " + path);
    })
}
function deleteDir(path){
    fs.rmdir(path,{recursive:true},(err)=>{
        if(err) throw err;
        // console.log("Dir deleted : " + path);
    })
}
