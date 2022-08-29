import axios from 'axios';

export function getVideogames() {
    return async function(dispatch) {
        var json = await axios.get('/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data,
        })
    }
}

export function getGenres() {
    return async function(dispatch) {
        var json = await axios.get('/genres');
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data,
        })
    }
}

export function filterVideogamesByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterVideogamesByOrigin(payload) {
    return {
        type: 'FILTER_BY_ORIGIN',
        payload
    }
}

export function orderVideogamesByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function searchVideogames(name) {
    return async function(dispatch) {
        var json = await axios.get(`/videogames?name=${name}`);
        return dispatch({
            type: 'SEARCH_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function createVideogame(payload) {
    return async function(dispatch) {
        var json = await axios.post('/videogames', payload);
        return json;
    }
}

export function getDetail(id) {
    return async function(dispatch) {
        var json = await axios.get(`/videogame/${id}`);
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }
}

export function deleteVideogame(id) {
    return async function(dispatch) {
        var json = await axios.delete(`/videogame/${id}`);
        return json;
    }
}