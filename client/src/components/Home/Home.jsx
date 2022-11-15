import './Home.css';
import React from 'react';
import { getVideogames, getGenres, filterVideogamesByGenre, filterVideogamesByOrigin, orderVideogamesByName, filterReview } from '../../Redux/actions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card.jsx';
import Paginado from '../Paginado/Paginado.jsx';
import FilterBar from '../FilterBar/FilterBar.jsx';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';


export default function Home() {

    const dispatch = useDispatch();

    let allVideogames = useSelector((state) => state.videogames)

    const [loadingPage, setLoadingPage] = useState(true);
    const [orden, setOrden] = useState('');

// PAGINADO

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage] = useState(15);
    const indexLastVideogame = currentPage * videogamesPerPage; // 15
    const indexFirstVideogame = indexLastVideogame - videogamesPerPage; // 0
    const currentVideogames = allVideogames.slice(indexFirstVideogame, indexLastVideogame);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        const games =  async () =>{
			await dispatch(getVideogames())
			setLoadingPage(false)
		};
		games();
    }, [dispatch])

    useEffect(() =>{
        dispatch(getGenres());
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

// FILTERS AND ORDERS

    function handleFilterGenre(e) {
        setCurrentPage(1);
        dispatch(filterVideogamesByGenre(e.target.value));
    }

    function handleFilterOrigin(e) {
        setCurrentPage(1);
        dispatch(filterVideogamesByOrigin(e.target.value));
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderVideogamesByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

        return loadingPage ? (
        <Loading/>) : (
            <div className='home'>
                <div>
                    <SearchBar handleClick={handleClick} setCurrentPage={setCurrentPage}/>
                </div>
                <div>
                    <FilterBar 
                    handleFilterGenre={handleFilterGenre}
                    handleFilterOrigin={handleFilterOrigin}
                    handleSort={handleSort}
                    />
                </div>
                <div className='paginado'>
                    <Paginado
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                    />
                </div>
                    <div className='cards'>
                    {
                        currentVideogames && currentVideogames.map (el => {
                            return (
                                <Link className='link-card' to={"/detail/" + el.id} key={el.id}>
                                    <Card
                                    key={el.id}
                                    id={el.id}
                                    name={el.name}
                                    image={el.background_image}
                                    genres={el.genres}/>
                                </Link>
                                )
                            })
                        }
                    </div>
                </div>
        )
}
