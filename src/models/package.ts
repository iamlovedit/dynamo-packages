import { Version } from "./version";
export class Package {
    name: string;
    id:string;
    description:string;
    downloads:number;
    updateTime:string;
    createTime:string;
    versions:Version[];
    votes:number;
}
