import type { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { DiffOutlined } from '@ant-design/icons';
import { history } from 'umi';

export const menus: MenuItemType[] = [
  {
    label: 'Mocks',
    key: 'mocks',
    icon: <DiffOutlined />,
    onClick: () => {
      history.push('/mocks');
    },
  },
];
