import { toast } from "react-toastify";
import {
  axios,
  getError,
  getFilteredProductsConfig,
  getInvoiceHistoryConfig,
  getProductsConfig,
  getProductsByIDConfig,
  cancelProductByIDConfig,
  cancelProductAtEndByIDConfig,
} from "lib";
import {
  getProductsDispatch,
  setProductsLoading,
  getProductsPaginationProps,
  getProductDispatch,
  getInvoiceDispatch,
} from "store/Slices/productsSlice";

// Get All Products
export const getProducts = () => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, defaultData, config } = getProductsConfig();
      const res = await axios.post(url, defaultData, config);
      dispatch(getProductsDispatch(res?.data?.data));
      const paginationProps = {
        currentPage: res?.data?.currentPage,
        pageSize: res?.data?.pageSize,
        totalCount: res?.data?.totalCount,
        totalPages: res?.data?.totalPages,
      }
      dispatch(getProductsPaginationProps(paginationProps))
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

//Search Products
export const getSearchProducts = (data) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = getProductsConfig();
      const res = await axios.post(url, data, config);
      dispatch(getProductsDispatch(res?.data?.data));
      const paginationProps = {
        currentPage: res?.data?.currentPage,
        pageSize: res?.data?.pageSize,
        totalCount: res?.data?.totalCount,
        totalPages: res?.data?.totalPages,
      }
      dispatch(getProductsPaginationProps(paginationProps))
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setProductsLoading(false));
    }
  }
}

// Get filtered Products
export const getFilteredProducts = (status, data) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = getFilteredProductsConfig(status);
      const res = await axios.post(url, data, config);
      dispatch(getProductsDispatch(res?.data?.data));
      const paginationProps = {
        currentPage: res?.data?.currentPage,
        pageSize: res?.data?.pageSize,
        totalCount: res?.data?.totalCount,
        totalPages: res?.data?.totalPages,
      }
      dispatch(getProductsPaginationProps(paginationProps))
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

// Get ALL Invoice History Table
export const getInvoiceHistory = () => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = getInvoiceHistoryConfig();
      const res = await axios.get(url, config);
      dispatch(getInvoiceDispatch(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setProductsLoading(false)); 
    }
  };
};

//Get Product By ID
export const getProductById = (id) => {
  return async (dispatch) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = getProductsByIDConfig(id);
      const res = await axios.get(url, config);
      dispatch(getProductDispatch(res?.data?.data));
    } catch (error) {
      toast.error(getError(error));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

//Cancel Id Immediately
export const cancelRequestImmediately = (id) => {
  return async (dispatch, getState) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = cancelProductByIDConfig(id);
      const res = await axios.put(url, config);
      if (res.status === 200) {
        const { url,config } = getProductsByIDConfig(id);
        const res = await axios.get(url,config);
        dispatch(getProductDispatch(res?.data?.data));
     }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};

//Cancel Id At The End Of The billing period
export const cancelRequestAtTheEnd = (id1) => {
  return async (dispatch, getState) => {
    dispatch(setProductsLoading(true));
    try {
      const { url, config } = cancelProductAtEndByIDConfig(id1);
      const res = await axios.put(url, config);
      if (res.status === 200) {
        const { url,config } = getProductsByIDConfig(id1);
        const res = await axios.get(url,config);
        dispatch(getProductDispatch(res?.data?.data));
     }
    } catch (e) {
      toast.error(getError(e));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };
};