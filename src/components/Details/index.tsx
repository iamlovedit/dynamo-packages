import { List } from 'antd';
import { Package } from '../../models/package';
import { Version } from '../../models/version';
import './index.css'

export interface Props {
    packageObj: Package;
    versions: Version[]
}

function Details({ packageObj, versions }: Props) {
    return (
        <div className='detailsContainer'>
                <h3>
                    {packageObj.name}
                </h3>
                <p>
                    {
                        packageObj.description
                    }
                </p>
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
    )
}
export default Details