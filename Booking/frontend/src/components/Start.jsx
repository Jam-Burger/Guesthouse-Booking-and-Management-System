import React from "react";
import "../css/styles2.css";

function Start() {
  return (
    <div>
      <div className="flex flex-row w-screen h-screen">
        <div className="flex flex-col items-center justify-center w-full max-w-fit h-screen lg:py-20 lg:flex-col">
          <div className="flex justify-end lg:max-w-7xl lg:w-full">
            <div className="flex flex-col items-end w-full h-full relative lg:pr-5 ">
              <img
                src="images/logoJug_beyondSky-removebg.png"
                className="btn- backImg"
                alt="logoJug_beyondSky-removebg"
              />
            </div>
          </div>
          <div className="flex flex-col mt-20 mr-0 mb-0 z-10 max-w-fit lg:mt-0 lg:ml-14 lg:w-full ">
            <h2 className=" pr-10 pl-10 ml-5 w-full text-5xl font-medium text-end leading-snug font-serif">
              The sky is Not the Limit!
            </h2>
            <p className="pt-10 pr-10 pb-10 pl-10 ml-5 w-full text-2xl font-medium text-end leading-snug font-serif">
              <i>
                Step into the realm of unrivaled hospitality at BeyondSky, where
                excellence is our standard, and your aspirations take flight.
              </i>
            </p>
            <div className="w-full mr-0 mb-0 ml-0 relative space-y-8">
              <form action="/login" method="post">
                <div className="flex items-start justify-end mr-14">
                  <button
                    className="pt-3 pr-5 pb-4 pl-5 mr-5 text-xl font-medium text-center text-black border-black border-solid border-4 rounded-lg transition hover:bg-cyan-500 duration-300 ease"
                    type="submit"
                  >
                    Login
                  </button>
                  <button
                    className="pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-cyan-500 rounded-lg transition hover:bg-[#020403] duration-300 ease"
                    type="submit"
                  >
                    Let's Get Started!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex w-screen bg-yellow-400 min-h-fit max-w-screen h-screen max-h-screen">
          <img
            src="./images/backImage_5.jpg"
            className="coverImg"
            alt="backImage_5"
          />
        </div>
      </div>
    </div>
  );
}

export default Start;
