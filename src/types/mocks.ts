export interface TreeNode {
  id: number;
  parentId: string;
  path: string;
  fullPath: string;
  desc: string;
  children?: TreeNode[];
}

export interface TreeFile {
  id: number;
  content: string;
}
