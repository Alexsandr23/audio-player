import React, {useState, useEffect} from "react";
import classes from "./header.module.css"
import SearchContainer from "../../components/searchDiv/SearchContainer";
import CustomModal from "../../components/CustomModal";
import LoginForm from "../LoginForm";
import RegistrationForm from "../RegistrationForm";
import {Link} from 'react-router-dom';
import ConteinerBtnLoginReg from "../../components/ConteinerBtnLoginReg";
import { useSelector } from "react-redux"
import { Avatar } from "@mui/material";
import { backendUrl } from "../../storeCreate/playerSlice";
import { useSearchTrackQuery } from "../../storeCreate/api";
import {history} from "../../App"


const Header = ({ onSearchResults, loading }) => {
    const stateAuth = useSelector((state) => state.auth)
    const [searchQuery, setSearchQuery] = useState("")
    const { isLoading, refetch } = useSearchTrackQuery({ title: searchQuery },{skip: !searchQuery})

    useEffect(() => {
        if (searchQuery) {
            loading(isLoading)
            refetch({ title: searchQuery }).then(result => {
                if (result.data) {
                    const newSearchResults = result.data.TrackFind
                    onSearchResults(newSearchResults)
                    
                }
          })
        }
      }, [searchQuery, refetch, onSearchResults, isLoading, stateAuth, loading])

    const searchTrack = (nameTrack) => {
        setSearchQuery(nameTrack)
        if (nameTrack) {
            history.push("/search")
        }
    }
    return (
        <header className={classes.wraper} >
            <div style={{display: "flex", gap: "10px"}}>
                <Link to="/"className={classes.logo}><span>AUDIO PLAYER</span></Link>
                <SearchContainer onSearch={searchTrack}/>
            </div>
            <ConteinerBtnLoginReg>
                {stateAuth.aboutMe && stateAuth.token ? 
                    <Link style={{textDecoration: "none", color: "#fff", textAling: "center"}} to="/editing-personal">
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            {stateAuth.aboutMe.avatar ?
                            <Avatar sizes="large" sx={{ width: 40, height: 40 }} src={`${backendUrl}${stateAuth.aboutMe.avatar.url}`}/> :
                            <Avatar sizes="large" sx={{ width: 40, height: 40 }} />}
                            <span>{stateAuth.aboutMe.nick}</span>
                        </div>   
                    </Link>
                 : 
                    <>
                        <CustomModal render={<RegistrationForm/>}>Регістрація</CustomModal>
                        <CustomModal render={<LoginForm/>}>Вхід</CustomModal>
                    </>
                }
            </ConteinerBtnLoginReg>
        </header>

    )
}

export default Header