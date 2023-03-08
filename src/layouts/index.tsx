import { Outlet, useLocation } from 'umi';
import { Layout, Menu, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { menus } from '@/contants/menu';
import styles from './index.less';
import { useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

export default function DefaultLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const { pathname = '' } = useLocation();

  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ flexDirection: 'row' }}>
        <Sider theme="light" width={160} collapsed={collapsed}>
          <div className={styles.siderBody}>
            <div className={styles.title}>{collapsed ? 'M' : 'Matrix'}</div>
            <Menu className={styles.menu} items={menus} selectedKeys={[pathname.slice(1)]} />
            <div className={styles.switch}>
              {collapsed ? <MenuUnfoldOutlined onClick={() => setCollapsed(false)} /> : <MenuFoldOutlined onClick={() => setCollapsed(true)} />}
            </div>
          </div>
        </Sider>
        <Layout>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
