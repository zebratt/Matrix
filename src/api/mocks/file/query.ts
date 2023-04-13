import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = await prisma.mockFile.findMany({
        where: {
          treeId: req.body.treeId,
        },
      });

      res.status(200).json({
        code: 0,
        data: data,
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
