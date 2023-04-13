import type { TreeNode } from '@/types/mocks';
import { Form, Input, Modal } from 'antd';
import { FC, useCallback, useState } from 'react';

interface TreeAddModalProps {
  open: boolean;
  onCancel: VoidFunction;
  onOk: (values: any) => Promise<any>;
  parentNode?: TreeNode;
}

const TreeAddModal: FC<TreeAddModalProps> = ({ open, onCancel, onOk, parentNode }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onModalOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);

        onOk({
          path: values.path,
          fullPath: parentNode ? `${parentNode.fullPath}/${values.path}` : `/${values.path}`,
          desc: values.desc,
        }).finally(() => {
          setLoading(false);
          onCancel();
        });
      })
      .catch(() => {});
  }, [form, onOk, onCancel, parentNode]);

  return (
    <Modal
      width={800}
      open={open}
      title="添加节点"
      centered
      onCancel={onCancel}
      onOk={onModalOk}
      maskClosable={false}
      okButtonProps={{
        loading,
      }}
    >
      <Form form={form} style={{ paddingTop: 24 }}>
        {parentNode && <Form.Item label="父级路径">{parentNode.path}</Form.Item>}
        <Form.Item label="节点路径" name="path" rules={[{ required: true, message: '节点路径必填' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="节点描述" name="desc">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TreeAddModal;
