import Page from '@/components/page';
import TagManage, { TagManageRef } from '@/components/tag-manage';
import { addNote, updateNote } from '@/services/notes';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { useRequest } from 'ahooks';
import { Button, Col, message, Row, Space } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import Editor, { EditorRef } from './Editor';
import styles from './index.less';
import ListArea from './List';
import cls from 'classnames';
import type { NoteTag } from '@/types/tags';

export default function PageNotes() {
  const editorRef = useRef<EditorRef>(null);
  const tagsRef = useRef<TagManageRef>(null);
  const [currentNoteId, setCurrentNoteId] = useState<number>();
  const { loading: loadingAddNote, runAsync: runAddNote } = useRequest(addNote, {
    manual: true,
  });
  const { loading: loadingUpdateNote, runAsync: runUpdateNote } = useRequest(updateNote, {
    manual: true,
  });
  const dispatch = useAppDispatch();
  const { editorFullscreen } = useAppSelector((state) => state.app);

  const onSave = useCallback(async () => {
    const data = {
      html: editorRef.current?.editor?.getHTML(),
      tags: tagsRef.current?.tags,
    };

    try {
      if (currentNoteId) {
        await runUpdateNote({
          id: currentNoteId,
          ...data,
        });
        message.success('更新成功');
      } else {
        await runAddNote(data);
        message.success('保存成功');
      }

      dispatch.notes.loadNotes();
      editorRef.current?.editor?.setHTML('');
      tagsRef.current?.clear();
      dispatch.app.updateEditorFullscreen(false);
      setCurrentNoteId(undefined);
    } catch {
      //
    }
  }, [currentNoteId, dispatch, runUpdateNote, runAddNote]);

  const onModify = useCallback((id: number, html: string, tags: NoteTag[]) => {
    editorRef.current?.editor?.setHTML(html);
    tagsRef.current?.setTags(tags);
    setCurrentNoteId(id);
  }, []);

  const onCreate = useCallback(() => {
    setCurrentNoteId(undefined);
    editorRef.current?.editor?.setHTML('');
    tagsRef.current?.clear();
  }, []);

  useEffect(() => {
    dispatch.notes.loadNotes();
    dispatch.tags.loadTags();
  }, [dispatch]);

  return (
    <Page className={styles.notes}>
      <div
        className={cls(styles.listArea, {
          [styles.listAreaFullscreen]: editorFullscreen,
        })}
      >
        <ListArea onModify={onModify} />
      </div>
      <div
        className={cls(styles.editorArea, {
          [styles.editorAreaFullscreen]: editorFullscreen,
        })}
      >
        <Editor ref={editorRef} />
        <Row justify="space-between" style={{ marginTop: 12 }}>
          <Col>
            <TagManage ref={tagsRef} />
          </Col>
          <Col>
            <Space>
              {currentNoteId && <Button onClick={onCreate}>取消</Button>}
              <Button type="primary" onClick={onSave} loading={loadingAddNote || loadingUpdateNote}>
                {currentNoteId ? '更新' : '保存'}
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    </Page>
  );
}
