import './Card.css';
import React from "react";

export default function Card(props) {

    let genreStyle = props.genres.map(el => el.name).join(', ').toString();

    return (
        <div className="card" key={props.id}>
            <img className='cardImg' src={props.image} alt="videogame img" width="300px" height="250px" />
            <h3 className="cardTitle">{props.name}</h3>
            <h5 className="cardGenres">{genreStyle}</h5>
        </div>
    );
}
