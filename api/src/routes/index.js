const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { API_KEY } = process.env;
const axios = require ('axios');
const router = Router();
const { Videogame, Genre } = require ('../db.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// AXIOS DE LOS 20 JUEGOS

const getApiInfo = async () => {
    try {
        let apiInfo = [];
        let apiUrl = await axios.get(`https://api.rawg.io/api/games?key=e99eb3808ce7474ca36f7846c40c04d7`);
        for (let i = 0; i < 5; i++) {
            let info = await apiUrl.data.results.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    background_image: el.background_image,
                    genres: el.genres.map(e => e.name),
                    rating: el.rating,
                };
            });
            apiInfo = apiInfo.concat(info);
            apiUrl = await axios.get(apiUrl.data.next);
        }
        return apiInfo;
    } catch (err) {
        console.log(err);
    }
};

// TRAER JUEGOS DE LA DB

const getDbInfo = async () => {
    return await Videogame.findAll();
};

// UNION DE JUEGOS DE LA API Y LA DB

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

// TRAER GENEROS DE LA API

const getGenresApi = async () => {
    let genres = await axios.get(`https://api.rawg.io/api/genres?key=e99eb3808ce7474ca36f7846c40c04d7`)
    .then(response => response.data.results.map(el => {
        return {
            name: el.name
        }
    }));
    return genres;
};


// TRAER GENEROS DE LA DB

const getGenresDb = async () => {
    return await Genre.findAll();
};

// TRAER GENEROS DE LA API Y AGREGARLOS A LA DB

const getAllGenres = async () => {
    const api = await getGenresApi();
    const db = await getGenresDb();
    if (!db.length > 0) {
        api.map(async (el) => {
            let name = el.name;
            await Genre.create({ name });
        });
        return api;
    } else {
        const genresTotal = api.concat(db);
        return genresTotal;
    }
};

router.get('/videogames', async (req, res) => {
    const { name } = req.query;
    let videogamesTotal = await getAllVideogames();
    try {
        if(name) {
            const search = await axios.get(`https://api.rawg.io/api/games?key=e99eb3808ce7474ca36f7846c40c04d7&search=${name}`);
            let list = [];
            for (let i = 0; i < 15; i++) {
                list = list.concat(search.data.results[i]);
            }
            const videogamesSearch = await list.map(el => {
                return {
                    name: el.name,
                    background_image: el.background_image,
                    genres: el.genres.map(e => e.name),
                };
            });
            return res.status(200).json(videogamesSearch);
        } else {
            return res.status(200).json(videogamesTotal);
        }
    } catch (err) {
        return res.status(404).send(err);
    }
});

router.get('/videogame/:id', async (req, res) => {
    let { id } = req.params;
    try {
        const videogameDetail = await axios.get(`https://api.rawg.io/api/games/${id}?key=e99eb3808ce7474ca36f7846c40c04d7`)
        .then(response => {
            return {
                name: response.data.name,
                background_image: response.data.background_image,
                genres: response.data.genres.map(e => e.name),
                description: response.data.description_raw,
                released: response.data.released,
                rating: response.data.rating,
                platforms: response.data.platforms.map(e => e.platform.name),
            }
        });
        return res.status(200).json(videogameDetail);
    } catch (err) {
        return res.status(404).send(err);
    }
});

router.post('/videogames', async (req, res) => {
    let { name, description, released, rating, background_image, genres, platforms } = req.body;
    try {
        let game = await Videogame.create({ name, description, released, rating, background_image, genres, platforms });
        return res.status(200).send('Videogame created successfully!');
    } catch (err) {
        return res.status(404).send(err);
    }
});

router.get('/genres', async (req, res) => {
    let genresDb = await getGenresDb();
    if (genresDb.length > 0) {
        return res.status(200).send(genresDb);
    } else {
        let genresApi = await getGenresApi();
        genresApi.map(async (el) => {
            let name = el.name;
            await Genre.create({ name });
        })
        let genresDbNew = await getGenresDb();
        return res.status(200).json(genresDbNew);
    }
});


module.exports = router;
