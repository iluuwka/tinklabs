import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {Button, Container, TextField} from "@mui/material";
import MovieCard from "./components/Card";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MainListFooter from "./components/MainListFooter";

const MovieList = () => {
    const [favorites, setFavorites] = useState();
    const [searchString, setSearch] = useState('');
    const [allMovies, setMovies] = useState([]);

    //рендерим карточки фильмов, если чо то написано в строке, то фильтруем
    function renderMovies(movies, searchParam){
        if (searchParam != ''){
            movies = movies.filter((movie) => movie.title.includes(searchParam));
        }
        return (
            movies.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`} style={{textDecoration: 'none'}}>
                    <MovieCard key={movie.id} movie={movie} isFav={movieIsFav(movie.id)}/>
                </Link>
            ))
        )
    };

    // запрашиваем фильмы
    async function fetchMovies(){ 
        try {
            await fetch('http://localhost:3001/movies').then( (response) =>  response.json()).then(
                data => setMovies(data)
            );
        } catch (err) {
            alert("Ошибка в запросе фильмов: " + err);
        }
        
    }

    // запрашиваем "Любимые" фильмы
    async function fetchFav(){ 
        try {
            await fetch(`http://localhost:3001/favorites`).then( (response) =>  response.json()).then(
                data => setFavorites(data)
            );
        } catch (err) {
            alert("Ошибка в запросе любимчиков: " + err);
        }
    }

    useEffect(() => {
        (async () => {
            await fetchMovies();
            await fetchFav();
        })().catch(error => { console.error(error); });
    }, [])

    // функция проверки: есть ли в фильм в "любимых"
    function movieIsFav(id){
        if(favorites){
            for (let i =0; i < favorites.length; i++){
                if (id === favorites[i].id) 
                    return true;
            }
        }
    }
    return (
            <div className="movie-block">
                <div className="movie-list__search-bar row">
                    <input id="search" className='movie-list__search' placeholder="Введите название фильма" type="text" />
                    <Button color="error" onClick={() => {setSearch(''); document.getElementById('search').value = ''}}>
                        <CloseIcon />
                    </Button>
                    <Button onClick={() => setSearch(document.getElementById('search').value)}>
                        <SearchIcon/>
                    </Button>
                </div>
                
                <div className="movie-list">
                    { renderMovies(allMovies, searchString) }
                </div>

                <div className="movie-list__line"></div>

                <MainListFooter lengtn={allMovies.length}/>
            </div> 
    )
}

export default MovieList;