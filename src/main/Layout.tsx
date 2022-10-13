import {HashRouter} from "react-router-dom";
import Routes from "./Routes/Routes";
import React from "react";
import Header from "./Header/Header";


const Layout: React.FC = () => {

    return (
        <>
            <HashRouter>
                <Header/>
                <Routes/>
            </HashRouter>
        </>
    )
}

export default Layout
