import React, { useEffect, useState } from 'react'
import { Button, List } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { getPackageDetailFetch } from '../services/packages'
import { Package } from '../models/package';
import { Version } from '../models/version';
import './index.css'

function Details() {
  const navigate = useNavigate()
  const params = useLocation();
  const { id } = params.state
  const [packageObj, setPackageObj] = useState<Package>(new Package());
  const [versions, setVersions] = useState<Version[]>([]);
  async function getPackageDetails(id: string) {
    const result = await getPackageDetailFetch(id);
    if (result.success) {
      const packages = result.response as Package;
      setPackageObj(packages);
      const sortVersions = packages.versions.sort((source, target) => {
        return source.createTime < target.createTime ? 1 : -1;
      });
      setVersions(sortVersions);
    }
  }

  useEffect(() => {
    getPackageDetails(id);
  }, [id])

  return (
    <div className='package-container'>
      <Button onClick={() => navigate(-1)}>
        返回
      </Button>
      <div className='data-container'>
        <div>
          {packageObj?.name}
        </div>
        <div>
          {packageObj?.description}
        </div>
        <div>
          <List
            itemLayout="horizontal"
            dataSource={versions}
            renderItem={item => (
              <List.Item id={item.id}>
                <List.Item.Meta
                  title={
                    <a href={`https://dynamopackages.com/download/${id}/${item.version}`}
                    >
                      {item.version}
                    </a>
                  } />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div >
  )
}

export default Details