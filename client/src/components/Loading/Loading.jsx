import React from "react";
import loading from '../../assets/loading.gif';
import './Loading.css';

export default function Loading() {
    return (
        <div className="loading">
            <img className='img-loading' src={loading} alt="loading" />
        </div>
    )
}
