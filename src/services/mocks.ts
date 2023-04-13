import type { TreeFile, TreeNode } from '@/types/mocks';
import request from './api';

export function queryTree() {
  return request.get<TreeNode[]>({
    url: '/api/mocks/tree/query',
  });
}

export function addTreeNode(data: { parentId?: string; path: string; fullPath: string; desc?: string }) {
  return request.post({
    url: '/api/mocks/tree/add',
    data,
  });
}

export function deleteTreeNode(data: { id: number }) {
  return request.post({
    url: '/api/mocks/tree/delete',
    data,
  });
}

export function queryFile(data: { treeId: number }): Promise<TreeFile> {
  return request
    .post<TreeFile[]>({
      url: '/api/mocks/file/query',
      data,
    })
    .then((res) => {
      return res?.[0];
    });
}

export function addFile(data: { treeId: number; content: string }) {
  return request.post({
    url: '/api/mocks/file/add',
    data,
  });
}

export function updateFile(data: { id: number; content: string }) {
  return request.post({
    url: '/api/mocks/file/update',
    data,
  });
}
