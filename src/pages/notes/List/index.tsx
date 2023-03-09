import { deleteNote } from '@/services/notes';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRequest } from 'ahooks';
import { Button, Card, message, Modal, Space, Spin, Tag } from 'antd';
import { useCallback, useState } from 'react';
import styles from './index.less';

const ListArea = () => {
  const { loading: deleteLoading, runAsync: runDelete } = useRequest(deleteNote, {
    manual: true,
  });
  const [previewHtml, setPreviewHtml] = useState('');
  const { notes, loading } = useAppSelector((state) => state.notes);
  const { tags, loading: tagsLoading } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const onDelete = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '确认删除吗？',
        onOk: () => {
          runDelete(id)
            .then(() => {
              message.success('删除成功');
              dispatch.notes.loadNotes();
            })
            .catch(() => {});
        },
      });
    },
    [runDelete, dispatch],
  );

  const onTagSelect = useCallback(
    (id?: number) => {
      dispatch.notes.loadNotes(id);
    },
    [dispatch],
  );

  return (
    <div className={styles.content}>
      <div className={styles.sider}>
        <Spin spinning={tagsLoading} style={{ minHeight: '100%' }}>
          <Space direction="vertical" style={{ height: 'calc(100vh - 120px)' }}>
            <Button type="text" onClick={() => onTagSelect()}>
              全部
            </Button>
            {tags.map((tag) => {
              return (
                <Button key={tag.id} type="text" onClick={() => onTagSelect(tag.id)}>
                  {tag.label}
                </Button>
              );
            })}
          </Space>
        </Spin>
      </div>
      <div className={styles.listArea}>
        <Spin spinning={loading} style={{ minHeight: '100%' }}>
          <div className={styles.listCards}>
            {notes.map((note) => {
              return (
                <Card
                  key={note.id}
                  className={styles.card}
                  hoverable
                  extra={
                    <Button
                      danger
                      size="small"
                      onClick={(eve) => {
                        eve.stopPropagation();
                        onDelete(note.id);
                      }}
                      loading={deleteLoading}
                    >
                      删除
                    </Button>
                  }
                  title={
                    <Space>
                      {note.tags.map((tag) => (
                        <Tag key={tag.id}>{tag.label}</Tag>
                      ))}
                    </Space>
                  }
                  onClick={() => setPreviewHtml(note.html ?? '')}
                >
                  <div dangerouslySetInnerHTML={{ __html: note.html ?? '' }} />
                </Card>
              );
            })}
          </div>
        </Spin>
      </div>
      <Modal
        title={false}
        open={!!previewHtml}
        width={'max(70vw, 800px)'}
        maskClosable={false}
        closable={false}
        footer={<Button onClick={() => setPreviewHtml('')}>关闭</Button>}
        onCancel={() => setPreviewHtml('')}
        centered
      >
        <div className={styles.modalContent} dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </Modal>
    </div>
  );
};

export default ListArea;
