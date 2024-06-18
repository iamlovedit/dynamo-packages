import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Drawer } from 'antd';
import { Package } from '../../models/package';
import './index.css'
import { Version } from "../../models/version";
import { getPackageDetailFetch } from '../../services/packages';
import Details from '../../components/Details';
const { Column } = Table;

export interface Props {
    title: string;
    packages: Package[];

}
function Stat({ title, packages }: Props) {

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [versions, setVersions] = useState<Version[]>([]);
    const [packageObj, setPackage] = useState<Package>(new Package());
    const navigate = useNavigate();
    function handleClick(packageObj: Package) {
        navigate('/package', {
            state: {
                id: packageObj.id
            }
        })
    }

    async function onButtonClick(id: string) {
        var httpResponse = await getPackageDetailFetch(id);
        if (httpResponse.success) {
            var { response } = httpResponse;
            setPackage(response)
            var sortVersions = response.versions.sort((source, target) => {
                return source.createTime < target.createTime ? 1 : -1;
            });
            setVersions(sortVersions);
        }
        setDrawerOpen(true);
    };
    return (
        <div className='statContainer'>
            <div className='stats-title'>
                <strong >
                    {title}
                </strong>
            </div>
            <Drawer
                placement="left"
                size="large"
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                }}>
                <Details packageObj={packageObj} versions={versions} />
            </Drawer >
            <Table dataSource={packages} pagination={false} size='middle'
                rowKey={(packageObj) => packageObj.id}>
                <Column title='节点包' width='40%' key='name' dataIndex='name'
                    render={(_: any, packageObj: Package) => (
                        <a href={`./package/${packageObj.id}`}
                            style={{ width: "100px" }}
                            className='stat-name'
                            key={packageObj.id}
                            onClick={(e) => {
                                e.preventDefault();
                                onButtonClick(packageObj.id)
                            }}>
                            {packageObj.name}
                        </a>
                    )
                    }
                />
                <Column title="更新时间" dataIndex='updateTime' key='updateTime' width='40%' align='center' />
                <Column title="下载量" dataIndex='downloads' key='downloads' width='20%' align='center' />
            </Table>
        </div>
    )
}

export default Stat