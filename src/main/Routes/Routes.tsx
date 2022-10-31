import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import CryptoPage from "../components/CryptoPage/CryptoPageContainer";
import Page404 from "../components/Page404/Page404";
import MainPage from "../components/MainPage/MainPage";


export const PATH = {
    MAIN_PAGE: '/main',
    CRYPTO_PAGE: 'main/assets/:id'
}

const Pages: React.FC = () => {
    return (
        <Routes>
                <Route path={'/'} element={<Navigate to={PATH.MAIN_PAGE}/>}/>
                <Route path={PATH.MAIN_PAGE} element={<MainPage/>}/>
                <Route path={PATH.CRYPTO_PAGE} element={<CryptoPage/>}/>
                <Route path={'/*'} element={<Page404/>}/>
        </Routes>
    )
}

export default Pages
