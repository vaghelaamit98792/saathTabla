import React from "react";
import { Link } from "react-router-dom";

function Paymentsuccess({setPaymentStatus}) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg lg:w-1/3 w-10/12  mx-auto md:m-10 mb-3 mt-7 relative transform -translate-x-1/2   animate-slideInDown ">
        <button
            aria-label="Click To Play Audio"
            type="button"
            className="absolute top-4 right-4 p-2"
            data-dismiss="modal"
            onClick={() => {
                setPaymentStatus(false);
            }}
          >
            <img src="images/crosspop.webp" className="w-2 h-2" alt="close" />
          </button>
        <img src="/images/Payment Successful.gif" className="mx-auto mt-7" alt="Payment Successful" />
        <div className="absolute left-1/2 xl:bottom-3 bottom-[-2.5rem] transform -translate-x-1/2 -translate-y-1/2 pb-6 text-center md:mb-12 mt-4">
          <Link
              to="https://saathstudio.com"
              target="_blank"
              className="bg-[#25d955] text-white py-2 px-5 rounded-md  "
              onClick={() => {
                setPaymentStatus(false);
            }}
            >
              OK
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Paymentsuccess;
