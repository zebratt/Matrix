import type { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { SnippetsOutlined, DashboardOutlined, PaperClipOutlined, FileOutlined, DiffOutlined } from '@ant-design/icons';
import { history } from 'umi';

export const menus: MenuItemType[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: <DashboardOutlined />,
    onClick: () => {
      history.push('/dashboard');
    },
  },
  {
    label: 'Notes',
    key: 'notes',
    icon: <SnippetsOutlined />,
    onClick: () => {
      history.push('/notes');
    },
  },
  {
    label: 'Mocks',
    key: 'mocks',
    icon: <DiffOutlined />,
    onClick: () => {
      history.push('/mocks');
    },
  },
];
