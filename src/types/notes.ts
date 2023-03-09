import type { NoteTag } from './tags';

export interface Note {
  id: number;
  html?: string;
  tags: NoteTag[];
}
