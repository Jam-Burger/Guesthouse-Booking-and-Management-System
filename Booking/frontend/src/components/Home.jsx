import React from 'react';

function Home(){
    return (
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <div class="text-center sm:text-left">
                <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl"> Welcome Laude!!</h1>
                <p class="mt-1.5 text-sm text-gray-500"> Let's Go!</p>
                <form action="/success" method="post">
                    <button name="butnS" type="submit"
                        class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-cyan-500 duration-300 rounded hover:bg-black focus:outline-none focus:ring">
                        Go Back to Login
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default Home;