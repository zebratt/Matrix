import type { Note } from '@/types/notes';
import type { Tag } from '@prisma/client';
import request from './api';

export function addTag(label: string) {
  return request.post<{ id: number }>({
    url: '/api/notes/label/add',
    data: {
      label,
    },
  });
}

export function queryTags() {
  return request.get<Tag[]>({
    url: '/api/notes/label/query',
  });
}

export function addNote(data: { html?: string; tags?: Pick<Tag, 'id'>[] }) {
  return request.post<{ id: number }>({
    url: '/api/notes/note/add',
    data,
  });
}

export function queryNotes() {
  return request.get<Note[]>({
    url: '/api/notes/note/query',
  });
}

export function deleteNote(id: number) {
  return request.post<{ id: number }>({
    url: '/api/notes/note/delete',
    data: {
      id,
    },
  });
}
