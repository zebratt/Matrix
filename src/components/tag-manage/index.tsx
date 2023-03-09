import { Button, Col, message, Row, Select, Space, Tag } from 'antd';
import {
  CSSProperties,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useRequest } from 'ahooks';
import { addTag } from '@/services/notes';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { LabeledValue } from '@/types/common';
import type { Tag as ITag } from '@prisma/client';
import { useAppDispatch, useAppSelector } from '@/store/hook';

export interface TagManageRef {
  tags: Pick<ITag, 'id'>[];
}

interface TagManageProps {
  className?: string;
  style?: CSSProperties;
}

const TagManage: ForwardRefRenderFunction<TagManageRef, TagManageProps> = ({ className, style }, ref) => {
  const [selected, setSelected] = useState<LabeledValue>();
  const [selecting, setSelecting] = useState(false);
  const [tags, setTags] = useState<LabeledValue[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { tags: data, loading } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  const { loading: addTagLoading, runAsync: addTagRun } = useRequest(addTag, {
    manual: true,
    onError: () => {},
  });

  const onAdd = useCallback(() => {
    setSelecting(true);
  }, []);

  const onSelectConfirm = useCallback(() => {
    if (selected) {
      setTags([
        ...tags,
        {
          label: selected.label,
          value: selected.value,
        },
      ]);
      setSelected(undefined);
      setSelecting(false);
    }
  }, [selected, tags]);

  const onSelectCancel = useCallback(() => {
    setSelected(undefined);
    setSelecting(false);
  }, []);

  const onTagClose = useCallback(
    (removed: LabeledValue) => {
      setTags(tags.filter((el) => el.value === removed.value));
    },
    [tags],
  );

  const onCreateNewTag = useCallback(async () => {
    try {
      if (searchValue) {
        await addTagRun(searchValue);

        message.success('添加成功');
        setSelected(undefined);
        setSearchValue('');
        dispatch.tags.loadTags();
      }
    } catch {
      //
    }
  }, [searchValue, addTagRun, dispatch]);

  const notFoundContent = useMemo(() => {
    return (
      <Row justify="space-between" align="middle">
        <Col>
          <span style={{ color: '#666' }}>新建标签</span>
        </Col>
        <Col>
          <Button onClick={onCreateNewTag} loading={addTagLoading}>
            确定
          </Button>
        </Col>
      </Row>
    );
  }, [onCreateNewTag, addTagLoading]);

  useImperativeHandle(ref, () => ({
    tags: tags.map((el) => ({
      id: Number(el.value),
    })),
  }));

  return (
    <div className={className} style={style}>
      <Space>
        {tags.map((tag) => (
          <Tag key={tag.value as number} closable onClose={() => onTagClose(tag)}>
            {tag.label}
          </Tag>
        ))}
        {!selecting ? (
          <Button icon={<PlusCircleOutlined />} onClick={onAdd}>
            添加标签
          </Button>
        ) : (
          <>
            <Select
              loading={loading}
              style={{ width: 180 }}
              placeholder="请选择标签"
              labelInValue
              optionFilterProp="label"
              showSearch
              value={selected}
              onChange={(next) => setSelected(next)}
              notFoundContent={notFoundContent}
              searchValue={searchValue}
              onSearch={(text) => {
                setSearchValue(text);
              }}
            >
              {data
                .filter((el) => !tags.map((ele) => ele.value).includes(String(el.id)))
                .map((el) => {
                  return (
                    <Select.Option key={el.id} value={String(el.id)} label={el.label}>
                      {el.label}
                    </Select.Option>
                  );
                })}
            </Select>
            <Button type="primary" onClick={onSelectConfirm} disabled={!selected}>
              确定
            </Button>
            <Button onClick={onSelectCancel}>取消</Button>
          </>
        )}
      </Space>
    </div>
  );
};

export default forwardRef(TagManage);
