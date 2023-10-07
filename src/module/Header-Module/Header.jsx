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


const Header = () => {
    const stateAuth = useSelector((state) => state.auth)
    
    return (
        <header className={classes.wraper} >
            <div style={{display: "flex", gap: "10px"}}>
                <Link to="/"className={classes.logo}><span>AUDIO PLAYER</span></Link>
                <SearchContainer/>
            </div>
            <ConteinerBtnLoginReg>
                {stateAuth.token ? 
                    <Link style={{textDecoration: "none", color: "#fff", textAling: "center"}} to="/editing-personal">
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            {stateAuth.aboutMe.avatar ?
                            <Avatar sizes="large" sx={{ width: 26, height: 26 }} src={`${backendUrl}${stateAuth.aboutMe.avatar.url}`}/> :
                            <Avatar sizes="large" sx={{ width: 26, height: 26 }} />}
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