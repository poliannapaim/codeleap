import { configureStore } from '@reduxjs/toolkit';
import post from './slice';

export const store = configureStore({
  reducer: {
    post
  },
});
