import React, {useEffect} from "react";
import style from "./MainPage.module.scss"
import {fetchAllCoinsTC} from "./mainPageReducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Preloader from "../../common/Preloader/Preloader";
import CryptoTable from "./CryptoTable/CryptoTable";

const MainPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.main.isLoading)

    useEffect(() => {
        dispatch(fetchAllCoinsTC())
    }, [])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className={style.mainContainer}>
            <CryptoTable/>
        </div>
    )
}

export default MainPage;
