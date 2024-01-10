import React, {useState, useEffect} from "react";
import { Paper } from "@mui/material";
import {Typography} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const MovieCard = ({movie, isFav}) => {
    //const [isFav, setIsFav] = useState();
    // useEffect(() => {
    //     for (let favMovie of favorites){
    //         if (movie.id === favMovie.id) setIsFav(true);
    //     }
    // })
    return (
        <Paper key={movie.id} elevation={2} className="movie-list__card">
            <div className="column">
                <Typography>{movie.title}</Typography>
                <Typography color="grey">{movie.year} | {movie.genres.join(", ")}</Typography>
            </div>
            {isFav ? <StarIcon className="pointer"/> : <StarBorderIcon className="pointer"/>} 
        </Paper>
    )
}

export default MovieCard;