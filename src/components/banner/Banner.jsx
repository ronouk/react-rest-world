import React from 'react';
import { NavLink } from 'react-router';

const Banner = () => {
    return (
        <div className='mb-12'>
            <div className={`h-120 rounded-2xl bg-no-repeat bg-cover bg-center w-full`} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${'https://i.imgur.com/JHUmTCb.png'})` }}>

                <div className='h-full flex justify-center items-center'>
                    <NavLink className='btn' to='https://www.worldometers.info/world-population/' target='_blank'>Watch population map</NavLink>
                </div>

            </div>
        </div>
    );
};

export default Banner;