import type { TreeNode } from '@/types/mocks';
import { Form, Input, Modal } from 'antd';
import { FC, useCallback, useState } from 'react';

interface FormModalProps {
  isEditing?: boolean;
  open: boolean;
  onCancel: VoidFunction;
  onOk: (values: any) => Promise<any>;
  currentNode?: TreeNode;
}

const FormModal: FC<FormModalProps> = ({ open, onCancel, onOk, currentNode, isEditing }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const parentPath = currentNode?.fullPath.replace(`/${currentNode.path}`, '') ?? '';

  const onModalOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);

        let nextFullPath = '';

        if (currentNode) {
          if (isEditing) {
            nextFullPath = parentPath + '/' + values.path;
          } else {
            nextFullPath = currentNode.fullPath + '/' + values.path;
          }
        } else {
          nextFullPath = `/${values.path}`;
        }

        onOk({
          path: values.path,
          fullPath: nextFullPath,
          desc: values.desc,
        }).finally(() => {
          setLoading(false);
          onCancel();
        });
      })
      .catch(() => {});
  }, [form, currentNode, onOk, isEditing, parentPath, onCancel]);

  return (
    <Modal
      width={800}
      open={open}
      title={isEditing ? '修改节点' : '添加节点'}
      centered
      onCancel={onCancel}
      onOk={onModalOk}
      maskClosable={false}
      okButtonProps={{
        loading,
      }}
    >
      <Form
        form={form}
        style={{ paddingTop: 24 }}
        initialValues={
          isEditing
            ? {
                path: currentNode?.path,
                desc: currentNode?.desc,
              }
            : undefined
        }
      >
        {!isEditing && currentNode && <Form.Item label="父级路径">{currentNode.path}</Form.Item>}
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

export default FormModal;
