import React from 'react';

const Footer = () => {

    const options = { day: "numeric", month: "long", year: "numeric" }
    const dateToday = new Date().toLocaleDateString("en-BD", options)

    //another method: to get all individually, instead of a specific format

    // const date = new Date();
    // const day = date.getDate();
    // const month = date.toLocaleDateString('en-GB', { month: 'long' });
    // const year = date.getFullYear();

    // const customDate = `${day} ${month}, ${year}`;

    return (
        <div className='h-12 mt-12 text-white bg-gray-700 shadow-[0px_-10px_15px_-3px_rgba(0,0,0,0.1)] py-6 w-full flex justify-center items-center'>
            <div className=''>
                &copy; World Atlas | {dateToday}
            </div>
        </div>
    );
};

export default Footer;