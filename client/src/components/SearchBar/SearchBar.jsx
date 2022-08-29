import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchVideogames } from '../../Redux/actions';
import { Link } from 'react-router-dom';
import './SearchBar.css';


export default function SearchBar({ handleClick }) {

    const dispatch = useDispatch();

    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchVideogames(name));
    }

    return (
        <div className='searchBar'>
            <div>
                <Link to='/'>
                    <a className='link-landing'>Henry Videogames</a>
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
                <input type="text" placeholder='Buscar Videojuego' onChange={(e) => handleInputChange(e)} />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
        </div>
    )
}