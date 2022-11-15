import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createVideogame, getGenres } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './CreateVideogame.css';
import image from '../../assets/Mario.jpg';

export default function CreateVideogame() {

    const dispatch = useDispatch();
    
    const genres = useSelector((state) => state.genres);

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        background_image: '',
        platforms: [],
        genres: []
    });

    const [errors, setErrors] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(false);


    function validateInput(input) {
        let errors = {};
        let regexDate = /(?:19\d{2}|20[0-2][0-9]|2030)[-/.](?:0[1-9]|1[012])[-/.](?:0[1-9]|[12][0-9]|3[01])\b/;

        if (!input.name) {
            errors.name = 'Name field must not be empty';
            setButtonEnabled(false);
        } else if (input.name.length < 3) {
            errors.name = 'Name field must be at least 3 characters long';
            setButtonEnabled(false);
        }

        if (!input.description) {
            errors.description = 'The description field must not be empty';
            setButtonEnabled(false);
        } else if (input.description.length < 30) {
            errors.description = 'The description field must be at least 30 characters long';
            setButtonEnabled(false);
        }

        if (!input.released) {
            errors.released = 'The released field must not be empty';
            setButtonEnabled(false);
        } else if (!regexDate.test(input.released)) {
            errors.released = 'The released field is invalid';
            setButtonEnabled(false);
        }

        if (!input.rating) {
            errors.rating = 'The rating field must not be empty';
            setButtonEnabled(false);
        } else if (input.rating <= 1 || input.rating > 5) {
            errors.rating = 'The rating value must be between 1 and 5';
            setButtonEnabled(false);
        } else if (input.rating)

        if (!input.platforms.length > 0) {
            errors.platforms = 'The platforms field must not be empty';
            setButtonEnabled(false);
        }

        if (!input.genres.length > 0) {
            errors.genres = 'The genres field must not be empty';
            setButtonEnabled(false);
        }

        if (Object.entries(errors).length === 0) setButtonEnabled(true);

        return errors;
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validateInput({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
        setErrors(validateInput({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleCheckPlatforms(e) {
        if (e.currentTarget.checked) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            setErrors(validateInput({
                ...input,
                [e.target.name] : e.target.value
            }))
        }
    }

    function handleReset() {
        setInput({
            ...input,
            genres: []
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        if (input.background_image === "") input.background_image = image;
        dispatch(createVideogame(input));
        alert('Videogame created successfully!')
        setInput({
            name: '',
            description: '',
            released: '',
            rating: '',
            background_image: '',
            platforms: [],
            genres: []
        })
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    return (
        <div className='createVideogame'>
            <Link to='/home'>
                <button className='btn-home'>Home</button>
            </Link>
            <h1 className='createTitle'>Create your videogame!</h1>
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
                <div className='sectionForm1'>
                    <div>
                        <label>Name: </label>
                        <input className='input1' type="text" value={input.name} name='name' onChange={(e) => handleChange(e)}/>
                        {
                            errors.name && (
                                <p className='error-input'>{errors.name}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Description: </label>
                        <input className='input1' type="text" value={input.description} name='description' onChange={(e) => handleChange(e)}/>
                        {
                            errors.description && (
                                <p className='error-input'>{errors.description}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Released: </label>
                        <input className='input1' type="date"  min="1900-01-01" max="2099-12-31" value={input.released} name='released' onChange={(e) => handleChange(e)}/>
                        {
                            errors.released && (
                                <p className='error-input'>{errors.released}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Rating: </label>
                        <input className='input1' type="number" value={input.rating} name='rating' onChange={(e) => handleChange(e)}/>
                        {
                            errors.rating && (
                                <p className='error-input'>{errors.rating}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Image url: </label>
                        <input className='input1' type="text" value={input.background_image} name='background_image' onChange={(e) => handleChange(e)}/>
                    </div>
                    <div>
                        <fieldset>
                            <legend>Platforms: </legend>
                            <label><input type="checkbox" name='PC' value='PC' onChange={(e) => handleCheckPlatforms(e)}/> PC</label><br />
                            <label><input type="checkbox" name='Playstation 3' value='Playstation 3' onChange={(e) => handleCheckPlatforms(e)}/> Playstation 3</label><br />
                            <label><input type="checkbox" name='Xbox 360' value='Xbox 360' onChange={(e) => handleCheckPlatforms(e)}/> Xbox 360</label><br />
                            <label><input type="checkbox" name='Playstation 4' value='Playstation 4' onChange={(e) => handleCheckPlatforms(e)}/> Playstation 4</label><br />
                            <label><input type="checkbox" name='Xbox One' value='Xbox One' onChange={(e) => handleCheckPlatforms(e)}/> Xbox One</label><br />
                            <label><input type="checkbox" name='Playstation 5' value='Playstation 5' onChange={(e) => handleCheckPlatforms(e)}/> Playstation 5</label><br />
                            <label><input type="checkbox" name='Xbox Series S/X' value='Xbox Series S/X' onChange={(e) => handleCheckPlatforms(e)}/> Xbox Series S/X</label><br />
                            <label><input type="checkbox" name='Nintendo Switch' value='Nintendo Switch' onChange={(e) => handleCheckPlatforms(e)}/> Nintendo Switch</label><br />
                        </fieldset>
                    </div>
                    <div>
                        {
                            errors.platforms && (
                                <p className='error-input'>{errors.platforms}</p>
                            )
                        }
                    </div>
                    <div className='genres-select'>
                        <fieldset>
                            <legend>Genres: </legend>
                                <select onChange={(e) => handleSelect(e)}>
                                {
                                    genres && genres.map(el => (
                                        <option value={el.name} key={el.id}>{el.name}</option>
                                    ))
                                }
                                </select>
                        </fieldset>
                    </div>
                    <div>
                        {
                            errors.genres && (
                            <p className='error-input'>{errors.genres}</p>
                            )
                        }
                    </div>
                    <div>
                        <fieldset>
                            <legend>Genres selected: </legend>
                                <ul>
                                    {
                                        input.genres && input.genres.map(el => (
                                            <li>{el}</li>
                                        ))
                                    }
                                </ul>
                                <button type='button' className="btn-reset" onClick={handleReset}>Clear Genres</button>
                        </fieldset>
                    </div>
                    <div>
                        <button type='submit' className="btn-create-videogame" disabled={!buttonEnabled}>Create Videogame</button>
                    </div>
                </div>
            </form>
        </div>
    )


} 
