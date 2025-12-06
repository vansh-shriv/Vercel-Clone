import {S3} from "aws-sdk";
import path from "path";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const s3 = new S3({
    accessKeyId:"process.env.ACCESS_KEY_ID",
    secretAccessKey:"process.env.SECRET_ACCESS_KEY",
    endpoint:"process.env.ENDPOINT",
})

export function downloadS3Folder(prefix:string,){
    console.log(prefix);
    const allFiles = await s3.listObjectsV2({
        Bucket:"Vercel",
        Prefix:prefix
    }).promise();

    const allPromises = allFiles.Contents?.map(async({Key})=>{
        return new Promise(async(resolve)=>{
            if(!Key){
                resolve(null);
                return;
            }
            const finalOutputPath = path.join(__dirname,Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath)
            if(!fs.existsSync(dirName)){
                fs.mkdirSync(dirName,{recursive:true});
            }
            s3.getObject({
                Bucket:"Vercel",
                Key
            }).createReadStream().pipe(outputFile).on("finish",()=>{
                resolve(null);
            })

        })
    }) || []

    await Promise.all(allPromises?.filter(x=>x!==undefined));
}

const uploadFile = (fileName : string,localFilePath:string)=>{
    console.log("called");
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body:fileContent,
        Bucket:"Vercel",
        Key:fileName
    }).promise();
    console.log(response);
}

const getAllfiles = (folderPath: string): string[] => {
    let response:string[] = [];
    const allFilesandFolder = fs.readdirSync(folderPath);
    allFilesandFolder.forEach(file=>{
        const fullPath = path.join(folderPath,file);

        if(fs.statSync(fullPath).isDirectory()){
            response = response.concat(getAllfiles(fullPath));
        }
        else{
            response.push(fullPath);
        }
    })
    return response;
}

export function copyFinalDist(id:string){
    const folderPath = path.join(__dirname,`output/${id}/dist`);
    const allFiles = getAllfiles(folderPath);
    allFiles.forEach(file=>{
        uploadFile(`dist/${id}/`+file.slice(folderPath.length+1),file);
    })
}