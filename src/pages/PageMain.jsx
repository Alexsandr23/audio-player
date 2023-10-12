import React from "react";
import "../App.css"



const PageMain = ({isLoggedIn}) => {

    return (
        <main className="stylePage">
           {isLoggedIn ?
                <p>Ви увійшли до сайту!</p> :
                <p>Для користуванням сайтом треба заєреструватись або увійти у свій профіль</p>
           }
        </main>
    )
}

export default PageMain