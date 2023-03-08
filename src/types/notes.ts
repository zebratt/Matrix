import type { Tag } from '@prisma/client';

export interface Note {
  id: number;
  html?: string;
  tags: Tag[];
}
