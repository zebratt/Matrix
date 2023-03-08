import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method === 'POST') {
    try {
      const tag = await prisma.tag.create({
        data: {
          label: req.body.label,
        },
      });

      res.status(201).json({
        code: 0,
        data: {
          id: tag.id,
        },
      });

      await prisma.$disconnect();
    } catch (err) {
      res.status(500).json({
        code: -1,
        message: err,
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
