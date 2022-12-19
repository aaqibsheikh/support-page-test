import "./InvoiceDetail.style.scss";
import { useTranslation } from "react-i18next";

export const InvoiceDetail = () => {
  const { t } = useTranslation("/Bills/ns");
  return (
    <div className="users text-center pt-[20px]">
      <div className="bg-[#1E1E2D] rounded-lg text-left p-[30px]">
        <div className="users">
          <div className="row">
            <div className="column">
              <div className="flex justify-between items-center">
                <h4 className="text-white text-[24px]">Invoice #12580</h4>
              </div>
              <div className="mt-[40px]">
                <h6 className="text-[#474761] text-[14px]">{t("Invoice Date")}</h6>
                <p className="text-[#fff]  text-[14px] mt-[4px]">05 Feb 2022</p>
              </div>
              <div className="mt-[20px]">
                <h6 className="text-[#474761] text-[14px]">{t("DueDate")}</h6>
                <p className="text-[#fff]  text-[14px] mt-[4px]">05 Feb 2022. Due Today</p>
              </div>
            </div>
            <div className="column" style={{ float: 'right' }}>

              <div className="container">
                <div className="text-[#474761] text-[24px]"> Bill to</div>
                <div className="ml-[15px] mr-[10px]"><img src="/icon/logo.svg" alt="logo" className="h-[50px]" /></div>
                <div className="text-[white] text-[24px]">Company Name</div>
              </div>
              <div className="text-[#3699FF] p-[0]" style={{ float: 'right' }}>Company Name</div>
              <div class="container">
                <div class="row pt-[30px]" style={{ textAlign: 'end' }}>
                  <div class="col">
                    <h6 className="text-[#474761] text-[14px]" >Address</h6>
                    <p className="text-[#fff]  text-[14px] mt-[4px]">130 Birch Hill Court Beverly, MA 01915</p>
                  </div>
                  <div class="col">
                    <h6 className="text-[#474761] text-[14px]">Full Name</h6>
                    <p className="text-[#fff]  text-[14px] mt-[4px]">Paul Elliott</p>
                  </div>
                  <div class="w-100"></div>
                  <div class="col pt-[20px]">
                    <h6 className="text-[#474761] text-[14px]" >Email</h6>
                    <p className="text-[#fff]  text-[14px] mt-[4px]">Paul.Elliott@fakemail.com</p>
                  </div>
                  <div class="col pt-[20px]">
                    <h6 className="text-[#474761] text-[14px]" >Phone Number</h6>
                    <p className="text-[#fff]  text-[14px] mt-[4px]">920-727-5502</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="mt-[80px]">
            <div className="flex items-center justify-between">
              <h6 className="text-[#474761] text-[12px] uppercase">
                {t("SAMPLE PRODUCT 1")}
              </h6>
              <h6 className="text-[#474761] text-[12px] uppercase">
                {t("AMOUNT")}
              </h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            <div className="flex items-center justify-between">
              <h6 className="text-[#fff] text-[14px]">
                <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                Product Item Title
              </h6>
              <h6 className="text-[#fff] text-[14px]">$100.00</h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            <div className="flex items-center justify-between">
              <h6 className="text-[#fff] text-[14px]">
                <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                Product Item Title
              </h6>
              <h6 className="text-[#fff] text-[14px]">$100.00</h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            <div className="flex items-center justify-between pt-[30px]">
              <h6 className="text-[#474761] text-[12px] uppercase">
                {t("SAMPLE PRODUCT 2")}
              </h6>
              <h6 className="text-[#474761] text-[12px] uppercase">
                {t("AMOUNT")}
              </h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            <div className="flex items-center justify-between">
              <h6 className="text-[#fff] text-[14px]">
                <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                Product Item Title
              </h6>
              <h6 className="text-[#fff] text-[14px]">$100.00</h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            <div className="flex items-center justify-between">
              <h6 className="text-[#fff] text-[14px]">
                <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                Product Item Title
              </h6>
              <h6 className="text-[#fff] text-[14px]">$100.00</h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            <div className="flex items-center justify-between pt-[30px]">
              <h6 className="text-[#fff] text-[14px]">
                <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                Sub Total
              </h6>
              <h6 className="text-[#fff] text-[14px]">$300.00</h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            <div className="flex items-center justify-between">
              <h6 className="text-[#fff] text-[14px]">
                <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                Tax
              </h6>
              <h6 className="text-[#fff] text-[14px]">$0.00</h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
            <div className="flex items-center justify-between">
              <h6 className="text-[#fff] text-[14px]">
                <span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>
                Total
              </h6>
              <h6 className="text-[#fff] text-[14px]">$700.00</h6>
            </div>
            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};