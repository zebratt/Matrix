import { createModel } from '@rematch/core';
import type { RootModel } from '@/store';
import { queryNotes } from '@/services/notes';
import type { Note } from '@/types/notes';

interface State {
  loading: boolean;
  notes: Note[];
}

export default createModel<RootModel>()({
  state: {
    loading: false,
    notes: [],
  } as State,
  reducers: {
    updateLoading(state, payload) {
      state.loading = payload;

      return state;
    },
    updateNotes(state, payload) {
      state.notes = payload;

      return state;
    },
  },
  effects: (dispatch) => ({
    async loadNotes(tagId?: number) {
      try {
        dispatch.notes.updateLoading(true);

        const res = await queryNotes(tagId);

        dispatch.notes.updateNotes(res);
      } catch {
        //
      } finally {
        dispatch.notes.updateLoading(false);
      }
    },
  }),
});
