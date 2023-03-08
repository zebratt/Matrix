import { deleteNote } from '@/services/notes';
import type { Note } from '@/types/notes';
import { useRequest } from 'ahooks';
import { Button, Card, message, Modal, Space, Spin, Tag } from 'antd';
import { FC, useCallback, useState } from 'react';
import styles from './index.less';

interface ListAreaProps {
  notes: Note[];
  refresh: VoidFunction;
  loading: boolean;
}

const ListArea: FC<ListAreaProps> = ({ notes, refresh, loading }) => {
  const { loading: deleteLoading, runAsync: runDelete } = useRequest(deleteNote, {
    manual: true,
  });
  const [previewHtml, setPreviewHtml] = useState('');

  const onDelete = useCallback(
    (id: number) => {
      Modal.confirm({
        title: '确认删除吗？',
        onOk: () => {
          runDelete(id)
            .then(() => {
              message.success('删除成功');
              refresh();
            })
            .catch(() => {});
        },
      });
    },
    [runDelete, refresh],
  );

  return (
    <Spin spinning={loading} style={{ minHeight: '100%' }}>
      <div className={styles.listArea}>
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
    </Spin>
  );
};

export default ListArea;
