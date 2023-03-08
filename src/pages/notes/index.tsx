import Page from '@/components/page';
import TagManage, { TagManageRef } from '@/components/tag-manage';
import { addNote, queryNotes } from '@/services/notes';
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
  const {
    data: notes = [],
    loading: loadingQueryNotes,
    run: runQueryNotes,
  } = useRequest(queryNotes, {
    manual: true,
    onError: () => {},
  });

  const onSave = useCallback(async () => {
    const data = {
      html: editorRef.current?.editor?.getHTML(),
      tags: tagsRef.current?.tags,
    };

    try {
      await runAddNote(data);
      runQueryNotes();
      message.success('保存成功');
      editorRef.current?.editor?.setHTML('');
    } catch {
      //
    }
  }, [runAddNote, runQueryNotes]);

  useEffect(() => {
    runQueryNotes();
  }, [runQueryNotes]);

  return (
    <Page className={styles.notes}>
      <div className={styles.listArea}>
        <ListArea notes={notes} refresh={runQueryNotes} loading={loadingQueryNotes} />
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
