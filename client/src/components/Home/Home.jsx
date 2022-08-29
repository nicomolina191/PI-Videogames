import './Home.css';
import React from 'react';
// import { Component } from 'react';
import { getVideogames, getGenres, filterVideogamesByGenre, filterVideogamesByOrigin, orderVideogamesByName } from '../../Redux/actions';
// import { connect } from "react-redux";
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
                    <SearchBar handleClick={handleClick}/>
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
                <div className='allCards'>
                    <div className='cards'>
                    {
                        currentVideogames && currentVideogames.map (el => {
                            return (
                                <Link to={"/detail/" + el.id} style={{ textDecoration: 'none' }}>
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
            </div>
        )
}

// export class Home extends Component {

    // componentDidMount() {
    //     this.props.getVideogames();
    // }

    // render() {
    //     return (
    //         <div className='home'>
    //             <Link to='/videogames'>
    //                 <button>Crear Juego</button>
    //             </Link>
    //             <h1>Videojuegos del 3Teklas</h1>
    //             <button className='reload'>Volver a cargar los juegos</button>
    //             <div className='cards'>
    //             {
    //                 this.props.videogames && this.props.videogames.map (el => {
    //                     return (
    //                         <Card
    //                         name={el.name}
    //                         image={el.background_image}
    //                         genres={el.genres}/>
    //                         )
    //                     })
    //                 }
    //             </div>

    //         </div>
    //     )
    // }


// export const mapStateToProps = (state) => {
//     return {
//         videogames: state.videogames
//     }
// }

// export function mapDispatchToProps(dispatch) {
//     return {
//         getVideogames: () => dispatch(getVideogames())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);