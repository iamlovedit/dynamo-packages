import { useRoutes, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Menu, Input } from 'antd';
import routes from './services/routes';
import React from 'react';
import './App.css';

const { Search } = Input

function App() {
  const elements = useRoutes(routes);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pathname, setPathName] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>(() => {
    let value = sessionStorage.getItem('search');
    return value ? value : ''
  });
  function handleClick(event: any) {
    navigate(event.key, {
      replace: false,
    }
    );
  }
  function handleSearch(keyword: string) {
    setSearchParams({
      keyword: keyword
    })
    navigate(`/search?keyword=${keyword}`, {
      replace: false
    })
    setPathName("");
  }
  const location = useLocation();
  const navigatePath = location.pathname.length > 1 ? location.pathname.slice(1) : location.pathname;

  const items = [
    {
      label: '主页',
      key: '/'
    },
    {
      label: '浏览',
      key: 'browse',
    }
  ]
  useEffect(() => {
    setPathName(navigatePath);
  }, [navigatePath])
  return (
      <div className="container">
        <div className="header">
          <div className="header_left">
            <div className="logo">
              <svg  viewBox="0 0 1104 1024" version="1.1"
                    onClick={()=>{
                        navigate("/");
                    }}
                    xmlns="http://www.w3.org/2000/svg" p-id="1671" width="40" height="40">
                <path
                    d="M1068.781972 987.943662c-7.211268 0-14.422535 0-14.422535-7.211268l-310.084507-151.436619c-14.422535-7.211268-21.633803-21.633803-21.633803-28.845071V209.126761c0-14.422535 7.211268-28.84507 21.633803-28.845071l310.084507-173.070422c14.422535-7.211268 21.633803-7.211268 36.056338 0s14.422535 21.633803 14.422535 28.84507v915.830986c0 14.422535-7.211268 21.633803-14.422535 28.84507-7.211268 7.211268-14.422535 7.211268-21.633803 7.211268z m-274.028169-209.126761l237.971831 115.380282V93.746479l-237.971831 129.802817v555.267605zM37.570704 987.943662c-7.211268 0-14.422535 0-21.633803-7.211268-7.211268-7.211268-14.422535-21.633803-14.422535-28.84507V36.056338c0-14.422535 7.211268-21.633803 14.422535-28.84507 14.422535-7.211268 21.633803-7.211268 36.056338 0l310.084507 173.070422c14.422535 7.211268 21.633803 21.633803 21.633803 28.845071v591.323943c0 14.422535-7.211268 28.84507-21.633803 28.845071l-310.084507 151.436619c-7.211268 7.211268-7.211268 7.211268-14.422535 7.211268z m36.056338-894.197183v800.450704l237.971831-115.380282V230.760563l-237.971831-137.014084zM549.570704 1024c-21.633803 0-36.056338-14.422535-36.056338-36.056338V36.056338c0-21.633803 14.422535-36.056338 36.056338-36.056338s36.056338 14.422535 36.056338 36.056338v951.887324c0 21.633803-14.422535 36.056338-36.056338 36.056338z"
                    fill="#535353" p-id="1672"></path>
              </svg>
            </div>
            <div className="search">
              <Search
                  defaultValue={searchValue}
                  allowClear={true}
                  showCount={false}
                  placeholder="输入节点包名称"
                  enterButton="搜索"
                  size="middle"
                  maxLength={16}
                  onChange={(event) => {
                    let value = event.target.value;
                    sessionStorage.setItem('search', value);
                  }}
                  onSearch={(value) => {
                    if (value) {
                      setSearchValue(value);
                      handleSearch(value);
                    }
                  }}
              />
            </div>
            <div>
              <Menu items={items} mode="horizontal"
                    theme="light" selectedKeys={[pathname]}
                    multiple={false}
                    onClick={(event) => handleClick(event)}
              />
            </div>
          </div>
        </div>
        <div className="body">
          {elements}
        </div>
        <div className="footer">
          此网站仅作为镜像站,版权归官方所有@Autodesk。
        </div>
      </div>
  );
}
export default App;
