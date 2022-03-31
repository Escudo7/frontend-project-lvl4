import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    modalType: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.value.modalType = payload;
    },
    closeModal: (state) => {
      state.value.modalType = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
