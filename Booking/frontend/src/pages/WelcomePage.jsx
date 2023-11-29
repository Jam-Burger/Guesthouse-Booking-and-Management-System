import React from "react";
import { useNavigate } from "react-router-dom";
import AutoScroll from "../components/AutoScroll2";
import "../styles/welcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative bg-[#f8f2ed] overflow-x-hidden">
        <div className="mb-4 flex flex-col items-center justify-between ">
          <div className="relative w-full overflow-hidden bg-cover bg-no-repeat">
            <img
              src="/img/_backImg6.jpg"
              className="w-full coverImg "
              alt="background"
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-50">
              <div className="opacity-100 flex-col flex h-full items-center justify-center">
                <h1 className="opacity-100 mb-4 text-8xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-8xl">
                  beyondSky
                </h1>
                <h1 className="opacity-100 mb-4 text-6xl italic font-bold leading-none tracking-tight text-white md:text-4xl lg:text-6xl">
                  The sky is Not the Limit!
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full justify-center pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-col">
            <h1 className="mb-6 text-5xl font-bold text-center pt-10 pr-10 pb-1 pl-10 text-black cursive">
              Welcome to our Hotel!
            </h1>
            <div className="flex flex-row items-center w-full justify-center pt-5 pr-10 pb-1 pl-10 lg:pt-5 lg:flex-row">
              <hr className="h-0.5 my-4 mx-4 flex-row rounded w-48 bg-gray-200 border-0 md:my-10 dark:bg-gray-400" />
              <h2 className="mb-6 text-4xl font-light italic text-center py-10 px-6 text-black cursive">
                Where accommodation meets expection.
              </h2>
              <hr className="h-0.5 my-1 mx-4 flex-row rounded w-48 bg-gray-200 border-0 md:my-10 dark:bg-gray-400" />
            </div>
            <div className="scroll-smooth ">
              <AutoScroll />
            </div>
            <div className="masking w-full flex flex-col h-full justify-center items-center overflow-hidden bg-cover">
              <div
                style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                className="absolute flex flex-col justify-center items-center content-center  bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              >
                <div className="maskingText w-full ">
                  <h1 className="text-white text-center text-4xl font-bold cursive">
                    Want to book a Hotel?
                  </h1>
                  <button
                    type="button"
                    className="text-white text-center text-2xl mt-4 font-light inline-block rounded border-2 border-neutral-50 px-6 pb-[8px] pt-1 uppercase leading-normal transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={() => {
                      navigate("/hotels");
                    }}
                  >
                    Click Here!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
