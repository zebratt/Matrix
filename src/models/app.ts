import { createModel } from '@rematch/core';
import type { RootModel } from '@/store';

interface State {
  editorFullscreen: boolean;
}

export default createModel<RootModel>()({
  state: {
    editorFullscreen: false,
  } as State,
  reducers: {
    toggleEditorFullscreen(state) {
      state.editorFullscreen = !state.editorFullscreen;

      return state;
    },
    updateEditorFullscreen(state, payload) {
      state.editorFullscreen = payload;

      return state;
    },
  },
});
