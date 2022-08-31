import React from "react";
import './FilterBar.css';


export default function FilterBar({ handleFilterGenre, handleFilterOrigin, handleSort }) {
    return (
        <div className='filterBar'>
            <select onChange={(e) => handleFilterOrigin(e)} className='origin' defaultValue={'DEFAULT'}>
                <option value='DEFAULT' disabled>Filter by Origin</option>
                <option value="All Videogames">All Videogames</option>
                <option value="API">Videogames from API</option>
                <option value="DB">Videogames from DB</option>
            </select>
            <select onChange={(e) => handleSort(e)} className='sort' defaultValue={'DEFAULT'}>
            <option value='DEFAULT' disabled>Filter By Name</option>
            <option value="ASC">A → Z</option>
            <option value="DESC">Z → A</option>
            <option value="HR">High Rating</option>
            <option value="LR">Low Rating</option>
            </select>
            <select onChange={(e) => handleFilterGenre(e)} className='genre' defaultValue={'DEFAULT'}>
            <option value='DEFAULT' disabled>Filter By Genre</option>
            <option value="All Videogames">All Videogames</option>
            <option value="Action">Action</option>
            <option value="Indie">Indie</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Shooter">Shooter</option>
            <option value="Casual">Casual</option>
            <option value="Simulation">Simulation</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Arcade">Arcade</option>
            <option value="Platformer">Platformer</option>
            <option value="Racing">Racing</option>
            <option value="Massively Multiplayer">Massively Multiplayer</option>
            <option value="Sports">Sports</option>
            <option value="Fighting">Fighting</option>
            <option value="Family">Family</option>
            <option value="Board Games">Board Games</option>
            <option value="Educational">Educational</option>
            <option value="Card">Card</option>
            </select>
        </div>
    );
}