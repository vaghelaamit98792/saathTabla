import React from "react";
import { Link } from "react-router-dom";

function Alreadypurchsed({showPaymentstatusmodel,Paymentstatustext}) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg lg:w-1/3 w-10/12  mx-auto md:m-10 m-3 relative transform -translate-x-1/2   animate-slideInDown ">
          <button
            aria-label="Click To Play Audio"
            type="button"
            className="absolute top-4 right-4 p-2"
            data-dismiss="modal"
            onClick={() => {
              showPaymentstatusmodel(false);
            }}
          >
            <img src="images/crosspop.webp" className="w-2 h-2" alt="close" />
          </button>
          <div className="p-6 text-center md:my-12">
            <img src="images/check.webp" className="mx-auto mb-4" alt="check" />
            <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-8">
            {Paymentstatustext}
            </h1>
            <Link
              to="https://saathstudio.com"
              target="_blank"
              className="bg-[#25d955] text-white py-2 px-5 rounded-md"
            >
              OK
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alreadypurchsed;
