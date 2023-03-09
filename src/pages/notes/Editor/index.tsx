import { LinkPlugin, SylEditor } from '@syllepsis/access-react';
import { ToolbarInlineLoader, ToolbarLoader } from '@syllepsis/editor';
import {
  BoldPlugin,
  BulletListPlugin,
  ListItemPlugin,
  OrderedListPlugin,
  UnderlinePlugin,
} from '@syllepsis/plugin-basic';
import { CodeBlockPlugin } from '@syllepsis/plugin-code-block';
import { useImperativeHandle, forwardRef, ForwardRefRenderFunction, useEffect, useRef, useState } from 'react';
import '@syllepsis/plugin-basic/assets/style.css';
import styles from './index.less';
import { FullscreenPlugin } from './plugins/fullscreen';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import cls from 'classnames';

export interface EditorRef {
  editor: SylEditor['editor'];
}

interface EditorProps {
  initialValue?: string;
}

const Editor: ForwardRefRenderFunction<EditorRef, EditorProps> = ({ initialValue }, ref) => {
  const dispatch = useAppDispatch();
  const { editorFullscreen } = useAppSelector((state) => state.app);
  const editorRef = useRef<SylEditor['editor']>(null);
  const [plugins] = useState([
    new BoldPlugin(),
    new ListItemPlugin({
      matchInnerTags: ['section', 'p'],
      allowedLineHeights: [],
      allowedSpaceBefores: [],
      allowedSpaceAfters: { default: true, value: 20 },
      allowedSpaceBoths: [],
    }),
    new BulletListPlugin(),
    new OrderedListPlugin(),
    new CodeBlockPlugin({ lineNumbers: false }),
    new UnderlinePlugin(),
    // new ImagePlugin({
    //   uploader: (f, attrs) =>
    //     new Promise((resolve) => {
    //       setTimeout(() => {
    //         resolve({
    //           src: attrs.src,
    //         });
    //       }, 1500);
    //     }),
    // }),
    new LinkPlugin(),
    new FullscreenPlugin(),
  ]);

  const [module] = useState({
    toolbar: {
      Ctor: ToolbarLoader,
      option: {
        tools: [
          BulletListPlugin.getName(),
          OrderedListPlugin.getName(),
          CodeBlockPlugin.getName(),
          BoldPlugin.getName(),
          UnderlinePlugin.getName(),
          // ImagePlugin.getName(),
          LinkPlugin.getName(),
          FullscreenPlugin.getName(),
        ],
        tooltips: {
          [BulletListPlugin.getName()]: '无序列表',
          [OrderedListPlugin.getName()]: '有序列表',
          [CodeBlockPlugin.getName()]: '代码块',
          [BoldPlugin.getName()]: '加粗',
          [UnderlinePlugin.getName()]: '下划线',
          // [ImagePlugin.getName()]: '图片',
          [LinkPlugin.getName()]: '超链接',
          [FullscreenPlugin.getName()]: '全屏',
        },
      },
    },
    toolbarInline: {
      Ctor: ToolbarInlineLoader,
      option: {
        tools: [BoldPlugin.getName(), UnderlinePlugin.getName()],
        tooltips: {
          [BoldPlugin.getName()]: '加粗',
          [UnderlinePlugin.getName()]: '下划线',
        },
      },
    },
  });

  useEffect(() => {
    if (editorRef.current && initialValue) {
      editorRef.current.setHTML(initialValue);
    }
  }, [editorRef, initialValue]);

  useImperativeHandle(ref, () => ({
    editor: editorRef.current,
  }));

  return (
    <div
      className={cls(styles.editor, {
        [styles.editorFullscreen]: editorFullscreen,
      })}
    >
      <SylEditor
        getEditor={(editor) => {
          editorRef.current = editor;
          editor.on(FullscreenPlugin.eventName, () => {
            dispatch.app.toggleEditorFullscreen();
          });
        }}
        plugins={plugins}
        module={module}
      />
    </div>
  );
};

export default forwardRef(Editor);
