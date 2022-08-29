import './LandingPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import backgroundVideo from '../../assets/landing_video.mp4';

export default function LandingPage() {
    return (
        <div className='container'>
            <video autoPlay loop muted id="myVideo" width='100%' height='100%'>
                <source src={backgroundVideo} type='video/mp4'/>
            </video>
            <div className='text'>
                <h1>Welcome to Henry Videogames!</h1>
                <Link to='/home'>
                    <button className='btn'>Enter</button>
                </Link>
            </div>
        </div>
    )
}