import { Link, Outlet } from 'umi';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

export default function() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <Layout>
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={[]}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
    <Content style={{ padding: '0 48px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  </Layout>
  );
}
