import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PulseTimer() {
  const [timeLeft, setTimeLeft] = useState(8 * 60 * 60); // 8 hours in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0)); // Prevent negative values
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Clean up interval
  }, [isRunning, timeLeft]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) setIsRunning(true);
  };

  const handleStop = () => {
    if (isRunning) setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(8 * 60 * 60); // Reset to initial value
  };

  const totalDuration = 8 * 60 * 60; // Total duration in seconds
  const progress = 1 - timeLeft / totalDuration; // Progress as a fraction
  const circleRadius = 90; // Radius of the SVG circle
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference * (1 - progress);

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="flex flex-col items-center justify-between min-h-screen p-4">
        <div className="relative z-10 text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">SRM Institute of Science and Technology</h1>
          <h2 className="text-2xl mb-6 text-white">Presents</h2>
          <h2 className="text-5xl mb-6 text-white uppercase font-medium font-audiowide tracking-wider">PULSE</h2>
          <img
            src="https://imgur.com/6sf3JKI.png"
            alt="CloudCon x Pulse Logo"
            className="mx-auto -mt-[100px] w-full -mb-[150px] max-w-[500px] h-auto"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center my-8">
          <div className="relative w-64 h-64">
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="100"
                cy="100"
                r={circleRadius}
                stroke="#ccc"
                strokeWidth="8"
                fill="none"
                className="opacity-30"
              />
              <motion.circle
                cx="100"
                cy="100"
                r={circleRadius}
                stroke="#00ff88"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-4xl font-bold text-white"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                }}
              >
                {formatTime(timeLeft)}
              </motion.div>
            </div>
          </div>

          <div className="mt-8 flex space-x-10">
            <button
              onClick={handleStart}
              className={`${
                isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              } text-white font-bold py-2 px-4 text-[19px] rounded transition duration-300 uppercase`}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              onClick={handleStop}
              className={`${
                !isRunning ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
              } text-white font-bold py-2 px-4 text-[19px] rounded transition duration-300 uppercase`}
            >
              Stop
            </button>
            <button
              onClick={handleReset}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 text-[19px] rounded transition duration-300 uppercase"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-8 mb-4 text-lg text-white opacity-75">
          Hackathon ends in{' '}
          <motion.span
            className="font-bold"
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
          >
            {formatTime(timeLeft)}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
