import './LandingPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/landing-gif.gif';

export default function LandingPage() {
    return (
        <div className='container'>
            <img src={background} alt="" className='landing-img' />
            <div className='text'>
                <h1>Welcome to Henry Videogames!</h1>
                <Link to='/home'>
                    <button className='btn'>Enter</button>
                </Link>
            </div>
        </div>
    )
}
