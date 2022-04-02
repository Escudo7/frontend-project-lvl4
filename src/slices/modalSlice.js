import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    modalType: null,
    modalData: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.value = { ...state.value, ...payload };
    },
    closeModal: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
