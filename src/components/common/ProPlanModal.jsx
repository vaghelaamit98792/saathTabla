import axios from 'axios';
import React, {  useState } from 'react';
import {  UserLifetimeSignupApi } from '../../constant';


const ProPlanModal = ({setIsModalOpen, membershipdetails,handlePayment}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [checked, setChecked] = useState(false)
  const [isOtpRequired, setIsOtpRequired] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (checked) {
      setLoading(true);
      try {
        const response = await axios.post(
          UserLifetimeSignupApi,
          new URLSearchParams({
            api_key: 'nK<uJ@Tk8&$B#-xq-?#}',
            email: email,
            name: username,
            otp: otp
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const data = response.data;
        const userid = data?.userid;
        console.log(data, "datalogin");

        if (data.status === 102) {
          setIsOtpRequired(true);
        } else if (data.status === 101) {
          setIsModalOpen(false);
          const userData = { username, email, userid };
         await handlePayment(userData)
        } else if (data.status === 402) {
          alert('This email already has a lifetime plan. Please use another email');
        } else if (data.status === 401) {
          alert('Account validation failed. Please retry or try with a different email id');
        }
      } catch (error) {
        console.error('Error during API call', error);
        alert('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('You must agree to the terms and conditions');
    }
  };

  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="md:p-6 p-3 border m-6 border-gray-600 bg-white relative rounded-lg ">
            <div className="border m-1 border-gray-600 h-full" >
              <div className="text-center ">
                <div className='flex'>
                  <img src="images/bestprice.png" alt="" className='lg:w-24 lg:h-24 h-16 mr-4 md:mr-8 lg:mr-24' />
                  <img src="./images/proplan.png" alt="Saath Tabla" className="mx-auto w-20 md:w-28 lg:w-60" />
                  <img src="./images/limitedoffer.png" alt="Saath Tabla" className="w-24  lg:w-60" />
                  </div>
                <div className="text-center mt-1" style={{ backgroundImage: `url("./images/stamp.png")`, backgroundRepeat: "no-repeat", backgroundSize:"contain", backgroundPosition:'center' }}>
                  <img src="./images/logo.png" alt="Saath Tabla" className="mx-auto w-20 lg:w-48" />

                  <div className="lg:text-base text-xs mt-2 font-bold">Saath Tabla</div>
                  <div className="text-2xl md:text-3xl mt-2 sm:mb-2 mb-2 font-bold">Rs. 3499 only</div>
                  <div className="mt-2 font-bold">One Time Payment - No recurring subscriptions</div>
                </div>
                <form className="mt-1 sm:mt-6 md:w-96 mx-auto px-2 text-center" onSubmit={handleLogin}>
                  <input
                    placeholder="Name"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 mb-1 sm:mb-4"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 mb-1 sm:mb-4"
                  />
                  {isOtpRequired && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-4 rounded shadow-lg w-[20%] h-[20%]">
                        <h3 className="text-lg font-semibold mb-4">Please Enter OTP sent on your Email
                        </h3>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                          className="w-full p-2 border border-gray-300 mb-4"
                        />
                        <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mr-2 px-4 py-2 bg-red-900 text-white rounded"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className=" px-4 py-2 bg-gray-200 text-red-800 rounded"
                            onClick={() => setIsOtpRequired(false)}
                          >
                            Cancel
                          </button>
                         
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center mb-4 mt-2 justify-center">
                    <input
                      type="checkbox"
                      id="terms&Conditions"
                      name="terms&Conditions"
                      className="mr-2"
                      onChange={(e)=> setChecked(e.target.checked)}
                    />
                    <label htmlFor="terms&Conditions" className="text-sm text-red-900 font-semibold">I Agree to <a href='https://saathstudio.com/terms-and-condition' target="blank">Terms & Conditions </a></label>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex justify-center w-full">
                    <button
                      type="submit"
                      className="bg-red-900 text-white py-1 px-1 w-46 rounded-full font-bold flex justify-center gap-3 items-center hover:bg-red-600"
                    >
                      {loading && <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-100"></div>
                    </div>}
                      <p className="pl-4">PAY NOW</p>
                      <div className="w-8 h-8 flex justify-center items-center rounded-full text-red-900 bg-red-100">$</div>
                    </button>
                  </div>
                </form>
                <div className="sm:mt-10 mt-2">
                  <div className="md:text-base sm:text-xs text-[8px] mt-4 text-gray-600">
                    <strong>Note: </strong> if you already have an account on Saath Tabla with the given email ID then the lifetime pro plan will be activated to that account after successful payment. If you don't have an account on Saath Tabla app, we will automatically create one for you with this email and send you the account password to your email.
                  </div>
                  <div className="flex justify-between mt-4">
                    <a href="https://saathstudio.com/privacy-policy" target="_blank" className="text-blue-500 hover:underline w-1/2 md:text-center">Privacy Policy</a>
                    <a href="https://saathstudio.com/cancellation" target="_blank" className="text-blue-500 hover:underline w-1/2 md:text-center">Refund Policy</a>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                <img
                    src="images/crosspop.webp"
                    className="w-2 h-2"
                    alt="close"
                  />
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default ProPlanModal;
