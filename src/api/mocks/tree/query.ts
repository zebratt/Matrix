import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { MockFileTree, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Node = Omit<MockFileTree, 'parentId'> & { children?: Node[] };

function buildTree(data: MockFileTree[], parentId?: number) {
  const tree: Node[] = [];

  data.forEach((node) => {
    if ((!parentId && !node.parentId) || node.parentId === parentId) {
      const children = buildTree(data, node.id);
      tree.push({ ...node, children });
    }
  });

  return tree;
}

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await prisma.mockFileTree.findMany();
      const tree = buildTree(data);

      res.status(200).json({
        code: 0,
        data: tree,
      });

      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: -1,
        message: err,
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
