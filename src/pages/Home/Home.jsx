import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./Home.css"
import Footer from "../../components/common/Footer";
import HeroBanner from "../../components/common/HeroBanner";
import { Link } from "react-router-dom";
import axios from "axios";
import ProPlanModal from "../../components/common/ProPlanModal";
import { Spinner } from "../../components/common/Spinner";
import Artists from "../../components/Artists";
import { accordionData, bars, cards, Durt } from "../../data/data";
import {  GetMembershipdetailsApi, PlaceUserOrderAndroidApi, RozerpayKeyId, RozerpaySrcLink } from "../../constant";
import VoteAnswerAlert from "../../components/common/VoteAnsweralert";
import TablaAccompaniment from "../../components/TablaAccompaniment";
import { useAudioPlayerContext } from "../../context/useAudioPlayerContext";
import GooglePlay from "../../public/images/svg/google-play-badge-logo-svgrepo-com.svg";
import Appstore from "../../public/images/svg/download-on-the-app-store-apple-logo-svgrepo-com.svg";
import { APPSTORE, GOOGLE_PLAY_STORE } from '../../constant';

function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);
  const [membershipdetails, setMembershipdetails] = useState(null)
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ setPaymentStatus] = useState('');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const handleCheckboxChange = (setter) => () => {
    setter((prev) => !prev);
  };
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = RozerpaySrcLink;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const { playingIndex, isPlaying, handlePlayPause } = useAudioPlayerContext();
  console.log(playingIndex,"playingIndexhome");


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scrollToBuyNow = () => {
    document.getElementById("ByNow").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchMembershipDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          GetMembershipdetailsApi,
          new URLSearchParams({
            api_key: 'nK<uJ@Tk8&$B#-xq-?#}',
            membership_id: "6",

          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log(response, "response");
        if (!response.statusText === "ok") {
          throw new Error('Network response was not ok');
        }

        if (response.data.status === "1") {
          setPlanDetails({
            originalPrice: response.data.membership_details.web_planprice_inr,
            discountedPrice: response.data.membership_details.web_discountedprice_inr,
          });
          setMembershipdetails(response.data.membership_details)
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipDetails();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = RozerpaySrcLink ;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (user) => {
    const res = await loadRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const formData = new URLSearchParams();
    formData.append('api_key', RozerpayKeyId);
    formData.append('userid', user.userid);
    formData.append('membership_id', membershipdetails?.membership_id);
    formData.append('order_amount', membershipdetails?.web_discountedprice_inr);
    formData.append('order_remark', membershipdetails.level_name);
    formData.append('payment_mode', 'razorpay');
    const createOrderResponse = await fetch(PlaceUserOrderAndroidApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData,
    });


    const { order_id } = await createOrderResponse.json();

    const options = {
      key: RozerpayKeyId ,
      amount: parseFloat(membershipdetails.web_discountedprice_inr) * 100, // Convert to paise
      currency: 'INR',
      name: user.username,
      description: 'Test Transaction',
      image: "compnaylogo",
      order_id: order_id,
      handler: function (response) {
        alert(`Payment ID: ${response.razorpay_payment_id}`);
        alert(`Order ID: ${response.razorpay_order_id}`);
        alert(`Signature: ${response.razorpay_signature}`);
        setPaymentStatus('Payment successful');
      },
      prefill: {
        name: user.username,
        email: user.email,
        contact: ''
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setIsModalOpen(true)
    } else {
      displayRazorpay(user)
    }
  }

  return (
    <>
      <HeroBanner />
      <div className="section2 pt-10">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-[34px] font-avertabold text-center">
            Tabla Accompaniment Just Got{" "}
            <span className="relative ">
              <span className="absolute -bottom-0.5">
                <img src="images/voiceline2.webp" className=" lg:block" alt="" />
              </span>
              Real
            </span>
          </h2>
          <div className="flex mt-5 lg:mt-10 justify-center flex-col">
            <div className="relative w-full text-center lg:w-40 xl:w-1/4 mt-0  mb-10">
              <p className="font-caveat text-xl lg:text-2xl rotate-[0deg] lg:-rotate-[10deg] lg:absolute lg:right-0 static">
                Play the Audios
              </p>
              <div className="svg-wrapper absolute top-11 left-12 hidden lg:flex lg:right-0  justify-end">
                <svg
                  width={74}
                  height={45}
                  viewBox="0 0 74 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <path
                    d="M1 0.5C3.33333 15.5 20.9 41.6 72.5 26"
                    stroke="black"
                  />
                  <path d="M54.5 17L72.5 26L63 44.5" stroke="black" />
                </svg>
              </div>
            </div>
            <div className="flex flex-wrap justify-center lg:w-3/4 xl:2/4 w-full mx-auto ">
              {Durt.map((instrument, index) => (
                <div
                  className="w-1/2 sm:w-40 play-box flex justify-center mb-10 lg:mb-0"
                  key={index}
                >
                  <div
                    aria-label={`Click To Play ${instrument.image}`}
                    className="top_button_play paused"
                    data-src={instrument.audio}
                  >
                    <div
                      className={`w-28 h-28 relative play-icon-wrapper b${
                        index + 1
                      }`}
                    >
                      <img
                        src={instrument.image}
                        alt={`${instrument.image}`}
                      />
                      <div className="play-icon absolute -translate-x-2/4 -translate-y-2/4 text-center left-14 top-[55%]">
                        <button
                          className="playPauseButton"
                          onClick={() => handlePlayPause(instrument.audio,`${index}_${instrument.label}`)}
                        >
                          <img
                            className="playPauseIcon"
                            src={
                              isPlaying && playingIndex === `${index}_${instrument.label}`
                                ? "images/pause.png"
                                : "images/play.png"
                            }
                            alt="play/pause icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-0 lg:mt-[102px] pb-10">
            {/* <h2 class="text-2xl lg:text-[44px] font-averta text-center w-full font-avertabold mb-2">
      Grab Access To Saath Tabla Today…

    </h2>
    <h3 class="text-2xl font-averta text-center w-full font-avertabold">
      No Monthly Fees –
      <span class="relative"
        ><span class="absolute -bottom-1"
          ><img src="images/voiceline2.webp" /></span
        >One Time Payment</span
      >
    </h3> */}
            <div className="star-rating justify-center flex flex-col">
              {/* <div class="flex justify-center mt-3 flex-col lg:flex-row">
        <div class="flex justify-center">
          <img src="images/people.png" alt="People " />
        </div>
        <div class="rating-wrapper flex items-center justify-center">
          <div class="">
            <div class="star-icon flex justify-end items-center gap-1 justify-center">
              <i class="fa fa-star text-amber-400"></i>
              <i class="fa fa-star text-amber-400"></i>
              <i class="fa fa-star text-amber-400"></i>
              <i class="fa fa-star text-amber-400"></i>
              <i class="fa fa-star text-amber-400"></i>
              <span class="font-averta">5.0</span>
            </div>
            <h3 class="font-averta text-sm">From 3,000+ reviews</h3>
          </div>
        </div>
      </div> */}
              <div className="w-full lg:w-fit mx-auto flex justify-center flex-col lg:flex-wrap">
                <h2
                  onClick={scrollToBuyNow}
                  className="w-full cursor-pointer bg-[#1fb6ff] text-center text-nowrap  text-white text-xl lg:text-[35px] inline-block px-5 lg:px-16 rounded-[40px] py-4 font-avertabold shadow-[0px_20px_35px_0px_rgb(31_182_255_/_29%)] hover-shadow-none"
                >
                  Get Saath Tabla Right Now!
                </h2>
              </div>
              <div className="flex justify-center items-center lg:gap-9 gap-2 md:mt-7  mt-6 mx-auto">
                                    <div className="lg:w-4/12 w-7/12 m-1">
                                        <Link to={GOOGLE_PLAY_STORE} target="blank">
                                            <img src={GooglePlay} alt="" className="lg:w-80 w-48" />
                                        </Link>
                                    </div>
                                    <div className='lg:w-4/12 w-7/12 m-1'>
                                        <Link to={APPSTORE} target="blank">
                                            <img src={Appstore} alt="" className="lg:w-80 w-48" />
                                        </Link>
                                    </div>
                                </div>
              <div className="text-center mt-8 lg:mt-20">
                <h3 className="font-avertabold text-xl lg:text-2xl">
                  Real Results from Real Customers -&nbsp;
                  <span className="font-averta">Read Their Stories:</span>
                </h3>
              </div>
              <div className="w-full lg:w-2/5 mx-auto mt-12 relative">
                <Slider {...settings}>
                  <div className="item">
                    <img src="images/testimonial-1.jpg" alt="Testimonial 1" />
                  </div>
                  <div className="item">
                    <img src="images/testimonial-2.jpg" alt="Testimonial 2" />
                  </div>
                  <div className="item">
                    <img src="images/testimonial-3.jpg" alt="Testimonial 3" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section3 mt-[70px]">
        <div className="container mx-auto">
          <div className="p-5 xl:p-14 bg-gradient-to-r from-[#e9f8ff] to-[#f7f0fe] rounded-[29px] flex flex-wrap gap-4 xl:gap-11 justify-center relative before:hidden md:before:block before:absolute before:w-[141px] before:h-[155px] before:-right-10 before:-bottom-9 before:-z-10 before:bg-dottedbg">
           <div className="w-full md:w-[47%] lg:w-[30%] flex items-start bg-white rounded-2xl p-4 lg:py-8 lg:px-6">
              <div className="box-icon-wrapper shrink-0">
                <img src="images/voiceicon4.webp" alt="" />
              </div>
              <div className="box-text pl-3 max-w-64">
                <h4 className="font-averta text-[19px] xl:text-lg">
                  AI-Based Sequence for Human-Like{" "}
                  <span className="font-avertabold">Experience</span>
                </h4>
              </div>
            </div>
            <div className="w-full md:w-[47%] lg:w-[30%] flex items-start bg-white rounded-2xl p-4 lg:py-8 lg:px-6">
              <div className="box-icon-wrapper shrink-0">
                <img src="images/voiceicon2.webp" alt="" />
              </div>
              <div className="box-text pl-3 max-w-64">
                <h4 className="font-averta text-[19px] xl:text-lg">
                  Real Tabla Loops by&nbsp;
                  <span className="font-avertabold">Maestros</span>
                </h4>
              </div>
            </div>
            <div className="w-full md:w-[47%] lg:w-[30%] flex items-start bg-white rounded-2xl p-4 lg:py-8 lg:px-6">
              <div className="box-icon-wrapper shrink-0">
                <img src="images/voiceicon5.webp" alt="" />
              </div>
              <div className="box-text pl-3 max-w-64 ">
                <h4 className="font-averta text-[19px] xl:text-lg whitespace-normal">
                  Volume Mixer and
                  <div className="font-avertabold">Pitch/Tempo</div>
                  Control
                </h4>
              </div>
            </div>
            <div className="w-full md:w-[47%] lg:w-[30%] flex items-start bg-white rounded-2xl p-4 lg:py-8 lg:px-6">
              <div className="box-icon-wrapper shrink-0">
                <img src="images/voiceicon1.webp" alt="" />
              </div>
              <div className="box-text pl-3 max-w-64">
                <h4 className="font-averta text-[19px] xl:text-lg">
                  Best Tabla Accompaniment for Male{" "}
                  <span className="font-avertabold">
                    Vocalists, Female Vocalists, and various instruments like
                    Violin, Sitar, Sarod, Sarangi, Flute, Santoor, and Slide
                    Guitar.
                  </span>
                </h4>
              </div>
            </div>
            <div className="w-full md:w-[47%] lg:w-[30%] flex items-start bg-white rounded-2xl p-4 lg:py-8 lg:px-6">
              <div className="box-icon-wrapper shrink-0">
                <img src="images/voiceicon3.webp" alt="" />
              </div>
              <div className="box-text pl-3 max-w-64">
                <h4 className="text-[19px] lg:text-lg font-avertabold">
                  Customizable Tanpura and Swarmandal
                </h4>
              </div>
            </div>
            <div className="w-full md:w-[47%] lg:w-[30%] flex items-start bg-white rounded-2xl p-4 lg:py-8 lg:px-6">
              <div className="box-icon-wrapper shrink-0">
                <img src="images/voiceicon5.webp" alt="" />
              </div>
              <div className="box-text pl-3 max-w-64">
                <h4 className="font-averta text-[19px] xl:text-lg">
                  Available for Android and iOS
                  <br />
                  12+ Taals for Tabla <br />
                  120+ Raags for Swarmandal and Counting
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section4 pt-10">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <h2 className="font-averta text-base lg:text-[35px] bg-[#c1ebff] px-5 lg:px-11 rounded-3xl py-2">
              Is It Real, Or Is It Saath Tabla?
            </h2>
          </div>
          <div className="text-center">
            <h3 className="text-center max-w-[700px] mx-auto text-2xl xl:text-[44px] font-avertabold mt-8 leading-tight">
              97% of people can’t tell which tabla is .
              <span className="relative">
                <span className="absolute -bottom-1">
                  <img src="images/voiceline3.webp" alt="" />
                </span>
                played by the app
              </span>
            </h3>
          </div>
          <div className="flex flex-col mt-2">
            <div className="md:flex justify-center hidden ">
              <img src="images/connection1.webp" alt="connection" />
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-between mt-9 px-0 xl:px-10 relative before:block before:absolute before:w-[141px] before:h-[155px] before:left-0 before:-top-9 before:-z-10 before:bg-dottedbg">
              <div className="w-full md:w-1/2 flex flex-col hover:scale-105 transition-all">
                <div className="flex flex-col bg-checkbg1 px-12 md:px-7 xl:px-[70px] bg-size-full bg-no-repeat bg-100%">
                  <h3 className="text-xl rounded-3xl bg-gradient-to-r from-[#00bdff] to-[#8179ff] flex -mt-5 w-[120px] py-0.5 mx-auto">
                    <span className="inline-block mx-auto bg-white rounded-3xl px-3 font-avertabold">
                      VIDEO #1
                    </span>
                  </h3>
                  <div className="flex items-center justify-center text-white my-8 md:my-5 xl:mt-10 xl:mb-12">
                  <input
        type="checkbox"
        id="Text-To-Speech1"
        name="Text-To-Speech1"
        onChange={handleCheckboxChange(setChecked1)}
        checked={checked1}
        className="hidden"
      />
      <label
        htmlFor="Text-To-Speech1"
        className="flex items-center cursor-pointer"
      >
        <span
          className={`relative w-6 h-6 mr-2 border rounded flex items-center justify-center transition-colors duration-300 ${
            checked1 ? 'bg-transparent border-white' : 'bg-white border-gray-500'
          }`}
        >
          <div
            className={`absolute transition-transform duration-300 ${
              checked1 ? 'animate-bounceIn' : 'animate-bounceOut'
            }`}
          >
            {checked1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 125"
                className="w-9 h-11 ml-3 text-white"
              >
                <defs>
                  <g id="a">
                    <path
                      fill="#ffffff"
                      d="M 92.3 19.55 Q 90.85 18.05 88.8 18 86.7 17.95 85.25 19.4 L 33.2 69.8 15.1 49.6 Q 13.7 48.05 11.65 47.95 9.55 47.85 8.05 49.25 6.45 50.6 6.35 52.7 6.25 54.75 7.65 56.3 L 29.25 80.35 Q 30.15 81.35 31.5 81.8 32.8 82.2 34.15 81.85 35.45 81.55 36.45 80.6 L 92.2 26.6 Q 93.65 25.15 93.7 23.1 93.75 21 92.3 19.55 Z"
                    />
                  </g>
                </defs>
                <g transform="matrix( 1, 0, 0, 1, 0,0)">
                  <use href="#a" />
                </g>
              </svg>
            )}
          </div>
        </span>
        CLICK HERE - If you think this video is Text-To-Speech
      </label>
                  </div>
                 
                  <div className="rounded-xl overflow-hidden">
                    <iframe
                      width="100%"
                      height="auto"
                      src="https://www.youtube.com/embed/CswqvjHmxb0?si=b4_yQE0kMkbvS0JE"
                      title="YouTube video player"
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen=""
                      className="h-32 md:h-64"
                    />
                  </div>
                </div>
                <div className="md:flex justify-center mt-5 hidden">
                  <img src="images/connection2.webp" alt="connection" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col hover:scale-105 transition-all mt-10 md:mt-0">
                <div className="">
                  <div className="flex flex-col bg-checkbg2 px-12 md:px-7 xl:px-[70px] bg-size-full bg-no-repeat bg-100%">
                    <h3 className="text-xl rounded-3xl bg-gradient-to-r from-[#00bdff] to-[#8179ff] flex -mt-5 w-[120px] py-0.5 mx-auto">
                      <span className="inline-block mx-auto bg-white rounded-3xl px-3 font-avertabold">
                        VIDEO #2
                      </span>
                    </h3>
                    <div className="flex items-center text-white my-8 md:my-5 xl:mt-10 xl:mb-12">
                    <input
        type="checkbox"
        id="Text-To-Speech2"
        name="Text-To-Speech2"
        onChange={handleCheckboxChange(setChecked2)}
        checked={checked2}
        className="hidden"
      />
      <label
        htmlFor="Text-To-Speech2"
        className="flex items-center cursor-pointer"
      >
        <span
          className={`relative w-6 h-6 mr-2 border rounded flex items-center justify-center transition-colors duration-300 ${
            checked2 ? 'bg-transparent border-white' : 'bg-white border-gray-500'
          }`}
        >
          <div
            className={`absolute transition-transform duration-300 ${
              checked2 ? 'animate-bounceIn' : 'animate-bounceOut'
            }`}
          >
            {checked2 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 125"
               className="w-9 h-11 ml-3 text-white"
              >
                <defs>
                  <g id="a">
                    <path
                      fill="#ffffff"
                      d="M 92.3 19.55 Q 90.85 18.05 88.8 18 86.7 17.95 85.25 19.4 L 33.2 69.8 15.1 49.6 Q 13.7 48.05 11.65 47.95 9.55 47.85 8.05 49.25 6.45 50.6 6.35 52.7 6.25 54.75 7.65 56.3 L 29.25 80.35 Q 30.15 81.35 31.5 81.8 32.8 82.2 34.15 81.85 35.45 81.55 36.45 80.6 L 92.2 26.6 Q 93.65 25.15 93.7 23.1 93.75 21 92.3 19.55 Z"
                    />
                  </g>
                </defs>
                <g transform="matrix( 1, 0, 0, 1, 0,0)">
                  <use href="#a" />
                </g>
              </svg>
            )}
          </div>
        </span>
        CLICK HERE - If you think this video is Text-To-Speech
      </label>
                    </div>
                    <div className="rounded-xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="auto"
                        src="https://www.youtube.com/embed/CswqvjHmxb0?si=b4_yQE0kMkbvS0JE"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                        className="h-32 md:h-64 "
                      />
                    </div>
                  </div>
                  <div className="md:flex justify-center mt-5 hidden">
                    <img src="images/connection3.webp" alt="connection" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-20 md:mt-0">
              <button className="bg-[#1fb123] text-white rounded-[30px] py-4 px-8 text-sm md:text-lg font-avertabold -mt-8 shadow-[0_20px_35px_0px_rgba(25,140,52,0.29)]">
                Cast Your Vote To Find Out The Answer ??
              </button>
            </div>
          </div>
          {checked1  && <VoteAnswerAlert setChecked={setChecked1} />}
          {checked2  && <VoteAnswerAlert setChecked={setChecked2} />}

        </div>
      </div>
      <div className="section5 bg-[#050038] rounded-3xl w-[96%] mx-auto py-8 lg:py-24 mt-8 lg:mt-28">
        <div className="container mx-auto">
          <h3 className="text-center text-white text-lg">
            Saath Tabla Allows Anyone, Regardless Of Musical Skills, To Create…
            The most realistic tabla accompaniment possible!
          </h3>
          <h4 className="text-center text-2xl lg:text-[44px] font-averta  text-white mt-5">
            Saath Tabla Is{" "}
            <span className="relative">
              <span className="absolute -bottom-1">
                <img src="images/voiceline2.webp" alt="" />
              </span>
              Perfect For:
            </span>
          </h4>
        </div>

        <div className="card-wrapper pt-10 lg:pt-24 flex gap-5 justify-center flex-wrap  mx-auto cursor-pointer">
          {cards.map((card, index) => (
            <div
              key={index}
              className={` py-5 px-5 rounded-xl overflow-hidden transition-width duration-500 h-[373px] ${
               isPlaying && playingIndex === `${index}_cards` ? "w-[525px]" : "w-[300px] md:w-[210px] "
              }`}
              style={{ backgroundColor: card.bgColor }}
              onClick={() => handlePlayPause(card.audioFile,`${index}_cards`)}
            >
              <div className="flex flex-col">
                <div className="flex flex-row items-center mb-4">
                  <img
                    src={` ${
                      isPlaying && playingIndex === `${index}_cards`
                        ? "images/pushicon2.webp"
                        : "images/playicon2.webp"
                    }`}
                    alt="play Icon"
                    style={{ cursor: "pointer" }}
                  />
                  { playingIndex !== `${index}_cards` && (
                    <img
                      src={card.waveimage}
                      alt="music Icon"
                      style={{
                        cursor: "pointer",
                        height: "45px",
                        padding: "2px",
                        marginTop: "3px",
                      }}
                      className="bg-transparent select-none"
                    />
                  )}
                 {isPlaying && playingIndex === `${index}_cards` && (
                    <div className="pl-3 flex items-center">
                      {bars.map((bar, index) => (
                        <div
                          key={index}
                          className="bar-line"
                          style={{
                            left: `${bar.left}px`,
                            animationDuration: `${bar.animationDuration}ms`,
                            height: `${bar.height}px`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <h2
                      className={`text-center text-white font-avertabold text-[19px]  mb-3 ${
                        isPlaying && playingIndex === `${index}_cards`
                          ? "w-auto whitespace-nowrap"
                          : "w-auto"
                      } `}
                    >
                      {card.title}
                    </h2>
                    <p
                      className={`text-[#d6d5fc] text-center ${
                        isPlaying && playingIndex === `${index}_cards` ? "hidden" : ""
                      }`}
                    >
                      {card.description.slice(0, 100)}....
                    </p>
                  </div>
                  <p
                    className={`text-white ${
                      isPlaying && playingIndex === `${index}_cards` ? "block" : "hidden"
                    }`}
                  >
                    {card.expandedDescription}
                  </p>
                </div>
                <img src={card.image} alt="img" className="-ml-10 -mb-10"  />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section6 py-8 md:py-14 lg:py-28">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center gap-4 font-averta">
            <h2 className="text-2xl lg:text-[44px] text-center font-avertabold">
              <span className="relative">
                <span className="absolute -bottom-1">
                  <img src="images/voiceline5.webp" alt="" />
                </span>
                Saath Tabla
              </span>{" "}
              Vs Other Apps
            </h2>
            <p className="text-xm lg:text-lg text-center max-w-[590px] mx-auto font-averta text-[#1f2024]">
              Saath Tabla is not meant to replace live tabla players. Instead,
              it provides a scalable, time-saving, and cost-efficient
              alternative.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-5 lg:gap-20 mt-8 lg:mt-24 justify-center">
            <div className="bg-[#fdeef0] w-full p-5 lg:py-14 lg:px-16 rounded-[10px] max-w-[529px] relative before:hidden md:before:block before:absolute before:w-[141px] before:h-[155px] before:-left-10 before:-top-9 before:-z-10 before:bg-dottedbg">
              <h3 className="flex justify-start text-xl lg:text-[28px] font-avertabold items-center">
                Traditional Tabla Apps
                <span className="pl-2">
                  <img src="images/smily1.webp" alt="Smily" />
                </span>
              </h3>
              <ul className="space-y-3 mt-8">
                <li className="flex items-start">
                  <span className="pt-1.5">
                    <img src="images/checklist1.webp" alt="close" />
                  </span>
                  <span className="inline-block pl-2 text-[#665658] text-lg">
                    Liner, Robotic and Emotionless
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="pt-1.5">
                    <img src="images/checklist1.webp" alt="close" />
                  </span>
                  <span className="inline-block pl-2 text-[#665658] text-lg">
                    Limited Patterns
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="pt-1.5">
                    <img src="images/checklist1.webp" alt="close" />
                  </span>
                  <span className="inline-block pl-2 text-[#665658] text-lg">
                    Static and Repetitive
                  </span>
                </li>
              </ul>
              <div className="text-center mt-10">
                <img src="images/humanimg1.webp" alt="cartoon" />
              </div>
            </div>
            <div className="bg-[#e6f6e9] w-full p-5 lg:py-14 lg:px-16 rounded-[10px] max-w-[529px] relative before:hidden md:before:block  before:absolute before:w-[141px] before:h-[155px] before:-right-10 before:-bottom-9 before:-z-10 before:bg-dottedbg">
              <h3 className="flex justify-start   text-xl lg:text-[28px]  font-avertabold items-center">
                With Saath Tabla App
                <span className="pl-2">
                  <img src="images/smily2.webp" alt="Smily" />
                </span>
              </h3>
              <ul className="space-y-4 mt-8">
                <li className="flex items-start">
                  <span className="pt-1.5">
                    <img src="images/checklist2.webp" alt="close" />
                  </span>
                  <span className="inline-block pl-2 text-[#665658] text-lg">
                    Realistic and Emotional
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="pt-1.5">
                    <img src="images/checklist2.webp" alt="close" />
                  </span>
                  <span className="inline-block pl-2 text-[#665658] text-lg">
                    Multiple Patterns and Customization
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="pt-1.5">
                    <img src="images/checklist2.webp" alt="close" />
                  </span>
                  <span className="inline-block pl-2 text-[#665658] text-lg">
                    Dynamic and Adaptive
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="shrink-0 pt-1.5">
                    <img src="images/checklist2.webp" alt="close" />
                  </span>
                  <span className="inline-block pl-2 text-[#665658] text-lg">
                    AI Accompaniment with Saath Tabla 😃
                  </span>
                </li>
              </ul>
              <div className="text-center mt-10">
                <img src="images/Bookimage.png" alt="cartoon" />
              </div>
            </div>
          </div>
        </div>
      </div>
       <TablaAccompaniment />
      <div className="section8 bg-section8-bg rounded-3xl w-[96%] mx-auto py-6 lg:py-24 mt-6 lg:mt-20">
        <div className="container mx-auto">
          <h3 className="text-center text-2xl lg:text-[44px] font-averta text-white mt-5 leading-snug">
            Saath Tabla has a Rhythm for Every Performance
          </h3>
          <h4 className="text-center text-white max-w-[670px] mx-auto mt-0 lg:mt-5 text-sm lg:text-xl">
            Whether you’re looking for traditional classical rhythms or
            something more contemporary, there is a perfect tabla loop waiting
            for you in Saath Tabla.
          </h4>
          <h5 className="text-center text-[#a09cc5] font-caveat text-xl lg:text-[38px] mt-2 lg:mt-16">
            Experience our HUMAN-sounding tabla loops first hand:
          </h5>
          <div className="card-wrapper flex flex-wrap gap-5 mt-5 justify-center">
            <Artists />
          </div>
        
        </div>
      </div>
      <div className="section9 py-8 lg:py-28  px-4">
        <h2 className="text-center text-[24px] lg:text-[44px] font-averta text-black mt-5">
          Saath Tabla Unmatched Features
        </h2>
        <p className="text-center text-[#646876] max-w-[700px] mx-auto mt-5 text-sm lg:text-xl ">
          Our emotion-based AI accompaniment engine and the other features
          listed below make SAATH TABLA the best AI tabla app you can find!{" "}
          <span className="uppercase block font-avertabold">PERIOD!</span>
        </p>
        <div className="mt-5 lg:mt-20 flex flex-wrap">
          <div className="w-full lg:w-1/2 flex justify-between py-[4%] pl-[7%] pr-[4%] bg-[#fff6df] flex-col xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2 flex justify-center lg:justify-end">
              <img src="images/revoicerimg1.webp" alt="Recovering " />
            </div>
            <div className="w-full xl:w-1/2 text-center lg:text-right mt-2">
              <h3 className="text-[#5a4b24] text-xl lg:text-[38px]  font-avertabold lg:mb-0 leading-snug">
                Real Tabla Loops by Maestros
              </h3>
              <p className="lg:text-xl text-[#5a4b24] font-poppins text-sm ">
                The most amazing collection of AI text to speech voices online!
                We feature both male, female and kid voices.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-between py-[4%] pl-[4%] pr-[7%] bg-[#ffe7eb] flex-col xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2 text-left">
              <h3 className="text-[#5e353c] text-xl lg:text-[38px] font-averta mb-0 lg:mb-3 text-center lg:text-left leading-snug">
                Customizable Tanpura with Dual Octaves
              </h3>
              <p className="lg:text-xl text-[#5a4b24] font-poppins xl:max-w-[300px] text-sm text-center lg:text-left">
                Speaking faster… slower… shouting or even whispering, no problem
                with Revoicer voice synthesizer AI engine!
              </p>
            </div>
            <div className="w-full xl:w-1/2 order-first xl:order-none flex justify-center lg:justify-start">
              <img src="images/revoicerimg2.webp" alt="Recovering " />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-between py-[4%] pl-[7%] pr-[4%] bg-[#ddfede] flex-col xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2 flex justify-center lg:justify-end">
              <img src="images/revoicerimg3.webp" alt="Recovering " />
            </div>
            <div className="w-full xl:w-1/2 lg:text-right text-center">
              <h3 className="text-[#5a4b24] text-xl lg:text-[38px] font-averta mb-0 lg:mb-3 leading-snug">
                Swarmandal with 120+ Raagas
              </h3>
              <p className="text-sm lg:text-xl text-[#5a4b24] font-poppins">
                Sometimes you need a serious tone other times you need a more
                joyful tone for your AI voice overs, with Revoicer you can
                generate the most natural sounding text to human voice!
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-between py-[4%] pl-[4%] pr-[7%] bg-[#d5fdf9] flex-col xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2 text-center lg:text-left ">
              <h3 className="text-[#2b4b48] text-xl lg:text-[38px] font-averta  mb-0 lg:mb-3 leading-snug">
                Pitch and Tempo Control
              </h3>
              <p className="lg:text-xl text-[#445957] font-poppins xl:max-w-[300px]  text-sm lg:text-left ">
                German, French, Dutch, Spanish, Portuguese, Italian, Arabic,
                Mandarin, Danish, English, Icelandic, Japanese, Korean,
                Norwegian, Polish, Romanian, Russian, Swedish, Turkish, Welsh,
                etc
              </p>
            </div>
            <div className="w-full xl:w-1/2 order-first xl:order-none  flex justify-center lg:justify-start mb-4 xl:mb-0">
              <img src="images/revoicerimg4.webp" alt="Recovering " />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-between py-[4%] pl-[7%] pr-[4%] bg-[#e6e9fb1] flex-col xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2 flex justify-center lg:justify-end ">
              <img src="images/revoicerimg5.webp" alt="Recovering " />
            </div>
            <div className="w-full xl:w-1/2 text-center lg:text-right">
              <h3 className="text-[#373a50] text-xl lg:text-[38px] font-averta  mb-0 lg:mb-3 leading-snug ">
                AI-Based Sequence Generation
              </h3>
              <p className="lg:text-xl text-sm text-[#4e5163] font-poppins text-center lg:text-right">
                Revoicer features multiple English accents, such as: american,
                uk, canadian, australian, indian, south africa and ireland
                accent. Use these accents to add an extra layer of uniqueness to
                your text to speech voice overs. UK accent can be used to convey
                sophistication, while Australian accent is great for sociability
                and adventure videos
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex xl:justify-between py-[4%] pl-[4%] pr-[7%] bg-[#fae0ff] flex-col xl:flex-row xl:items-start">
            <div className="w-full xl:w-1/2 text-left md:mt-4">
              <h3 className="text-[#4f3c53] text-lg lg:text-[38px] font-averta mb-0 lg:mb-3 text-center lg:text-left leading-snug">
                Available for Android and iOS
              </h3>
              <p className="lg:text-xl text-[#604e63] font-poppins xl:max-w-[300px] text-center lg:text-left text-sm mx-auto">
                Emphasize specific words or even whole phrases with only a few
                clicks. Add pauses of varying lengths to your voiceovers to
                build tension and to set the right tone.
              </p>
            </div>
            <div className="w-full xl:w-1/2 order-first xl:order-none flex justify-center lg:justify-start">
              <img src="images/revoicerimg6.webp" alt="Recovering " />
            </div>
          </div>
        </div>
      </div>
      <div className="section10 pt-0 pb-10 lg:py-20">
        <h2 className="max-w-[670px] mx-auto text-center text-2xl lg:text-[44px] text-black font-averta leading-normal">
          Listen to some SAMPLE VIDEOS <br />
          created with SAATH TABLA:
        </h2>
        <div className="container mx-auto">
          <div className="mt-20 relative before:absolute before:content-[''] before:h-full before:w-0 before:left-1/2 before:top-0 before:border before:border-dashed before:border-[#bcbfd2] before:hidden lg:before:block">
            <div className="flex justify-between flex-wrap lg:flex-row">
              <span className="w-6 h-6 bg-[#7688ea] rounded-full absolute -top-1 left-0 right-0 mx-auto bg-opacity-30 grid place-content-center">
                <span className="w-4 h-4 bg-[#7688ea] rounded-full inline-block" />
              </span>
              <div className="w-full lg:w-[45%]">
                <div className="w-full mx-auto mt-12 relative">
                  <Slider {...settings}>
                    <div className="item">
                      <div className="rounded-2xl p-5 lg:p-11 bg-[#7688ea]">
                        <iframe
                          width="100%"
                          height="auto"
                          className="rounded-2xl"
                          src="https://www.youtube.com/embed/ITfj9YPFco8?si=o7urQib9aZ4BK2jw"
                          title="YouTube video player"
                          frameBorder={0}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen=""
                        />
                      </div>
                      <div className="flex items-center px-11 pt-5 gap-5">
                        <div className="">
                          <img src="images/sales1axel.png" alt="Axel" />
                        </div>
                        <div className="">
                          <h3 className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                            Sales Videos
                          </h3>
                          <p className="text-[#8a93a8] text-base">Axel</p>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="rounded-2xl p-5 lg:p-11 bg-[#7688ea]">
                        <iframe
                          width="100%"
                          height="auto"
                          className="rounded-2xl"
                          src="https://www.youtube.com/embed/ITfj9YPFco8?si=o7urQib9aZ4BK2jw"
                          title="YouTube video player"
                          frameBorder={0}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen=""
                        />
                      </div>
                      <div className="flex items-center px-11 pt-5 gap-5">
                        <div className="">
                          <img src="images/sales1axel.png" alt="Axel" />
                        </div>
                        <div className="">
                          <h3 className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                            Sales Videos
                          </h3>
                          <p className="text-[#8a93a8] text-base">Axel</p>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="w-full lg:w-[45%] mt-5 lg:mt-0">
                <h3 className="text-xl lg:text-[28px] font-avertabold mb-0 lg:mb-5 text-center lg:text-left ">
                  Practice Sessions
                </h3>
                <div className="text-[#8a93a8] text-base space-y-5  mx-auto lg:text-left">
                  <p className="text-center lg:text-left">
                    Perfect accompaniment for your daily practice.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-10 lg:pt-32 relative flex-wrap lg:flex-row">
              <span className="w-6 h-6 bg-[#7cd7c6] rounded-full absolute top-32 left-0 right-0 mx-auto bg-opacity-30 grid place-content-center">
                <span className="w-4 h-4 bg-[#7cd7c6] rounded-full inline-block" />
              </span>
              <div className="w-full lg:w-[45%] text-center lg:text-right ">
                <h3 className="text-xl lg:text-[28px] font-avertabold lg:mb-5 mb-0">
                  Performance Videos
                </h3>
                <div className="text-[#8a93a8] text-base space-y-5  mx-auto">
                  <p>
                    Bring your public performances to life with realistic tabla
                    sounds.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-[45%] order-first lg:order-none">
                <Slider {...settings}>
                  <div className="item">
                    <div className="rounded-2xl p-5 lg:p-11 bg-[#7cd7c6]">
                      <iframe
                        width="100%"
                        height="auto"
                        className="rounded-xl"
                        src="https://www.youtube.com/embed/9KPneEMybS4?si=CLKKywrxyzibLElL"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                    <div className="flex items-center p-5 lg:p-11 pt-5 gap-5">
                      <div>
                        <img src="images/sales2mirai.png" alt="Mirai" />
                      </div>
                      <div>
                        <h3 className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                          Support/Help Videos
                        </h3>
                        <p className="text-[#8a93a8] text-base">
                          Grace - Australian Accent
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="rounded-2xl p-5 lg:p-11 bg-[#7cd7c6]">
                      <iframe
                        width="100%"
                        height="auto"
                        className="rounded-xl"
                        src="https://www.youtube.com/embed/9KPneEMybS4?si=CLKKywrxyzibLElL"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                    <div className="flex items-center px-11 pt-5 gap-5">
                      <div>
                        <img src="images/sales2mirai.png" alt="Mirai" />
                      </div>
                      <div>
                        <h3 className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                          Support/Help Videos
                        </h3>
                        <p className="text-[#8a93a8] text-base">
                          Grace - Australian Accent
                        </p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
            <div className="flex justify-between pt-5 lg:pt-32 relative flex-wrap lg:flex-row">
              <span className="w-6 h-6 bg-[#fedb5b] rounded-full absolute top-32 left-0 right-0 mx-auto bg-opacity-30 grid place-content-center">
                <span className="w-4 h-4 bg-[#fedb5b] rounded-full inline-block" />
              </span>
              <div className="w-full lg:w-[45%]">
                <Slider {...settings}>
                  <div className="item">
                    <div className="rounded-2xl p-5 lg:p-11 bg-[#fedb5b]">
                      <iframe
                        width="100%"
                        height="auto"
                        className="rounded-2xl"
                        src="https://www.youtube.com/embed/DvwXkFgfyck?si=R0no_aBkz3tAtHlY"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                    <div className="flex items-center p-5 lg:p-11 pt-5 gap-5">
                      <div>
                        <img src="images/sales2penelope.png" alt="Axel" />
                      </div>
                      <div>
                        <h3 className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                          School Lessons
                        </h3>
                        <p className="text-[#8a93a8] text-base">Penelope</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="rounded-2xl p-11 bg-[#fedb5b]">
                      <iframe
                        width="100%"
                        height="auto"
                        className="rounded-2xl"
                        src="https://www.youtube.com/embed/DvwXkFgfyck?si=R0no_aBkz3tAtHlY"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                    <div className="flex items-center px-11 pt-5 gap-5">
                      <div>
                        <img src="images/sales2penelope.png" alt="Axel" />
                      </div>
                      <div>
                        <h3 className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                          School Lessons
                        </h3>
                        <p className="text-[#8a93a8] text-base">Penelope</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
              <div className="w-full lg:w-[45%]">
                <h3 className="text-lg lg:text-[28px] font-avertabold mb-0 lg:mb-5 text-center lg:text-left">
                  Teaching Sessions
                </h3>
                <div className="text-[#8a93a8] text-base space-y-5  mx-auto lg:mr-auto w-full text-center lg:text-left">
                  <p>
                    Enhance your music lessons with professional accompaniment.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-5 lg:pt-32  relative flex-wrap lg:flex-wrap ">
              <span className="w-6 h-6 bg-[#fe7394] rounded-full absolute top-32 left-0 right-0 mx-auto bg-opacity-30 grid place-content-center">
                <span className="w-4 h-4 bg-[#fe7394] rounded-full inline-block" />
              </span>
              <div className="w-full lg:w-[45%] text-center lg:text-right mt-5">
                <h3 className="text-lg lg:text-[28px] font-avertabold mb-0 lg:mb-5 text-center lg:text-right">
                  Social Media Content
                </h3>
                <div className="text-[#8a93a8] text-base space-y-5  mx-auto">
                  <p>
                    Create engaging social media content with authentic tabla
                    sounds.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-[45%] order-first lg:order-none">
                <Slider {...settings}>
                  <div className="item">
                    <div className="rounded-2xl p-5 lg:p-11 bg-[#fe7394]">
                      <iframe
                        width="100%"
                        height="auto"
                        className="rounded-xl"
                        src="https://www.youtube.com/embed/PwDwZADtbGo?si=YiVwpCKTZWf7du07"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                    <div className="flex items-center px-11 pt-5 gap-5">
                      <div>
                        <img src="images/sales2mirai.png" alt="Mirai" />
                      </div>
                      <div>
                        <h3 className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                          TV Commercials
                        </h3>
                        <p className="text-[#8a93a8] text-base">
                          TV Commercials Noah
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="rounded-2xl p-5 lg:p-11 bg-[#fe7394]">
                      <iframe
                        width="100%"
                        height="auto"
                        className="rounded-xl"
                        src="https://www.youtube.com/embed/PwDwZADtbGo?si=YiVwpCKTZWf7du07"
                        title="YouTube video player"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen=""
                      />
                    </div>
                    <div className="flex items-center px-11 pt-5 gap-5">
                      <div>
                        <img src="images/sales2mirai.png" alt="Mirai" />
                      </div>
                      <div>
                        <h3 className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                          TV Commercials
                        </h3>
                        <p className="text-[#8a93a8] text-base">
                          TV Commercials Noah
                        </p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section11 mt-24">
        <div className="w-[96%] bg-section11-bg bg-no-repeat mx-auto pb-24 bg-cover p-4">
          <h3 className="text-[29px] lg:text-[56px] text-[#1f2024] py-4 lg:py-16 text-center ">
            “Robotic Tabla Sounds Are A Thing Of The Past!”
          </h3>
          <div className=" mx-auto max-w-[610px] ">
            <div className="bg-section12-bg bg-no-repeat flex md:py-24 justify-center pt-4 lg:py-16 flex-col items-center bg-100% md:bg-auto md:bg-center">
              <img
                src="images/moneybackLogo.webp"
                alt="moneybackimg"
                className="w-auto mb-8"
              />
              <h3 className="text-lg lg:text-[30px] text-center font-averta text-white ">
                Free Trial Available
              </h3>
            </div>
            <div className="mt-10">
              <h3 className="text-center text-[#1f2024] max-w-[520px] mx-auto text-base lg:text-[26px] font-avertabold">
                No Other App Is Producing Better Natural Sounding Tabla
                Accompaniment!
              </h3>
            </div>
            <div className="space-y-5 text-center max-w-[800px] text-[#646876] mt-10">
              <p>
                We’re 100% confident in its ability to do what we’re promising
                you, that we’re gonna make this an Easy No-Brainer.!
              </p>
              <p>
                <b>Free Trial Plan:</b>
                <br />
                We offer a free trial plan. Use the fully functional app and
                then decide to purchase. After purchase, cancellation and
                refunds are allowed as per the policy listed on our website.
              </p>
              <p>
                “We’re going to make this a complete RISK-FREE DECISION for you!
                If you try Saath Tabla and don’t like it, we will refund all
                your money as per our refund policy listed on our website!"
              </p>
              <p>additional material if needed</p>
            </div>
          </div>
        </div>
      </div>
      <div id="ByNow" className="section12  bg-section14-bg pt-24 pb-24">
        <ul className="flex justify-center gap-3 md:gap-5 flex-wrap lg:flex-row">
          <li className="w-2/5 md:w-auto grid place-content-center">
            <img src="images/planicon1.webp" alt="" />
          </li>
          <li className="w-2/5 md:w-auto grid place-content-center">
            <img src="images/planicon2.webp" alt="" />
          </li>
          <li className="w-2/5 md:w-auto grid place-content-center">
            <img src="images/planicon3.webp" alt="" />
          </li>
          <li className="w-2/5 md:w-auto grid place-content-center">
            <img src="images/planicon4.webp" alt="" />
          </li>
        </ul>
        <div className="w-[96%] px-4 lg:px-12 mx-auto max-w-[419px] mt-16 bg-playbg-bg bg-no-repeat border border-[#4dbbfa] rounded-[20px] bg-white ">
          <div className="py-12 px-0 relative">
            <div className="max-w-full">
              <p className="text-white font-averta text-lg bg-gradient-to-r from-[#48befa] to-[#b872ff] w-32 mx-auto text-center absolute -top-4 left-0 right-0 rounded-lg">
                Most Popular
              </p>
              <h3 className="text-3xl mt-0 lg:mt-10 font-avertabold mb-2 text-center lg:text-left">
                Saath Tabla APP
              </h3>
              <h4 className="text-[#949494] text-2xl mb-3 text-center lg:text-left line-through">
                Regular: {planDetails && planDetails?.originalPrice}
              </h4>
              <h5 className="text-[24px] font-avertabold text-center lg:text-left">
                <span className="text-[40px]">
                  {planDetails && planDetails?.discountedPrice}
                </span>{" "}
                ONE TIME PAYMENT
              </h5>
              <ul className="space-y-3 mt-10 font-averta  text-lg">
                <li className="flex gap-2 items-center">
                  <span>
                    <img src="images/checklist3.webp" alt="" />
                  </span>
                  NO MONTHLY FEES
                </li>
                <li className="flex gap-2 items-center">
                  <span>
                    <img src="images/checklist3.webp" alt="" />
                  </span>
                  100+ ragas included
                </li>
                <li className="flex gap-2 items-center">
                  <span>
                    <img src="images/checklist3.webp" alt="" />
                  </span>
                  12+ tals included
                </li>
                <li className="flex gap-2 items-center">
                  <span>
                    <img src="images/checklist3.webp" alt="" />
                  </span>
                  Volume and Panning Feature available
                </li>
                <li className="flex gap-2 items-center">
                  <span>
                    <img src="images/checklist3.webp" alt="" />
                  </span>
                  AI based loop sequencing
                </li>
                <li className="flex gap-2 items-center">
                  <span>
                    <img src="images/checklist3.webp" alt=""/>
                  </span>
                  Free Updates and Support
                </li>
              </ul>
              <div className="max-w-[330px] mx-auto flex flex-col justify-center gap-2">
                <Link
                  onClick={() => {
                    handlePayment();
                  }}
                  className="bg-[#46bffa] hover:bg-[#26a5e2] text-white flex justify-center rounded-2xl font-avertabold text-center items-center uppercase text-base md:text-xl w-full h-16 mt-10 shadow-[0px_20px_25px_0px_rgb(206_200_233_/_60%)] hover:shadow-none"
                >
                  Buy Now
                </Link>
              </div>
              {isModalOpen && (
                <ProPlanModal
                  setIsModalOpen={setIsModalOpen}
                  membershipdetails={membershipdetails}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <section className="section14 mt-[6%] ">
        <div className="container mx-auto">
          <h2 className="text-2xl text-center mb-16">
            <b>Real Results from Real Customers</b> - &nbsp;{" "}
            <span>Read Their Stories:</span>
          </h2>
          <div className="flex flex-wrap space-y-5">
            <div className="w-full md:w-1/2">
              <img src="images/testi1.jpg" alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <img src="images/testi2.jpg" alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <img src="images/testi3.jpg" alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <img src="images/testi4.jpg" alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <img src="images/testi5.jpg" alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <img src="images/testi7.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <div className="section13 bg-faq-bg py-8 lg:py-28 max-w-[94%] mx-auto bg-no-repeat relative mt-8 lg:mt-48 px-8">
        <h2 className="font-averta text-center text-2xl lg:text-[44px] text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-5 lg:mt-20 max-w-[1140px] mx-auto text-white font-averta text-[29px]">
          <div id="accordion">
            {accordionData.map((item, index) => (
              <>
                <div
                  className="border-b border-[#130d54] py-3 lg:py-7"
                  key={index}
                >
                  <h4
                    className={`accordion-toggle relative py-3 font-averta text-lg lg:text-2xl mt-5 ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleToggle(index)}
                  >
                    {item.title}
                  </h4>
                  <div
                    className="accordion-content text-base font-averta text-[#a09cc5]"
                    style={{
                      display: activeIndex === index ? "block" : "none",
                    }}
                  >
                    <p>{item.content}</p>
                  </div>
                </div>
                
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="section15 py-10 lg:py-24">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-4xl font-averta text-center w-full mb-2 ">
            Grab Access To Revoicer Today…  
          </h2>
          <h3 className="text-sm md:text-xl font-averta text-center w-full">
            No Monthly Fees – One Time Payment
          </h3>
          {/* <div className="star-rating justify-center flex flex-col">
            <div className="flex justify-center mt-3 flex-col lg:flex-row items-center gap-1">
              <div className="">
                <img src="images/people.png" alt="People " />
              </div>
              <div className="rating-wrapper flex items-center">
                <div className="">
                  <div className="star-icon flex justify-end items-center gap-1">
                    <i className="fa fa-star text-amber-400" />
                    <i className="fa fa-star text-amber-400" />
                    <i className="fa fa-star text-amber-400" />
                    <i className="fa fa-star text-amber-400" />
                    <i className="fa fa-star text-amber-400" />
                    <span className="font-averta">5.0</span>
                  </div>
                  <h3 className="font-averta text-sm">From 3,000+ reviews</h3>
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center flex-col gap-2">
            <h2
              onClick={scrollToBuyNow}
              className=" cursor-pointer w-full lg:w-[500px] mx-auto my-2 text-center bg-[#1fb6ff] text-white text-nowrap text-xl lg:text-[26px] inline-block md:px-14 px-1 rounded-[40px] py-3 font-avertabold shadow-[0px_20px_35px_0px_rgb(31_182_255_/_29%)] hover-shadow-none"
            >
              Get Revoicer Right Now!
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;