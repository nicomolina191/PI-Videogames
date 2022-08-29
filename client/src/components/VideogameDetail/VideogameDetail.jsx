import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../../Redux/actions';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import './VideogameDetail.css';

export default function VideogameDetail(props) {

    const dispatch = useDispatch();

    const detail = useSelector((state) => state.detail);
    const videogames = useSelector((state) => state.allVideogames);

    const [loadingPage, setLoadingPage] = useState(true);
    const [gameDb, setGameDb] = useState(false);

    useEffect(() => {
        const games =  async () => {
            if(isNaN(Number(props.match.params.id))) {
                setGameDb(true);
                setLoadingPage(false);
            } else {
                await dispatch(getDetail(props.match.params.id))
                setLoadingPage(false);
            }
        };
		games();
    }, [dispatch, props.match.params.id])

    console.log(detail);
    console.log(props.match.params.id);
    console.log(gameDb);

    if (gameDb) {
        let videogameDb = videogames.filter(el => el.id === props.match.params.id.toString());
        return loadingPage ? (
            <Loading/>) : (
            <div className="details">
                <div>
                    <Link to='/home'>
                        <button className='btn-home-detail'>Home</button>
                    </Link>
                </div>
                <div className='sectionDetail'>
                    <div className='videogame-details'>
                        <h1 className='videogame-title'>{videogameDb[0].name}</h1>
                        <img src={videogameDb[0].background_image} alt="videogame" />
                        <div className='videogame-description'>
                            <p>{videogameDb[0].description}</p>
                        </div>
                        <p className='videogame-genres'>Genres: {videogameDb[0].genres.join(', ').toString()}</p>
                        <p className='videogame-released'>Released: {videogameDb[0].released}</p>
                        <p className='videogame-rating'>Rating: {videogameDb[0].rating}</p>
                        <p className='videogame-platforms'>Platforms: {videogameDb[0].platforms.join(', ').toString()}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return loadingPage ? (
            <Loading/>) : (
            <div className="details">
                <div>
                    <Link to='/home'>
                        <button className='btn-home-detail'>Home</button>
                    </Link>
                </div>
                <div className='sectionDetail'>
                    <div className='videogame-details'>
                        <h1 className='videogame-title'>{detail.name}</h1>
                        <img src={detail.background_image} alt="videogame" />
                        <div className='videogame-description'>
                            <p>{detail.description}</p>
                        </div>
                        <p className='videogame-genres'>Genres: {detail.genres.join(', ').toString()}</p>
                        <p className='videogame-released'>Released: {detail.released}</p>
                        <p className='videogame-rating'>Rating: {detail.rating}</p>
                        <p className='videogame-platforms'>Platforms: {detail.platforms.join(', ').toString()}</p>
                    </div>
                </div>
            </div>
        )
    }
}