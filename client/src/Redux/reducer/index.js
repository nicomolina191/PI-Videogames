const initialState = {
    videogames: [],
    genres: [],
    allVideogames: [],
    detail: [],
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            };
        case 'FILTER_BY_GENRE':
            const genreVideogames = state.allVideogames;
            const genreFiltered = action.payload === 'All Videogames' 
                ? genreVideogames
                : genreVideogames.filter(el => el.genres.includes(action.payload));
            return {
                ...state,
                videogames: genreFiltered
            }
        case 'FILTER_BY_ORIGIN':
            const originVideogames = state.allVideogames;
            const originFiltered = action.payload === "DB"
                ? originVideogames.filter(el => el.createdInDb)
                : originVideogames.filter(el => !el.createdInDb);
            return {
                ...state,
                videogames: action.payload === 'All Videogames' ? originVideogames : originFiltered,
            };
        case 'ORDER_BY_NAME':
            let sortedVideogames = state.allVideogames;

            if (action.payload === 'ASC') {
                sortedVideogames = sortedVideogames.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                })
            }

            if (action.payload === 'DESC') {
                sortedVideogames = sortedVideogames.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            }

            if (action.payload === 'LR') {
                sortedVideogames = sortedVideogames.sort(function(a, b) {
                    return a.rating - b.rating
                })
            }

            if (action.payload === 'HR') {
                sortedVideogames = sortedVideogames.sort(function(a, b) {
                    return b.rating - a.rating
                })
            }

            return {
                ...state,
                videogames: sortedVideogames
            }
        case 'SEARCH_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload
            }
        case 'CREATE_VIDEOGAME':
            return {
                ...state,
            }
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;