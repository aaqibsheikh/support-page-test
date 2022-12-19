import { Route, Routes, Navigate } from "react-router-dom";
import { ProductList, ProductDetail, CancellationRequests } from "./sections";

export function Products() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/client/dashboard/products/list/show" />}
      />
      <Route path="list/show" element={<ProductList />} />
      <Route path="active" element={<ProductList productListStatus={"active"} />} />
      <Route path="suspended" element={<ProductList productListStatus={"suspended"} />} />
      <Route path="pending" element={<ProductList productListStatus={"pending"} />} />
      <Route path="cancelled" element={<ProductList productListStatus={"cancelled"} />} />
      <Route path="list/details/:id" element={<ProductDetail />} />
      <Route
        path="cancellation/requests"
        element={<CancellationRequests />}
      />
    </Routes>
  );
}