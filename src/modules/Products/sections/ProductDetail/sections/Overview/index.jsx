import { GenericInfo, LineItems } from "./sub-sections";
import { Sidebar } from "../Sidebar";
import { Form } from "formik";

export const Overview = ({ isView }) => {

  return (
    <Form>
      <div className="users">
        <div className="admin-details min-w-[60vh] pt-[20px]">
          <>
            <div className="admin-details__left">
              <Sidebar />
            </div>
            <div className="admin-details__right">
              <GenericInfo
                isView

              />
              <LineItems isView />
            </div>
          </>
        </div>
      </div>
    </Form>
  );
};