import { Package } from "./package";

export class PackageStat {
        totalDownloads:number;
        totalPackages:number;
        lastestPublish:Package[];
        lastestUpdate:Package[];
        mostDownload:Package[]
    }