import React from 'react';
import Rating2 from "./Rating2";
import '../styles/rating.css';

function RatingsComp() {
    return (
        <div id="accordion-flush" data-accordion="collapse" data-active-classes="p-5 bg-dark font-bold text-white" data-inactive-classes="text-white px-5 text-white bg-teal-500">
            <h2 id="accordion-flush-heading-1">
                <button type="button" className="flex justify-items-start w-100 py-4 font-medium text-right text-gray-500 border-b border-gray-200 border-gray-700 text-gray-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                    <h1 className="text-white display-6 py-0">Reviews</h1>
                </button>
            </h2>
            <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
                <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <Rating2 />
                    <Rating2 />
                    <Rating2 />
                </div>
            </div>
        </div>
    );
}

export default RatingsComp;