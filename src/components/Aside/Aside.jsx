import React from "react";
import classes from './aside.module.css'

const Aside = ({children}) => {

    return (
        <aside className={classes.wraper}>
            {children}
        </aside>
    )
}

export default Aside