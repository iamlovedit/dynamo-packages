import React from 'react'
import { useEffect, useState } from 'react'
import { getPackageDetailFetch, getPackagesPageFetch } from '../../services/packages';
import { Drawer, List, Space, Button, Select } from 'antd';
import { LikeOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import { Package } from '../../models/package';
import { Version } from '../../models/version';
import Details from '../../components/Details';
import './index.css'
const { Option } = Select;

const IconText = ({ icon, text }: { icon: React.FC; text: number }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
interface props {
    keyword?: string
}

function PackageDispalyer({ keyword }: props) {

    async function onButtonClick(id: string) {
        var httpResponse = await getPackageDetailFetch(id);
        if (httpResponse.success) {
            var { response } = httpResponse;
            setPackage(response)
            var sortVersions = packageDetail.versions.sort((source, target) => {
                return source.createTime < target.createTime ? 1 : -1;
            });
            setVersions(sortVersions);
        }
        setDrawerOpen(true);
    };

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [packages, setPackages] = useState<Package[]>([]);
    const [packageDetail, setPackage] = useState<Package>(new Package());
    const [versions, setVersions] = useState<Version[]>([]);
    const [packageTotal, setPackageTotal] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);
    const [orderField, setOrderField] = useState<string>("downloads");

    async function fetchPackages(current: number, pageSize: number, orderField?: string) {
        var httpResponse = await getPackagesPageFetch(current, pageSize, keyword, orderField);
        if (httpResponse.success) {
            var { response } = httpResponse;
            setPackages(response.data);
        }
    }

    async function initPackages(orderField: string) {
        var httpResponse = await getPackagesPageFetch(1, 10, keyword, orderField);
        if (httpResponse.success) {
            var { response } = httpResponse;
            setPackages(response.data);
            setPackageTotal(response.dataCount)
            setCurrent(1);
        }
    }

    function onDrawerClose() {
        setDrawerOpen(false);
    }

    useEffect(() => {
        initPackages(orderField);
    }, [keyword, orderField])

    return (
        <div className="displayerContainer">
            <Drawer
                placement="left"
                size="large"
                open={drawerOpen}
                onClose={onDrawerClose}>
                <Details packageObj={packageDetail} versions={versions} />
            </Drawer >
            <div className="selectorContainer">
                <Select
                    showSearch={false}
                    style={{ width: 200 }}
                    placeholder="排序"
                    optionFilterProp="children"
                    defaultValue="下载量"
                    onChange={(value: string, option: any) => {
                        var { key } = option;
                        setOrderField(key);
                    }}
                    filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA!.children as unknown as string)
                            .toLowerCase()
                            .localeCompare((optionB!.children as unknown as string).toLowerCase())
                    }
                >
                    <Option value="1" key="downloads">下载量</Option>
                    <Option value="2" key="votes">点赞量</Option>
                    <Option value="3" key="name">节点包名称</Option>
                    <Option value="4" key="createTime">发布时间</Option>
                    <Option value="5" key="updateTime">更新时间</Option>
                </Select>
            </div>
            <div className='listContainer'>
                <List
                    size="small"
                    bordered={true}
                    split={true}
                    pagination={{
                        onChange: (page, pageSize) => {
                            fetchPackages(page, pageSize, orderField);
                            setCurrent(page);
                        },
                        total: packageTotal,
                        current: current,
                        pageSizeOptions: [10]
                    }}
                    dataSource={packages}
                    renderItem={
                        packageObj => (
                            <List.Item
                                key={packageObj.id}
                                actions={[
                                    <IconText icon={LikeOutlined} text={packageObj.votes} key="list-vertical-vote-o" />,
                                    <IconText icon={CloudDownloadOutlined} text={packageObj.downloads} key="list-vertical-download-o" />
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Button type="link" onClick={() => {
                                        onButtonClick(packageObj.id)
                                    }} >
                                        {packageObj.name}
                                    </Button>}
                                    description={`发布时间:${packageObj.createTime}  更新时间:${packageObj.updateTime}`}
                                />
                                    {packageObj.description}
                            </List.Item>
                        )} />
            </div>
        </div >
    )
}
export default PackageDispalyer