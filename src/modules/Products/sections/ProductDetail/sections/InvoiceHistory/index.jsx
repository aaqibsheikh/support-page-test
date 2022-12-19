import { InvoiceList } from "./sub-sections/InvoiceList.section";
import { Form } from "formik";
import { InvoiceDetail } from "./sub-sections";
import { useState } from "react";

export const InvoiceHistory = ({ isView }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <Form>
      <div className="users">
        {
          showDetail ? <InvoiceDetail /> : <InvoiceList />
        }
      </div>
    </Form>
  );
};