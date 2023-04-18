import styles from './index.less';
import Page from '@/components/page';
import {
  addFile,
  addTreeNode,
  deleteTreeNode,
  queryFile,
  queryTree,
  updateFile,
  updateTreeNode,
} from '@/services/mocks';
import type { TreeNode } from '@/types/mocks';
import { useRequest } from 'ahooks';
import { Button, Col, message, Modal, Row, Space, Spin, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import FormModal from './components/FormModal';
import { useRef, useState } from 'react';
import JSONEditor, { JSONEditorRef } from './components/Editor';

const MocksPage = () => {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<TreeNode>();
  const [isEditing, setIsEditing] = useState(false);
  const { data, loading, refresh } = useRequest(queryTree);
  const jsonEditorRef = useRef<JSONEditorRef>(null);
  const { loading: jsonSaveLoading, runAsync: saveJSON } = useRequest(addFile, {
    manual: true,
  });
  const { loading: jsonUpdateLoading, runAsync: updateJSON } = useRequest(updateFile, {
    manual: true,
  });
  const {
    data: file,
    loading: getFileLoading,
    runAsync: getJSON,
  } = useRequest(queryFile, {
    manual: true,
  });

  function parseTreeData(node: TreeNode): DataNode {
    return {
      key: node.id,
      title: (
        <Row justify="space-between" align="middle">
          <Col>
            <div
              className={styles.nodePath}
              onClick={() => {
                setCurrentNode(node);
                getJSON({
                  treeId: node.id,
                }).then((res) => {
                  jsonEditorRef.current?.set(JSON.parse(res?.content ?? null) ?? {});
                });
              }}
            >
              {node.path}
            </div>
          </Col>
          <Col>
            <Space>
              <Button
                type="link"
                size="small"
                icon={<PlusCircleOutlined />}
                onClick={() => {
                  setIsEditing(false);
                  setCurrentNode(node);
                  setFormModalOpen(true);
                }}
              />
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsEditing(true);
                  setCurrentNode(node);
                  setFormModalOpen(true);
                }}
              />
              <Button
                type="link"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  Modal.confirm({
                    title: '确认删除当前节点(包括所有子节点)吗？',
                    onOk: async () => {
                      try {
                        await deleteTreeNode({ id: node.id });
                        message.success('删除成功');
                        refresh();
                      } catch (error) {
                        //
                      }
                    },
                  });
                }}
              />
            </Space>
          </Col>
        </Row>
      ),
      children: node.children?.map((n) => parseTreeData(n)),
    };
  }

  const treeData = (data || []).map(parseTreeData);

  const onModalOk = async (params: any) => {
    try {
      if (isEditing) {
        await updateTreeNode({
          ...params,
          id: currentNode?.id,
        });

        message.success('更新成功');
      } else {
        await addTreeNode({
          ...params,
          parentId: currentNode?.id,
        });

        message.success('添加成功');
      }

      refresh();
    } catch (error) {
      //
    }
  };

  const onSaveJSON = async () => {
    const content = jsonEditorRef.current?.get() ?? '';

    if (!currentNode) throw 'cannot save json without tree id';

    try {
      if (file) {
        await updateJSON({
          id: file.id,
          content: JSON.stringify(content),
        });
      } else {
        await saveJSON({
          treeId: currentNode.id,
          content: JSON.stringify(content),
        });
      }

      message.success('保存成功');
    } catch (error) {
      //
    }
  };

  return (
    <Page>
      <Row>
        <Col span={6}>
          <Spin spinning={loading}>
            <div className={styles.treePanel}>
              <div>
                <Space>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      setIsEditing(false);
                      setCurrentNode(undefined);
                      setFormModalOpen(true);
                    }}
                  >
                    新建
                  </Button>
                </Space>
              </div>
              <Tree className={styles.tree} treeData={treeData} />
            </div>
          </Spin>
        </Col>
        <Col span={18}>
          {currentNode && (
            <Spin spinning={getFileLoading}>
              <div className={styles.jsonPanel}>
                <div className={styles.fullPath}>完整路径：{currentNode?.fullPath}</div>
                <div className={styles.editorWrapper}>
                  <JSONEditor ref={jsonEditorRef} />
                </div>
                <div className={styles.footer}>
                  <Space>
                    <Button
                      type="primary"
                      loading={jsonSaveLoading || jsonUpdateLoading}
                      onClick={() => {
                        onSaveJSON();
                      }}
                    >
                      保存
                    </Button>
                  </Space>
                </div>
              </div>
            </Spin>
          )}
        </Col>
      </Row>
      {formModalOpen && (
        <FormModal
          isEditing={isEditing}
          currentNode={currentNode}
          open={formModalOpen}
          onCancel={() => setFormModalOpen(false)}
          onOk={onModalOk}
        />
      )}
    </Page>
  );
};

export default MocksPage;
