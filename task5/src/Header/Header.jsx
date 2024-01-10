import React from "react";
import { Typography } from "@mui/material";

const Header = () => {
    return(
        <header className="header">
            <Typography variant="h4" style={{textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"}}>Админка фильмотеки</Typography>
            <Typography variant="h5" >Юдинских Илья 6407</Typography>
        </header>
    );
}

export default Header;