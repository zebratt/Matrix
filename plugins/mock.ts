import type { IApi } from 'umi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default (api: IApi) => {
  api.describe({
    key: 'apiMock',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });

  api.addBeforeMiddlewares(() => {
    return async (req, res, next) => {
      if (req.method === 'POST' && req.path.startsWith('/api/mock')) {
        const targetPath = req.path.substring(9);

        try {
          const data = await prisma.mockFileTree.findMany({
            where: {
              fullPath: targetPath,
            },
            include: {
              files: true,
            },
          });

          res.status(200).json({
            code: 0,
            data: JSON.parse(data?.[0]?.files?.[0].content ?? null),
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
        next();
      }
    };
  });
};
