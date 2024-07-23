import React from "react";

function HeroBanner() {
  return (
    <>
        <div className="section-1 py-7 lg:py-14 bg-hero-bg">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <h1 className="px-3 lg:px-5 py-1 rounded-3xl border border-[#8680f9] inline-block text-base lg:text-xl font-averta text-center">
              REAL SOUNDING TABLA&nbsp;MOBILE&nbsp;APP
            </h1>
          </div>
          <div className="mt-2.5 lg:mt-8 font-poppins flex justify-center">
            <h2 className="text-center max-w-[1200px] text-2xl lg:text-[46px] leading-tight font-medium text-[#151b2b]">
              Say Goodbye to Liner and
              <span className="font-avertabold leading-tight relative">
                <span className="absolute bottom-0">
                  <img src="images/voiceline2.webp" alt="" />
                </span>{" "}
                Robotic{" "}
              </span>
              Tabla App!
              <span className="block leading-tight">
                Saath Tabla Will Amaze You:
              </span>
            </h2>
          </div>
          <div className="player mx-auto flex justify-center relative">
            <div className="absolute left-20 -top-10 hidden lg:block">
              <p className="font-caveat text-xl lg:text-2xl rotate-[0deg] lg:-rotate-[10deg] lg:absolute static w-[160px]">
                This Tabla is 100% palyed on Saath Tabla App
              </p>
              <div className="svg-wrapper absolute top-28 left-24 hidden lg:block">
                <svg
                  width={74}
                  height={45}
                  viewBox="0 0 74 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 0.5C3.33333 15.5 20.9 41.6 72.5 26"
                    stroke="black"
                  />
                  <path d="M54.5 17L72.5 26L63 44.5" stroke="black" />
                </svg>
                
              </div>
            </div>
            <div
              id="autoplayer"
              className="mt-2 lg:mt-4 w-full lg:w-[849px] h-auto lg:h-[463px] bg-white shadow-black rounded-3xl lg:rounded-xl overflow-hidden"
            >
              <iframe
              title="1"
                src="https://player.vimeo.com/video/894034584?autoplay=1&muted=0"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen=""
                className="h-full w-full"
              />
              <p>
                <a href="https://vimeo.com/524933864">Vimeo | Video Power</a>{" "}
                from
                <a href="https://vimeo.com/staff">Vimeo</a> on
                <a href="https://vimeo.com">Vimeo</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroBanner;
