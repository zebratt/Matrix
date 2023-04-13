import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = await prisma.mockFile.update({
        where: {
          id: req.body.id,
        },
        data: {
          content: req.body.content,
        },
      });

      res.status(201).json({
        code: 0,
        data: {
          id: data.id,
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
