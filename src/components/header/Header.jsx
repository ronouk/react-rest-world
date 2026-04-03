import React from 'react';
import { NavLink } from 'react-router';
import { CgMenuGridO } from "react-icons/cg";
import './header.css'

const links =
    <div className='flex flex-col md:flex-row'>
        <NavLink className="navlink" to="/">Home</NavLink>
        <NavLink className="navlink" to="allcountries">Countries</NavLink>
        <NavLink className="navlink" to="wishlist">Wishlist</NavLink>
    </div>

const Header = () => {
    return (
        <div className='navbar bg-white-100 shadow-sm flex mx-auto justify-center items-center font-semibold mb-12'>
            <div className="w-11/12 md:w-10/12 flex">
                <div className="navbar-start">
                    <NavLink to="/"><span className="text-xl">World Atlas</span></NavLink>
                </div>
                <div className="navbar-end">
                    <div className='hidden md:flex'>
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>


                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="md:hidden text-3xl bg-amber-600 text-white cursor-pointer rounded">
                            <CgMenuGridO />
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-4 shadow">
                            {links}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;