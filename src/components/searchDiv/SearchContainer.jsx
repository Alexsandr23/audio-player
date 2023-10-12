import React, {useState} from "react";
import MyInput from "../../ui/input/MyInput";
import SearchIcon from '@mui/icons-material/Search';
import classes from "./search.module.css"

const SearchContainer = ({onSearch}) => {
    const [searchTrack, setSearchTrack] = useState("")

    const keyPress = (event) => {
        if (event.key === "Enter") {
            onSearch(searchTrack)
            setSearchTrack("")
        }
    }

    return (
        <div className={classes.divSearch}>
            <SearchIcon/>
            <MyInput  
                placeholder="Пошук треків"
                value={searchTrack}
                onChange={e => setSearchTrack(e.target.value)}
                onKeyPress={keyPress}/>
        </div>
    )
}

export default SearchContainer