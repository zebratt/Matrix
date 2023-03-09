import Page from '@/components/page';
import TagManage, { TagManageRef } from '@/components/tag-manage';
import { addNote } from '@/services/notes';
import { useAppDispatch } from '@/store/hook';
import { useRequest } from 'ahooks';
import { Button, Col, message, Row } from 'antd';
import { useCallback, useEffect, useRef } from 'react';
import Editor, { EditorRef } from './Editor';
import styles from './index.less';
import ListArea from './List';

export default function PageNotes() {
  const editorRef = useRef<EditorRef>(null);
  const tagsRef = useRef<TagManageRef>(null);
  const { loading: loadingAddNote, runAsync: runAddNote } = useRequest(addNote, {
    manual: true,
  });
  const dispatch = useAppDispatch();

  const onSave = useCallback(async () => {
    const data = {
      html: editorRef.current?.editor?.getHTML(),
      tags: tagsRef.current?.tags,
    };

    try {
      await runAddNote(data);
      message.success('保存成功');

      dispatch.notes.loadNotes();
      editorRef.current?.editor?.setHTML('');
    } catch {
      //
    }
  }, [runAddNote, dispatch]);

  useEffect(() => {
    dispatch.notes.loadNotes();
    dispatch.tags.loadTags();
  }, [dispatch]);

  return (
    <Page className={styles.notes}>
      <div className={styles.listArea}>
        <ListArea />
      </div>
      <div className={styles.editorArea}>
        <Editor ref={editorRef} />
        <Row justify="space-between" style={{ marginTop: 12 }}>
          <Col>
            <TagManage ref={tagsRef} />
          </Col>
          <Col>
            <Button type="primary" onClick={onSave} loading={loadingAddNote}>
              保存
            </Button>
          </Col>
        </Row>
      </div>
    </Page>
  );
}
