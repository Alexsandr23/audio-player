import React from "react";
import MyInput from "../../ui/input/MyInput";
import SearchIcon from '@mui/icons-material/Search';
import classes from "./search.module.css"

const SearchContainer = ({...props}) => {
    return (
        <div className={classes.divSearch}>
            <SearchIcon/>
            <MyInput {...props} placeholder="Пошук треків, виконавців"/>
        </div>
    )
}

export default SearchContainer