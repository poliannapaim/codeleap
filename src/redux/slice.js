import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  content: '',
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setTitle, setContent } = postSlice.actions;

export default postSlice.reducer;
