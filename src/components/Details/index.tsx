import { List } from 'antd';
import { Package } from '../../models/package';
import { Version } from '../../models/version';

export interface Props {
    packageObj: Package;
    versions: Version[]
}

function Details({ packageObj, versions }: Props) {
    return (
        <div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
            <div>
                <h3 style={{ textAlign: "center" }}>
                    {packageObj.name}
                </h3>
            </div>
            <div>
                <p>
                    {
                        packageObj.description
                    }
                </p>
            </div>
            <div style={{ height: "300px" }}>
                <List
                    itemLayout="horizontal"
                    dataSource={versions}
                    renderItem={item => (
                        <List.Item id={item.id}>
                            <List.Item.Meta
                                title={
                                    <a href={`https://dynamopackages.com/download/${packageObj.id}/${item.version}`}
                                    >
                                        {item.version}
                                    </a>
                                } />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
export default Details