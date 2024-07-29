import React from "react";
import { Link } from "react-router-dom";

function Paymentfailed({setPaymentStatus ,handleRozrpapy,userdata,setIsModalOpen}) {
  
  const handlePaymentStatus = () => {
    handleRozrpapy(userdata)
    setPaymentStatus(null);    
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-[#f7f7f7] rounded-lg shadow-lg lg:w-1/3 w-10/12  mx-auto md:m-10 mb-3 mt-7 relative transform -translate-x-1/2   animate-slideInDown ">
        <button
            aria-label="Click To Play Audio"
            type="button"
            className="absolute top-4 right-4 p-2"
            data-dismiss="modal"
            onClick={() => {
              setPaymentStatus(null);    
              setIsModalOpen(true)
            }}
          >
            <img src="images/crosspop.webp" className="w-2 h-2 rounded-lg" alt="close" />
          </button>
        <img src="/images/Paymentfailed.jpeg" className="mx-auto rounded-lg" alt="Payment Successful" />
        <div className=" mx-auto pb-6 text-center md:mb-12 mt-12">
          <Link
              className="bg-[#ff373b] text-black font-extrabold py-3 px-5 rounded-3xl  "
              onClick={()=>{handlePaymentStatus()}}
            >
              Try again
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Paymentfailed;
