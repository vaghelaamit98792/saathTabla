import React from "react";
import Slider from "react-slick";
import useAudioPlayer from "../hooks/useAudioPlayer";
import { AxelAudiolabels, ZoeyAudiolabels } from "../data/data";

function TablaAccompaniment() {
  const VoiceSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // For tablets and large screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 768, // For small tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          dots: true,
        },
      },
      {
        breakpoint: 480, // For mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const { playingIndex, isPlaying, handlePlayPause } = useAudioPlayer();
  return (
    <>
      <div className="section7 py-8 md:py-14 lg:pt-28 lg:pb-10 relative">
        <div className="relative flex">
          <div className="hidden md:block">
            <img
              src="images/bgicon2.webp"
              className="absolute top-[27%] left-[18%] topbottom"
              alt=""
            />
            <img
              src="images/bgicon3.webp"
              className="absolute top-[75%] left-[9.5%] leftright"
              alt=""
            />
            <img
              src="images/bgicon4.webp"
              alt=""
              className="absolute -top-[20%] left-[8%] leftright"
            />
            <img
              src="images/bgicon5.webp"
              className="absolute top-[3%]  left-0 topbottom"
              alt=""
            />
          </div>
          <div className="text-center mx-auto">
            <h2 className="center font-avertabold max-w-[640px] mx-auto text-base md:text-xl">
              Tabla Accompaniment Sounds Linear and Emotionless… RIGHT?
            </h2>
            <h3 className="text-2xl lg:text-[54px] text-center font-avertabold max-w-[770px] mx-auto mt-2 lg:mt-5 ">
              Not so with Saath Tabla!
            </h3>
            <p className="max-w-[750px] mx-auto text-[#646876] text-sm lg:text-lg mt-2 lg:mt-5 px-3">
              The first AI Tabla App to display real human emotions. Truly human
              emotions in every loop generated, bringing life into your practice
              and performances.
            </p>
            <h4 className="text-center font-caveat mt-5 lg:mt-12 text-xl lg:text-[38px] text-[#78797e]">
              Saath Tabla Just Got Emotional!
            </h4>
          </div>
          <div className="hidden md:block">
            <img
              src="images/bgicon6.webp"
              className="absolute top-[90%] right-[5%] topbottom"
              alt=""
            />
            <img
              src="images/bgicon10.webp"
              className="absolute top-[50%]  right-[0] topbottom"
              alt=""
            />
            <img
              src="images/bgicon8.webp"
              className="absolute top-[30%] right-[17%] leftright"
              alt=""
            />
            <img
              src="images/bgicon9.webp"
              alt=""
              className="absolute -top-[20%] right-[8%] leftright"
            />
          </div>
        </div>
        <div className="max-w-[90%] mx-auto pt-10 lg:pt-24 overflow-hidden">
          <Slider {...VoiceSettings}>
            <div className="px-2 py-16">
              <div className="">
                <div className="w-full bg-[#f7f1fd] py-10 !px-5 mx-2 rounded-3xl">
                  <div className="flex justify-center -mt-[90px]">
                    <span className="inline-block ">
                      <img
                        src="images/kayla.png"
                        alt="Kayla "
                        className="!w-auto h-auto"
                      />
                    </span>
                  </div>
                  <h2 className="font-avertabold text-[26px] text-[#1f2024] text-center">
                    Kayla
                    <span className="text-base text-[#8a78f0] font-averta">
                      Female
                    </span>
                  </h2>
                  <div className="mt-3">
                    <img
                      src="images/star.webp"
                      className="!w-auto h-auto mx-auto"
                      alt=""
                    />
                  </div>
                  <div className="flex gap-3 flex-wrap mt-8 justify-center">
                    {AxelAudiolabels.map(({ label, path }, index) => (
                      <div className="w-[47%] md:w-auto" key={label}>
                        <div
                          className="flex items-center py-1 pl-1 pr-2 xl:p-3.5 bg-white rounded-xl gap-1 hover:bg-gradient-to-r hover:from-[#1fb4ff3b] hover:to-[#b26ff63b] transition duration-300 ease-in-out"
                          onClick={() =>
                            handlePlayPause(path, `${index}_Kayla`)
                          }
                        >
                          <div className="flex items-center rounded-[8px]">
                            <div
                              className="w-6 h-6 rounded-[50%] bg-[#8a78ef] flex justify-center items-center"
                              title=""
                            >
                              <div
                                aria-label="Click to play text to voice audio"
                                className="grid place-content-center"
                              >
                                <img
                                  src={
                                    isPlaying &&
                                      playingIndex === `${index}_Kayla`
                                      ? "images/pause.png"
                                      : "images/play.png"
                                  }
                                  alt="Play"
                                  className="w-2 h-2"
                                />
                              </div>
                            </div>
                          </div>
                          <span className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                            {label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 py-16">
              <div className="w-full bg-[#e8f5fd] py-10 px-5 mx-2 rounded-3xl">
                <div className="">
                  <div className="flex justify-center">
                    <span className="inline-block -mt-[90px]">
                      <img
                        src="images/axel.png"
                        alt="Kayla "
                        className="!w-auto h-auto"
                      />
                    </span>
                  </div>
                  <h2 className="font-avertabold text-[26px] text-[#1f2024] text-center">
                    Axel
                    <span className="text-base text-[#33b4f3] font-averta">
                      Male
                    </span>
                  </h2>
                  <div className="mt-3">
                    <img
                      src="images/star.webp"
                      className="!w-auto h-auto mx-auto"
                      alt=""
                    />
                  </div>
                  <div className="flex gap-3 flex-wrap mt-8 justify-center">
                    {AxelAudiolabels.map(({ label, path }, index) => (
                      <div className="w-[47%] md:w-auto" key={label}>
                        <div
                          className="flex items-center py-1 pl-1 pr-2 xl:p-3.5 bg-white rounded-xl gap-1 hover:bg-gradient-to-r hover:from-[#1fb4ff3b] hover:to-[#b26ff63b] transition duration-300 ease-in-out"
                          onClick={() => handlePlayPause(path, `${index}_Axel`)}
                        >
                          <div className="flex items-center rounded-[8px]">
                            <div
                              className="w-6 h-6 rounded-[50%] bg-[#8a78ef] flex justify-center items-center"
                              title=""
                            >
                              <div
                                aria-label="Click to play text to voice audio"
                                className="grid place-content-center"
                              >
                                <img
                                  src={
                                    isPlaying &&
                                      playingIndex === `${index}_Axel`
                                      ? "images/pause.png"
                                      : "images/play.png"
                                  }
                                  alt="Play"
                                  className="w-2 h-2"
                                />
                              </div>
                            </div>
                          </div>
                          <span className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                            {label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 py-16">
              <div className="w-full bg-[#e4fae5] py-10 px-5 mx-2 rounded-3xl">
                <div className="">
                  <div className="flex justify-center">
                    <span className="inline-block -mt-[90px]">
                      <img
                        src="images/zoey.png"
                        alt="Kayla "
                        className="!w-auto h-auto"
                      />
                    </span>
                  </div>
                  <h2 className="font-avertabold text-[26px] text-[#1f2024] text-center">
                    Zoey
                    <span className="text-base text-[#34ac38] font-averta">
                      Female
                    </span>
                  </h2>
                  <div className="mt-3">
                    <img
                      src="images/star.webp"
                      className="!w-auto h-auto mx-auto"
                      alt=""
                    />
                  </div>
                  <div className="flex gap-3 flex-wrap mt-8 justify-center">
                    {ZoeyAudiolabels.map(({ label, path }, index) => (
                      <div className="w-[47%] md:w-auto" key={label}>
                        <div
                          className="flex items-center py-1 pl-1 pr-2 xl:p-3.5 bg-white rounded-xl gap-1 hover:bg-gradient-to-r hover:from-[#1fb4ff3b] hover:to-[#b26ff63b] transition duration-300 ease-in-out"
                          onClick={() => handlePlayPause(path, `${index}Zoey`)}
                        >
                          <div className="flex items-center rounded-[8px]">
                            <div
                              className="w-6 h-6 rounded-[50%] bg-[#8a78ef] flex justify-center items-center"
                              title=""
                            >
                              <div
                                aria-label="Click to play text to voice audio"
                                className="grid place-content-center"
                              >
                                <img
                                  src={
                                    isPlaying && playingIndex === `${index}Zoey`
                                      ? "images/pause.png"
                                      : "images/play.png"
                                  }
                                  alt="Play"
                                  className="w-2 h-2"
                                />
                              </div>
                            </div>
                          </div>
                          <span className="font-avertabold text-[#1f2024] text-sm lg:text-base">
                            {label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="px-2 py-16">
              <div className="w-full bg-[#fdf1eb] py-10 px-5 mx-2 rounded-3xl">
                <div className="">
                  <div className="flex justify-center">
                    <span className="inline-block -mt-[90px]">
                      <img
                        src="images/andrew.png"
                        alt="Kayla "
                        className="!w-auto h-auto"
                      />
                    </span>
                  </div>
                  <h2 className="font-avertabold text-[26px] text-[#1f2024] text-center">
                    Andrew
                    <span className="text-base text-[#f38d5b] font-averta">
                      Male
                    </span>
                  </h2>
                  <div className="mt-3">
                    <img
                      src="images/star.webp"
                      className="!w-auto h-auto mx-auto"
                      alt=""
                    />
                  </div>
                  <div className="flex gap-3 flex-wrap mt-8 justify-center">
      {Audiolabels.map(({ label, path },index) => (
        <div className="w-[47%] md:w-auto" key={label}>
          <div
            className="flex items-center py-1 pl-1 pr-2 xl:p-3.5 bg-white rounded-xl gap-1 hover:bg-gradient-to-r hover:from-[#1fb4ff3b] hover:to-[#b26ff63b] transition duration-300 ease-in-out"
            onClick={() => handlePlayPause(path,`${index}_Andrew`)}
          >
            <div className="flex items-center rounded-[8px]">
              <div
                className="w-6 h-6 rounded-[50%] bg-[#8a78ef] flex justify-center items-center"
                title=""
              >
                <div aria-label="Click to play text to voice audio" className="grid place-content-center">
                  <img src={
                              isPlaying && playingIndex === `${index}_Andrew`
                                ? "images/pause.png"
                                : "images/play.png"
                            } alt="Play" className="w-2 h-2" />
                </div>
              </div>
            </div>
            <span className="font-avertabold text-[#1f2024] text-sm lg:text-base">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
                </div>
              </div>
            </div> */}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default TablaAccompaniment;

// import React from 'react'
// import Slider from 'react-slick'

// function TablaAccompaniment() {
//     const VoiceSettings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 2,
//         slidesToScroll: 2,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         responsive: [
//           {
//             breakpoint: 1024, // For tablets and large screens
//             settings: {
//               slidesToShow: 2,
//               slidesToScroll: 2,
//               infinite: true,
//               dots: true,
//               autoplay: true,

//             }
//           },
//           {
//             breakpoint: 768, // For small tablets
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               infinite: true,
//               autoplay: true,
//               dots: true,
//             }
//           },
//           {
//             breakpoint: 480, // For mobile devices
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               autoplay: true,
//               infinite: true,
//               dots: true
//             }
//           }
//         ]
//       };
//   return (
//     <>
//         <div className="section7 py-8 md:py-14 lg:pt-28 lg:pb-10 relative">
//         <div className="relative flex">
//           <div className="hidden md:block">
//             <img
//               src="images/bgicon2.webp"
//               className="absolute top-[27%] left-[18%] topbottom"
//               alt=""
//             />
//             <img
//               src="images/bgicon3.webp"
//               className="absolute top-[75%] left-[9.5%] leftright"
//               alt=""
//             />
//             <img
//               src="images/bgicon4.webp"
//               alt=""
//               className="absolute -top-[20%] left-[8%] leftright"
//             />
//             <img
//               src="images/bgicon5.webp"
//               className="absolute top-[3%]  left-0 topbottom"
//               alt=""
//             />
//           </div>
//           <div className="text-center mx-auto">
//             <h2 className="center font-avertabold max-w-[640px] mx-auto text-base md:text-xl">
//               Tabla Accompaniment Sounds Linear and Emotionless… RIGHT?
//             </h2>
//             <h3 className="text-2xl lg:text-[54px] text-center font-avertabold max-w-[770px] mx-auto mt-2 lg:mt-5 ">
//               Not so with Saath Tabla!
//             </h3>
//             <p className="max-w-[750px] mx-auto text-[#646876] text-sm lg:text-lg mt-2 lg:mt-5 px-3">
//               The first AI Tabla App to display real human emotions. Truly human
//               emotions in every loop generated, bringing life into your practice
//               and performances.
//             </p>
//             <h4 className="text-center font-caveat mt-5 lg:mt-12 text-xl lg:text-[38px] text-[#78797e]">
//               Saath Tabla Just Got Emotional!
//             </h4>
//           </div>
//           <div className="hidden md:block">
//             <img
//               src="images/bgicon6.webp"
//               className="absolute top-[90%] right-[5%] topbottom"
//               alt=""
//             />
//             <img
//               src="images/bgicon10.webp"
//               className="absolute top-[50%]  right-[0] topbottom"
//               alt=""
//             />
//             <img
//               src="images/bgicon8.webp"
//               className="absolute top-[30%] right-[17%] leftright"
//               alt=""
//             />
//             <img
//               src="images/bgicon9.webp"
//               alt=""
//               className="absolute -top-[20%] right-[8%] leftright"
//             />
//           </div>
//         </div>
//         <div className="max-w-[90%] mx-auto pt-10 lg:pt-24 overflow-hidden">
//           <Slider {...VoiceSettings}>
//             <div className="px-2 py-16">
//               <div className="">
//                 <div className="w-full bg-[#f7f1fd] py-10 !px-5 mx-2 rounded-3xl">
//                   <div className="flex justify-center -mt-[90px]">
//                     <span className="inline-block ">
//                       <img
//                         src="images/kayla.png"
//                         alt="Kayla "
//                         className="!w-auto h-auto"
//                       />
//                     </span>
//                   </div>
//                   <h2 className="font-avertabold text-[26px] text-[#1f2024] text-center">
//                     Kayla
//                     <span className="text-base text-[#8a78f0] font-averta">
//                       Female
//                     </span>
//                   </h2>
//                   <div className="mt-3">
//                     <img
//                       src="images/star.webp"
//                       className="!w-auto h-auto mx-auto"
//                       alt=""
//                     />
//                   </div>
//                   <div className="flex gap-3 flex-wrap mt-8 justify-center">
//                     {[
//                       "Normal",
//                       "Friendly",
//                       "Hopeful",
//                       "Unfriendly",
//                       "Cheerful",
//                       "Sad",
//                       "Excited",
//                       "Angry",
//                       "Terrified",
//                       "Shouting",
//                       "Whispering",
//                     ].map((label) => (
//                       <div className="w-[47%] md:w-auto" key={label}>
//                         <div
//                           className="flex items-center py-1 pl-1 pr-2 xl:p-3.5 bg-white rounded-xl gap-1 hover:bg-gradient-to-r hover:from-[#1fb4ff3b] hover:to-[#b26ff63b] transition duration-300 ease-in-out"
//                           data-src="kayla-normal.mp3"
//                         >
//                           <div className="flex items-center rounded-[8px]">
//                             <div
//                               className="w-6 h-6 rounded-[50%] bg-[#8a78ef] flex justify-center items-center"
//                               title=""
//                             >
//                               <div
//                                 aria-label="Click to play text to voice audio"
//                                 className="grid place-content-center"
//                               >
//                                 <img
//                                   src="images/play-icon.png"
//                                   alt="Play"
//                                   className="w-2 h-2"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <span className="font-avertabold text-[#1f2024] text-sm lg:text-base">
//                             {label}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="px-2 py-16">
//               <div className="w-full bg-[#e8f5fd] py-10 px-5 mx-2 rounded-3xl">
//                 <div className="">
//                   <div className="flex justify-center">
//                     <span className="inline-block -mt-[90px]">
//                       <img
//                         src="images/axel.png"
//                         alt="Kayla "
//                         className="!w-auto h-auto"
//                       />
//                     </span>
//                   </div>
//                   <h2 className="font-avertabold text-[26px] text-[#1f2024] text-center">
//                     Axel
//                     <span className="text-base text-[#33b4f3] font-averta">
//                       Male
//                     </span>
//                   </h2>
//                   <div className="mt-3">
//                     <img
//                       src="images/star.webp"
//                       className="!w-auto h-auto mx-auto"
//                       alt=""

//                     />
//                   </div>
//                   <div className="flex gap-3 flex-wrap mt-8 justify-center">
//                     {[
//                       "Normal",
//                       "Friendly",
//                       "Hopeful",
//                       "Unfriendly",
//                       "Cheerful",
//                       "Sad",
//                       "Excited",
//                       "Angry",
//                       "Terrified",
//                       "Shouting",
//                       "Whispering",
//                     ].map((label) => (
//                       <div className="w-[47%] md:w-auto" key={label}>
//                         <div
//                           className="flex items-center py-1 pl-1 pr-2 xl:p-3.5 bg-white rounded-xl gap-1 hover:bg-gradient-to-r hover:from-[#1fb4ff3b] hover:to-[#b26ff63b] transition duration-300 ease-in-out"
//                           data-src="kayla-normal.mp3"
//                         >
//                           <div className="flex items-center rounded-[8px]">
//                             <div
//                               className="w-6 h-6 rounded-[50%] bg-[#8a78ef] flex justify-center items-center"
//                               title=""
//                             >
//                               <div
//                                 aria-label="Click to play text to voice audio"
//                                 className="grid place-content-center"
//                               >
//                                 <img
//                                   src="images/play-icon.png"
//                                   alt="Play"
//                                   className="w-2 h-2"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <span className="font-avertabold text-[#1f2024] text-sm lg:text-base">
//                             {label}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="px-2 py-16">
//               <div className="w-full bg-[#e4fae5] py-10 px-5 mx-2 rounded-3xl">
//                 <div className="">
//                   <div className="flex justify-center">
//                     <span className="inline-block -mt-[90px]">
//                       <img
//                         src="images/zoey.png"
//                         alt="Kayla "
//                         className="!w-auto h-auto"
//                       />
//                     </span>
//                   </div>
//                   <h2 className="font-avertabold text-[26px] text-[#1f2024] text-center">
//                     Zoey
//                     <span className="text-base text-[#34ac38] font-averta">
//                       Female
//                     </span>
//                   </h2>
//                   <div className="mt-3">
//                     <img
//                       src="images/star.webp"
//                       className="!w-auto h-auto mx-auto"
//                       alt=""

//                     />
//                   </div>
//                   <div className="flex gap-3 flex-wrap mt-8 justify-center">
//                     {[
//                       "Normal",
//                       "Friendly",
//                       "Hopeful",
//                       "Unfriendly",
//                       "Cheerful",
//                       "Sad",
//                       "Excited",
//                       "Angry",
//                       "Terrified",
//                       "Shouting",
//                       "Whispering",
//                     ].map((label) => (
//                       <div className="w-[47%] md:w-auto" key={label}>
//                         <div
//                           className="flex items-center py-1 pl-1 pr-2 xl:p-3.5 bg-white rounded-xl gap-1 hover:bg-gradient-to-r hover:from-[#1fb4ff3b] hover:to-[#b26ff63b] transition duration-300 ease-in-out"
//                           data-src="kayla-normal.mp3"
//                         >
//                           <div className="flex items-center rounded-[8px]">
//                             <div
//                               className="w-6 h-6 rounded-[50%] bg-[#8a78ef] flex justify-center items-center"
//                               title=""
//                             >
//                               <div
//                                 aria-label="Click to play text to voice audio"
//                                 className="grid place-content-center"
//                               >
//                                 <img
//                                   src="images/play-icon.png"
//                                   alt="Play"
//                                   className="w-2 h-2"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <span className="font-avertabold text-[#1f2024] text-sm lg:text-base">
//                             {label}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="px-2 py-16">
//               <div className="w-full bg-[#fdf1eb] py-10 px-5 mx-2 rounded-3xl">
//                 <div className="">
//                   <div className="flex justify-center">
//                     <span className="inline-block -mt-[90px]">
//                       <img
//                         src="images/andrew.png"
//                         alt="Kayla "
//                         className="!w-auto h-auto"
//                       />
//                     </span>
//                   </div>
//                   <h2 className="font-avertabold text-[26px] text-[#1f2024] text-center">
//                     Andrew
//                     <span className="text-base text-[#f38d5b] font-averta">
//                       Male
//                     </span>
//                   </h2>
//                   <div className="mt-3">
//                     <img
//                       src="images/star.webp"
//                       className="!w-auto h-auto mx-auto"
//                       alt=""
//                     />
//                   </div>
//                   <div className="flex gap-3 flex-wrap mt-8 justify-center">
//                     {[
//                       "Normal",
//                       "Friendly",
//                       "Hopeful",
//                       "Unfriendly",
//                       "Cheerful",
//                       "Sad",
//                       "Excited",
//                       "Angry",
//                       "Terrified",
//                       "Shouting",
//                       "Whispering",
//                     ].map((label) => (
//                       <div className="w-[47%] md:w-auto" key={label}>
//                         <div
//                           className="flex items-center py-1 pl-1 pr-2 xl:p-3.5 bg-white rounded-xl gap-1 hover:bg-gradient-to-r hover:from-[#1fb4ff3b] hover:to-[#b26ff63b] transition duration-300 ease-in-out"
//                           data-src="kayla-normal.mp3"
//                         >
//                           <div className="flex items-center rounded-[8px]">
//                             <div
//                               className="w-6 h-6 rounded-[50%] bg-[#8a78ef] flex justify-center items-center"
//                               title=""
//                             >
//                               <div
//                                 aria-label="Click to play text to voice audio"
//                                 className="grid place-content-center"
//                               >
//                                 <img
//                                   src="images/play-icon.png"
//                                   alt="Play"
//                                   className="w-2 h-2"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <span className="font-avertabold text-[#1f2024] text-sm lg:text-base">
//                             {label}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Slider>
//         </div>
//        </div>
//     </>
//   )
// }

// export default TablaAccompaniment
