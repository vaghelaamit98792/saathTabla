import React from 'react';
import { artists } from '../data/data';
import { useAudioPlayerContext } from '../context/useAudioPlayerContext';

const Artists = () => {
 
  const { playingIndex, isPlaying, handlePlayPause } = useAudioPlayerContext();
  return (
    <>
      {artists.map((item, index) => (
        <div key={index} className="flex flex-col rounded-2xl w-[300px] lg:w-60 h-[450px]">
          <div
            className={`flex relative rounded-t-3xl ${item.backgroundColor}`}
          >
            <div className="w-full">
              <img
                src={item.image}
                alt={item.altText}
                className="-mt-5"
              />
            </div>
            <div
              className="absolute top-[40%] left-[40%]"
              onClick={() => handlePlayPause(item.audio,`${index}_${item.name}`)}
            >
              <img
                src={
                  isPlaying && playingIndex === `${index}_${item.name}`
                    ? "images/pause_over_face.webp"
                    : "images/popupicon.webp"
                }
                alt="play Icon"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="flex flex-col bg-white px-6 pt-7 pb-16 h-[200px] rounded-b-3xl">
            <div className="flex justify-between items-center">
              <p className="text-lg text-black">
                {item.name}
              </p>
              <span className="bg-[#d8e8ff] px-2.5 rounded-2xl text-[#7c6597] text-xs flex items-center leading-none h-[30px]">
                {item.accent}
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[#646876] text-[15px]">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Artists;
