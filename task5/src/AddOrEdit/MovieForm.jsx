import { Button, FormLabel, Typography } from "@mui/material";
import React, {useState, useEffect} from "react";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useNavigate, useParams, Link } from "react-router-dom";
import {Select, MenuItem} from "@mui/material";
import { Movie } from "../types";
import { validateData, generateId } from "../helpers";

const MovieForm = () => {

    const param = useParams();
    const [movie, setMovie] = useState({});
    const [genres, setGenres] = useState();

    // стейты для инпутов
    const [titleInput, setTitle] = useState('');
    const [urlInput, setUrl] = useState('');
    const [plotInput, setPlot] = useState('');
    const [yearInput, setYear] = useState();
    const [runtimeInput, setRuntime] = useState();
    const [ratingInput, setRating] = useState();
    const [actorsInput, setActors] = useState('');
    const [directorInput, setDirector] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);

    async function fetchGenres(){ 
        try {
            await fetch('http://localhost:3001/genres').then( (response) =>  response.json()).then(
                genres => setGenres(genres)
            );
        } catch (err) {
            alert("Ошибка в запросе фильма: " + err);
        }
        
    }
    async function fetchMovie(){ 
        try {
            await fetch(`http://localhost:3001/movies/${param.imdbID}`).then( (response) =>  response.json()).then(
                data => {
                    setMovie(data); 
                    setTitle(data.title);
                    setUrl(data.posterUrl);
                    setActors(data.actors);
                    setDirector(data.director);
                    setPlot(data.plot);
                    setRating(data.rating);
                    setYear(data.year);
                    setRuntime(data.runtime);
                    setSelectedGenres(data.genres);
                }
            );
        } catch (err) {
            alert("Ошибка в запросе фильма: " + err);
        } 
    }
    
    useEffect(() => {
        if (param.imdbID)
        (async () => {
            await fetchMovie();
        })().catch(error => { console.error(error); });
    }, [param])

    useEffect(() => {
        (async () => {
            await fetchGenres();
        })().catch(error => { console.error(error); });
    }, [])

    // при смене с "редактирования" на "создания" чищу инпуты
    useEffect(() => {
        setTitle('');
        setUrl('');
        setActors('');
        setDirector('');
        setPlot('');
        setRating('');
        setYear('');
        setRuntime('');
        setSelectedGenres([]);
    }, [window.location.pathname])
    // --
    const navigate = useNavigate();
    let addPage = window.location.pathname.includes("add");
    const newMovieId = generateId();

    async function addMovie(){
        try {
            let movie = new Movie(
                999,
                titleInput,
                yearInput,
                runtimeInput,
                selectedGenres,
                directorInput,
                actorsInput,
                plotInput,
                urlInput,
                ratingInput
            );
            if (validateData(movie)){
                movie.id = newMovieId;
                await fetch('http://localhost:3001/movies', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(movie)
                });
            } else {
                alert("Введите необходимые поля");
            };
        } catch (err) {
            alert(err);
        }
    }

    async function editMovie(){
        try {
            let editedMovie = new Movie(
                movie.id,
                titleInput,
                yearInput,
                runtimeInput,
                selectedGenres,
                directorInput,
                actorsInput,
                plotInput,
                urlInput,
                ratingInput
            );
            await fetch(`http://localhost:3001/movies/${param.imdbID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(editedMovie)
            })
        } catch (err) {
            alert(err);
        }
    }
    return (
        <div className="movie-form__block column">
            <Typography variant="h3">{addPage ? 'Создание' : "Редактирование"}</Typography>
            <form id="card-form" className="movie-form">
                <Typography>Название фильма</Typography>
                <input className="movie-form__input" name="name" type="text" value={titleInput} onChange={(e) => setTitle(e.target.value)} placeholder="Введите название фильма" required />
                <Typography>Укажите ссылку на обложку</Typography>
                <input className="movie-form__input" value={urlInput} name="url" type="url" onChange={(e) => setUrl(e.target.value)} placeholder="Введите ссылку на изображение" />
                <Typography>Описание</Typography>
                <textarea className="movie-form__input-description" name="description" cols="40" rows="5" value={plotInput} onChange={(e) => setPlot(e.target.value)} placeholder="Введите описание" />
                <Typography>Год выпуска</Typography>
                <input className="movie-form__input" name="year" type="number" value={yearInput} onChange={(e) => setYear(e.target.value)} placeholder="Введите год выпуска" required />
                <Typography>Длительность</Typography>
                <input className="movie-form__input" name="runtime" type="number" value={runtimeInput} onChange={(e) => setRuntime(e.target.value)} placeholder="Введите фремя фильма (в минутах)" required />
                <div className="row">
                    <Typography>Рейтинг </Typography>
                    <SentimentVerySatisfiedIcon/> 
                </div>
                <input className="movie-form__input" name="rating" type="number" value={ratingInput} onChange={(e) => setRating(e.target.value)} placeholder="Задайте рейтинг" required />
                <Typography>Укажите список актеров</Typography>
                <input className="movie-form__input" name="actors" type="text" value={actorsInput} onChange={(e) => setActors(e.target.value)} placeholder="Введите актеров (через ,)" required />
                <Typography>Режиссер</Typography>
                <input className="movie-form__input" name="director" type="text" value={directorInput} onChange={(e) => setDirector(e.target.value)} placeholder="Введите имя режиссёра" required />
                <Typography>Жанры</Typography>
                <Select multiple value={selectedGenres} onChange={(e) => setSelectedGenres(e.target.value)} style={{width: '520px', background: '#ECF1F7'}}>
                    {genres && genres.map((genre) => (
                        <MenuItem key={genre} value={genre}>
                            {genre}
                        </MenuItem>
                    ))}
                </Select>
                <div className="row" style={{marginLeft: "auto", marginRight: 0}}>
                    <Button color="error" onClick={() => navigate(-1)}>Отменить</Button>
                    <Link to={addPage ? `/movie/${newMovieId}` : `/movie/${param.imdbID}`}>
                        <Button color="success" onClick={addPage ? addMovie : editMovie}>Сохранить</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default MovieForm;