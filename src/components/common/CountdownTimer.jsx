import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = () => {
    const [initialTime, setInitialTime] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        let visitTime = localStorage.getItem('visitTime');
        if (!visitTime) {
            visitTime = new Date().getTime();
            localStorage.setItem('visitTime', visitTime);
        }
        setInitialTime(parseInt(visitTime, 10));
    }, []);
    const handleHide = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 300); // Duration of the slide-up transition
    };
    if (!initialTime) return null;

    const countdownDuration = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds
    const countdownDate = initialTime + countdownDuration;
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            setIsClosing(true)
            setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return <span>Time's up!</span>;
        } else {
            // Render the countdown
            return (
                <div className={`bg-blue-100 bottom-0 text-purple-800 fixed w-full z-[999999] p-4 shadow-lg transition-height-opacity duration-400 ${
                    isClosing ? 'animate-slideUp' : ''
                }`}>
                    <div className="text-center lg:flex justify-center items-center">
                        <h1 className="font-bold text-xs sm:text-sm lg:text-lg lg:mr-4">
                            One Time Payment Expires Soon 🔥🔥 50% DISCOUNT 🔥🔥
                        </h1><button
                            className="text-sm lg:hidden text-gray-600 hover:bg-gray-200 rounded p-1 absolute right-2"
                            onClick={() => setIsVisible(false)}
                        >
                             <img src="images/crosspop.webp" className="w-2 h-2 rounded-lg" alt="close" />
                        </button>
                        <div className="flex justify-center ">
                            <div className="flex flex-col items-center mx-2">
                                <div className="flex space-x-1">
                                    <div className="bg-purple-800 text-white rounded py-[2px] px-[5px]">{String(days).padStart(2, '0')[0]}</div>
                                    <div className="bg-purple-800 text-white rounded py-[3px] px-[5px]">{String(days).padStart(2, '0')[1]}</div>
                                </div>
                                <div className="text-xs">Days</div>
                            </div>
                            <div className="flex flex-col items-center mx-2">
                                <div className="flex space-x-1">
                                    <div className="bg-purple-800 text-white rounded py-[3px] px-[5px]">{String(hours).padStart(2, '0')[0]}</div>
                                    <div className="bg-purple-800 text-white rounded py-[3px] px-[5px]">{String(hours).padStart(2, '0')[1]}</div>
                                </div>
                                <div className="text-xs">Hours</div>
                            </div>
                            <div className="flex flex-col items-center mx-2">
                                <div className="flex space-x-1">
                                    <div className="bg-purple-800 text-white rounded py-[3px] px-[5px]">{String(minutes).padStart(2, '0')[0]}</div>
                                    <div className="bg-purple-800 text-white rounded py-[3px] px-[5px]">{String(minutes).padStart(2, '0')[1]}</div>
                                </div>
                                <div className="text-xs">Minutes</div>
                            </div>
                            <div className="flex flex-col items-center mx-2">
                                <div className="flex space-x-1">
                                    <div className="bg-purple-800 text-white rounded py-[3px] px-[5px]">{String(seconds).padStart(2, '0')[0]}</div>
                                    <div className="bg-purple-800 text-white rounded py-[3px] px-[5px]">{String(seconds).padStart(2, '0')[1]}</div>
                                </div>
                                <div className="text-xs">Seconds</div>
                            </div>
                        </div>
                        <button
                            className="text-sm text-gray-600 hover:bg-gray-200 rounded p-1 hidden lg:block absolute right-2"
                            onClick={handleHide}
                        >
                             <img src="images/crosspop.webp" className="w-2 h-2 rounded-lg" alt="close" />
                        </button>
                    </div>
                </div>
            );
        }
    };

    if (!isVisible) return null;
    return <Countdown date={countdownDate} renderer={renderer} />;
};

export default CountdownTimer;
