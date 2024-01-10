import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const MainListFooter = ({lengtn}) => {
    return (
        <div className="movie-list__footer">
            <Typography>Найдено {lengtn} элементов</Typography>
            <Link to='addMovie'>
                <Button>
                    <AddIcon/> Добавить
                </Button>
            </Link>
        </div>
    )
}

export default MainListFooter;