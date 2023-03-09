import type { ReactElement } from 'react';
import React from 'react';
import { RematchProvider } from './store';

export function rootContainer(container: ReactElement) {
  return React.createElement(RematchProvider, null, container);
}
