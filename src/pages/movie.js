import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import classes from './movie.module.css';
import Spinner from 'react-bootstrap/Spinner';

const Movie = () => {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const data = await response.json();

        const transformedMovies = data.results.map((movieData) => {
            return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
            director: movieData.director,
            producer: movieData.producer,
            };
        });
        setMovies(transformedMovies);
        } catch (error) {
        setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, []);
    console.log(movies);

    return(
        <div>
            {isLoading &&  <div className={classes.spinner}><Spinner animation="grow" className={classes.load} /></div>}
        {movies.map((movie, index) => (
        <div key={index} className={classes.main}>
        <Card className="text-center">
            <Card.Header className={classes.header}>{movie.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                {movie.openingText}
                
                </Card.Text>
                
               </Card.Body>
            <Card.Footer className="text-muted">
            <span className={classes.title}>Director</span>  : {movie.director}<br/>
                <span className={classes.title}>Producer</span>  : {movie.producer}<br/>
                <span className={classes.title}>Release Date</span>  : {movie.releaseDate}<br/>
            </Card.Footer>
        </Card>
        </div>
        ))}
        </div>
    );

};

export default Movie;