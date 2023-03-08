import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method === 'GET') {
    try {
      const notes = await prisma.note.findMany({
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      res.status(200).json({
        code: 0,
        data: notes.map((note) => ({
          ...note,
          tags: note.tags.map((tag) => tag.tag),
        })),
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
