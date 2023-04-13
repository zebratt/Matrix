import styles from './index.less';
import Page from '@/components/page';
import { addFile, addTreeNode, deleteTreeNode, queryFile, queryTree, updateFile } from '@/services/mocks';
import type { TreeNode } from '@/types/mocks';
import { useRequest } from 'ahooks';
import { Button, Col, message, Modal, Row, Space, Spin, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import TreeAddModal from './components/TreeAddModal';
import { useRef, useState } from 'react';
import JSONEditor, { JSONEditorRef } from './components/Editor';

const MocksPage = () => {
  const [treeAddModalOpen, setTreeAddModalOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<TreeNode>();
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
                  setCurrentNode(node);
                  setTreeAddModalOpen(true);
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

  const onCreate = async (params: any) => {
    try {
      await addTreeNode({
        ...params,
        parentId: currentNode?.id,
      });

      message.success('添加成功');
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
                      setCurrentNode(undefined);
                      setTreeAddModalOpen(true);
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
      {treeAddModalOpen && (
        <TreeAddModal
          parentNode={currentNode}
          open={treeAddModalOpen}
          onCancel={() => setTreeAddModalOpen(false)}
          onOk={onCreate}
        />
      )}
    </Page>
  );
};

export default MocksPage;
