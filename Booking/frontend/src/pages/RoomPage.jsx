import React from 'react'
import Card from '../components/Card'
import img from '../components/bgimg.png'
// import Navbar from './components/Navbar'
import Rating from '../components/Rating';
import '../components/rating.css';

export default function HotelList() {

  return (
    <>
      {/* <Navbar /> */}
      <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className="rCards">
        <Card
          photu={img}
          roomName="Executive Suite"
          price="45,000/night"
          capacity='Capacity: 2'
        />
        <Card
          photu={img}
          roomName="Deluxe Ocean View Suite"
          price="45,000/night"
          capacity='Capacity: 2'
        />
        <Card
          photu={img}
          roomName="Presidential Suite"
          price="60,000/night"
          capacity='Capacity: 4'
        />
        </div>
      </div>
      <div id="accordion-flush" data-accordion="collapse" data-active-classes="p-5 font-bold dark:bg-gray-900 text-white dark:text-white" data-inactive-classes="text-white font-[32px] px-5 dark:text-white bg-gray-900">
        <h2 id="accordion-flush-heading-1">
          <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
            <h1 className="font-medium text-white text-2xl">Reviews</h1>
            <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
          <div className="py-5 border-b border-gray-200 dark:border-gray-700">
            <Rating />
            <Rating />
            <Rating />
          </div>
        </div>
      </div>
    </>
  )
}
