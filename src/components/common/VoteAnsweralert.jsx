import React from "react";

function VoteAnswerAlert({ setChecked }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg lg:w-1/3 w-10/12  mx-auto md:m-10 m-3 relative ">
          <button
            aria-label="Click To Play Audio"
            type="button"
            className="absolute top-4 right-4 p-2"
            data-dismiss="modal"
            onClick={() => {
              setChecked(false);
            }}
          >
            <img src="images/crosspop.webp" className="w-2 h-2" alt="close" />
          </button>

          <div className="p-6 text-center md:my-12">
            <img src="images/check.webp" className="mx-auto mb-4" alt="check" />
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
              YES!
            </h1>
            <h2 className="text-xl md:text-3xl text-gray-600 mb-2">
              Your Answer is CORRECT!
            </h2>
            <h2 className="text-xl md:text-3xl text-gray-600 mb-4">
              <strong>BUT both videos had an AI voiceover.</strong>
            </h2>
            <p className="text-xs md:text-base text-gray-700 leading-relaxed">
              <strong>Video #1</strong> had a voiceover generated with a
              traditional text to speech software… And <strong>Video #2</strong>{" "}
              had a voiceover generated with a REVOICER. <br />
              <strong>This is how good REVOICER is!</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default VoteAnswerAlert;
