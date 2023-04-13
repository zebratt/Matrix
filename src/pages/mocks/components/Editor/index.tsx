import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef } from 'react';
import Editor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

interface JSONEditorProps {
  options?: JSONEditorOptions;
}

export interface JSONEditorRef {
  set: (content: string) => void;
  get: () => string;
}

const JSONEditor: ForwardRefRenderFunction<JSONEditorRef, JSONEditorProps> = ({ options }, ref) => {
  const editorWrapper = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<Editor | null>(null);

  useEffect(() => {
    if (editorWrapper.current) {
      editorInstance.current = new Editor(editorWrapper.current, {
        mode: 'code',
        ...options,
      });
      return () => {
        editorInstance.current?.destroy();
      };
    }
  }, []);

  useImperativeHandle(ref, () => ({
    get: () => {
      return editorInstance.current?.get() ?? '';
    },
    set: (content: string) => {
      editorInstance.current?.set(content);
    },
  }));

  return <div ref={editorWrapper} style={{ height: '100%' }}></div>;
};

export default forwardRef(JSONEditor);
