import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { Spin } from "antd";
import { Overview, InvoiceHistory } from "./sections";
import { Navigation } from "./sections";
import "./ProductDetail.styles.scss"
import { createServerImage } from "lib";
import { getProductById } from "store/Actions/products";
import { getInvoiceHistory } from "store/Actions/products";

export const ProductDetail = () => {
  const [active, setActive] = useState("OVERVIEW");
  const links = [
    { label: "OVERVIEW", onClick: () => setActive("OVERVIEW") },
    {
      label: "INVOICE HISTORY",
      onClick: () => { dispatch(getInvoiceHistory()); setActive("INVOICE HISTORY") }
    },
  ];
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state?.products);
  const { id } = useParams();

  useEffect(() => {
    if (!(product && Object.keys(product).length)) {
      dispatch(getProductById(id));
    }
  }, []);
  const initVal = {
    preview: product?.base64Image,
    thumbnail: product?.thumbnail,
    status: product?.status,
    name: product?.name,
    description: product?.description,
    productLineItems: product?.productLineItems?.map((item) => ({
      ...item,
      isDeleted: item?.isDeleted || false,
    })),
    paymentType: product?.paymentType,
    registrationDate: moment(product?.registrationDate),
    nextDueDate: moment(product?.nextDueDate),
    terminationDate:
      product?.terminationDate?.split("-")[0] !== "0001"
        ? moment(product?.terminationDate)
        : null,
    billingCycle: product?.billingCycle,
  };
  return (
    <Formik
      initialValues={initVal}
      enableReinitialize
      onSubmit={async (values) => {
        const img = await createServerImage(values.thumbnail);
      }}
    >
      {({ values }) => {
        return (
          <div className="users">
            <div className="col p-[32px]">
              {loading ?
                (
                  <Spin
                    size="large"
                    style={{ gridColumn: "2/3", alignSelf: "center" }}
                  />
                ) : (
                  <>
                    <Navigation
                      active={active}
                      links={links}
                    />
                    {active === "OVERVIEW" ? <Overview /> : <></>}
                    {active === "INVOICE HISTORY" ? <InvoiceHistory /> : <></>}

                  </>
                )}
            </div>
          </div>
        );
      }}
    </Formik>
  );
};