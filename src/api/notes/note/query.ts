import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method === 'POST') {
    try {
      const notes = await prisma.note.findMany({
        orderBy: {
          updateAt: 'desc',
        },
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      const data = notes
        .map((note) => ({
          ...note,
          tags: note.tags.map((tag) => tag.tag),
        }))
        .filter((note) => {
          if (!req.body.tagId) return true;

          return note.tags.map((t) => t.id).includes(Number(req.body.tagId));
        });

      res.status(200).json({
        code: 0,
        data,
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
