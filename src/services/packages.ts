import { HttpResponse } from "../models/httpResponse";
import { Package } from "../models/package";
import { PackageStat } from "../models/packageStat";
import { PageData } from "../models/pageData";

const CORS='cors';
const GETMETHOD='GET';

let env = process.env.NODE_ENV
let baseUrl=''
if (env==="development") {
    baseUrl='https://localhost:5001/api'
}
else if (env==="production") {
    baseUrl='https://galaservice.goufeifei.xyz/api'
}

export const getPackageStatFetch = async () => {
    var response = await fetch(`${baseUrl}/packages/stat?count=10`, {
        mode: CORS,
        method: GETMETHOD,
    });
    var packageStat = (await response.json()) as HttpResponse<PackageStat>;
    return packageStat;
}

export const getPackagesPageFetch=async(pageIndex:number,pageSize:number,keyword?:string,orderField?:string)=>{
     var url=keyword==null?`${baseUrl}/packages?pageIndex=${pageIndex}&pageSize=${pageSize}&orderField=${orderField}`:
     `${baseUrl}/packages?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}&orderField=${orderField}`;
     var response=await fetch(url,{
        mode: CORS,
        method: GETMETHOD
     })
     var packagePage=(await response.json()) as HttpResponse<PageData<Package>>;
     return packagePage;
}


export const getPackageDetailFetch = async (id: string) => {
    var url = `${baseUrl}/packages/${id}`
    var response = await fetch(url, {
        mode: CORS,
        method: GETMETHOD
    });
    var packageObj = (await response.json()) as HttpResponse<Package>;
    return packageObj;
}