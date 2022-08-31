import './Card.css';
import React from "react";

export default function Card(props) {

    function genreStyle() {
        if (isNaN(props.id)) {
            let genres = props.genres.map(el => el.name).join(', ').toString();
            return genres;
        } else {
            let genres = props.genres.join(', ').toString();
            return genres;
        }
    }

    return (
        <div className="card" key={props.id}>
            <img className='cardImg' src={props.image} alt="videogame img" width="300px" height="250px" />
            <h3 className="cardTitle">{props.name}</h3>
            <h5 className="cardGenres">{genreStyle()}</h5>
        </div>
    );
}
