import { createModel } from '@rematch/core';
import type { RootModel } from '@/store';
import type { Tag } from '@prisma/client';
import { queryTags } from '@/services/notes';

interface State {
  loading: boolean;
  tags: Tag[];
}

export default createModel<RootModel>()({
  state: {
    loading: false,
    tags: [],
  } as State,
  reducers: {
    updateLoading(state, payload) {
      state.loading = payload;

      return state;
    },
    updateTags(state, payload) {
      state.tags = payload;

      return state;
    },
  },
  effects: (dispatch) => ({
    async loadTags() {
      try {
        dispatch.tags.updateLoading(true);

        const res = await queryTags();

        dispatch.tags.updateTags(res);
      } catch {
        //
      } finally {
        dispatch.tags.updateLoading(false);
      }
    },
  }),
});
