import { HttpResponse } from "../models/httpResponse";
import { Package } from "../models/package";
import { PackageStat } from "../models/packageStat";
import { PageData } from "../models/pageData";

const CORS='cors';
const GETMETHOD='GET';
const HEADERS={
    "Content-Type": "application/json"
}
let env = process.env.NODE_ENV
let baseUrl=''
if (env==="development") {
    baseUrl='https://localhost:5001/api'
}
else if (env==="production") {
    baseUrl='https://galaservice.goufeifei.xyz/api'
}

export const getPackageStatFetch = async () => {
    let response = await fetch(`${baseUrl}/packages/stat?count=10`, {
        mode: CORS,
        method: GETMETHOD,
        headers:HEADERS
    });
    let json=await  response.json();
    let packageStat = json as HttpResponse<PackageStat>;
    return packageStat;
}

export const getPackagesPageFetch=async(pageIndex:number,pageSize:number,keyword?:string,orderField?:string)=>{
     let url=keyword==null?`${baseUrl}/packages?pageIndex=${pageIndex}&pageSize=${pageSize}&orderField=${orderField}`:
     `${baseUrl}/packages?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}&orderField=${orderField}`;
     let response=await fetch(url,{
        mode: CORS,
        method: GETMETHOD,
        headers:HEADERS
     })

     let packagePage=(await response.json()) as HttpResponse<PageData<Package>>;
     return packagePage;
}


export const getPackageDetailFetch = async (id: string) => {
    let url = `${baseUrl}/packages/${id}`;
    let response = await fetch(url, {
        mode: CORS,
        method: GETMETHOD,
        headers:HEADERS
    });
    let packageObj = (await response.json()) as HttpResponse<Package>;
    return packageObj;
}