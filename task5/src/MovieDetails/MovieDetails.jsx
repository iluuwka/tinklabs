import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useParams, useNavigate } from "react-router-dom";
import {Snackbar} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';

const MovieDetails = () => {
    const param = useParams();
    const [movie, setMovie] = useState({});
    const [favorites, setFavorites] = useState();
    const [isFav, setIsFav] = useState();
   
    async function fetchMovie(){ 
        try {
            await fetch(`http://localhost:3001/movies/${param.imdbID}`).then( (response) =>  response.json()).then(
                data => setMovie(data)
            );
        } catch (err) {
            alert("Ошибка в запросе фильмов: " + err);
        }
        
    }
    async function fetchFav(){ 
        try {
            await fetch(`http://localhost:3001/favorites`).then( (response) =>  response.json()).then(
                data => {setFavorites(data)}
            );
        } catch (err) {
            alert("Ошибка в запросе любимчиков: " + err);
        }
        
    }

    useEffect(() => {
        (async () => {
            await fetchMovie();
            await fetchFav();
            setIsFav(false);
        })().catch(error => { console.error(error); });
    }, [param])

    //проверка: есть ли фильм в "любимых"
    useEffect(() => {
        if(favorites){
            for (let i =0; i < favorites.length; i++){
                if (movie.id === favorites[i].id) setIsFav(true);
            }
        }
    }, [favorites, isFav])

    //вывод длительности
    function minutesToHours(minutes){
        return `${Math.floor(Number(minutes)/60)} ч. ${Number(minutes) % 60} мин.`
    }

    //уведомление
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );
    //--
    //рейтинг
    function generateRating(){
        return ((Math.random() * 90 + 10)/10).toFixed(1);
    }

    function colorOfRating(rate){
        if (rate < 5) {
            return 'red';
        } else {
            if (rate >= 5 && rate < 7){
                return 'grey';
            } else return 'green'
        }

    }
    let rating = generateRating();
    const navigate = useNavigate();

    //добавление фильма в "любимые"
    async function addToFav(){
        try {
            await fetch('http://localhost:3001/favorites', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(movie)
            });
            setIsFav(true);
        } catch (err) {
            alert(err);
        }
    }
    return(
        <div className="movie-details__block">
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Id фильма скопирован"
                action={action}
            />
            <div className="movie-details__header">
                <div className="row">
                    <Typography variant="h6">Id: {movie.id} </Typography>
                    <ContentCopyIcon className="pointer" onClick={() => {navigator.clipboard.writeText(movie.id); handleClick();}}/>
                </div>
                
                    <Button onClick={() => navigate('edit')}>
                        <EditIcon /> Редактировать
                    </Button>
                
            </div>
            <div className="movie-details__main">
                <img className="movie-details__poster" src={movie.posterUrl}/>
                <div className="movie-details__info">
                    <div className="movie-details__title">
                        <div className="row">
                            <Typography variant="h4">{movie.title}</Typography>
                            {isFav ? <StarIcon className="pointer"/> : <StarBorderIcon className="pointer" onClick={addToFav}/>} 
                        </div>
                        <Typography color="grey">{movie.director}</Typography>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div className="movie-details__params">
                            <Typography variant="h6">Параметры</Typography>
                            <div className="row">
                                <Typography color="grey">Год производства:</Typography>
                                <Typography> {movie.year}</Typography>
                            </div>
                            <div className="row">
                                <Typography color="grey">Длительность:</Typography>
                                <Typography> {minutesToHours(movie.runtime)}</Typography>
                            </div>
                            <div className="row">
                                <Typography color="grey">Жанры:</Typography>
                                <Typography>{movie.genres && movie.genres.join(", ")}</Typography>
                            </div>
                        </div>
                        <div className="movie-details__actors">
                            <div className="row">
                                <Typography variant="h6">В главных ролях </Typography>
                                <KeyboardArrowRightIcon className="pointer"/>
                            </div>
                            {movie.actors && movie.actors.split(', ').map((actor) => (
                                <Typography key={actor}>{actor}</Typography>
                            ))}
                            <Typography color='blue' className="pointer">Остальные ?? актеров</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie-details__footer">
                <Typography variant="h4">Описание</Typography>
                <Typography>{movie.plot}</Typography>
                <div className="row">
                    <Typography variant="h5">Текущий рейтинг: </Typography>
                    <Typography variant="h4" color={colorOfRating(movie.rating ? movie.rating : rating)}>{movie.rating ? movie.rating : rating} </Typography>
                </div>
                
            </div>
        </div>
    )
}

export default MovieDetails;