import type { Models, RematchDispatch } from '@rematch/core';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import immerPlugin from '@rematch/immer';
import type { RematchRootState } from '@rematch/core';

// models
import tags from '@/models/tags';
import notes from '@/models/notes';

export interface RootModel extends Models<RootModel> {
  tags: typeof tags;
  notes: typeof notes;
}

const models: RootModel = { tags, notes };

export const store = init<RootModel>({
  models,
  plugins: [immerPlugin()],
});

export type RootState = RematchRootState<RootModel>;
export type AppDispatch = RematchDispatch<RootModel>;

export const RematchProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
