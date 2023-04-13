import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = await prisma.mockFileTree.deleteMany({
        where: {
          OR: [{ id: req.body.id }, { parentId: req.body.id }],
        },
      });

      res.status(201).json({
        code: 0,
        data: {
          deletedCount: data.count,
        },
      });

      await prisma.$disconnect();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: -1,
        message: JSON.stringify(err),
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
