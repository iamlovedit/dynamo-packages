import React from 'react';
import { useEffect, useState } from 'react'
import './index.css'
import Overview from '../components/Overview';
import Stat from '../components/Stat';
import { getPackageStatFetch } from '../services/packages'
import { Package } from '../models/package';

function Summary() {
  const [packageCount, setPackageCount] = useState<number>(0);
  const [installCount, setInstallCount] = useState<number>(0);
  const [latestPackages, setLatestPackages] = useState<Package[]>([]);
  const [updatedPackages, setUpdatePackages] = useState<Package[]>([]);
  const [installedPackages, setInstalledPackages] = useState<Package[]>([]);

  async function getPackages() {
    let httpResponse = await getPackageStatFetch();
    if (httpResponse.success) {
      const packageStat = httpResponse.response;
      setInstallCount(packageStat.totalDownloads);
      setPackageCount(packageStat.totalPackages);
      setLatestPackages(packageStat.lastestPublish);
      setUpdatePackages(packageStat.lastestUpdate);
      setInstalledPackages(packageStat.mostDownload);
    }
  }

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div className="summaryContainer">
      <div className="summaryHeader">
        <Overview title="总下载量" content={installCount} />
        <Overview title="节点包数" content={packageCount} />
      </div>
      <div className="summaryContent">
        <Stat title='最新发布' packages={latestPackages} />
        <Stat title='最近更新' packages={updatedPackages} />
        <Stat title='最多下载' packages={installedPackages} />
      </div>
    </div>
  )
}

export default Summary