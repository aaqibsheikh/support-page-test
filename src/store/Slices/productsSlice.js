import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  invoices:[],
  product: null,
  loading: false,
  paginationProps: {},
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsDispatch: (state, { payload }) => {
      state.products = payload;
    },
    getProductDispatch: (state, { payload }) => {
      state.product = payload;
    },
    setProductsLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getProductsPaginationProps: (state, { payload }) => {
      state.paginationProps = payload;
    },
    getInvoiceDispatch: (state, { payload }) => {
      state.invoices = payload;
    },
  },
});

const { reducer, actions } = productsSlice;
export const {
  getInvoiceDispatch,
  getProductDispatch,
  getProductsDispatch,
  setProductsLoading,
  getProductsPaginationProps } = actions;

export default reducer;
