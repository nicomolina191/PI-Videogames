import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchVideogames } from '../../Redux/actions';
import { Link } from 'react-router-dom';
import './SearchBar.css';


export default function SearchBar({ handleClick, setCurrentPage }) {

    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchVideogames(name));
        setCurrentPage(1);
    }

    return (
        <div className='searchBar'>
            <div>
                <Link className='link-landing' to='/' style={{ textDecoration: 'none' }}>
                    Henry Videogames By Nicolás Molina
                </Link>
            </div>
            <div>
                <button className='btn-reload' onClick={e => {handleClick(e)}}>Reload Videogames</button>
            </div>
            <div>
                <Link to='/create'>
                    <button className='btn-create'>Create Videogame</button>
                </Link>
            </div>
            <div className='search'>
                <input type="text" placeholder='Search Videogame' onChange={(e) => handleInputChange(e)} />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
            </div>
        </div>
    )
}