import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchCurrentCoinTC} from "./cryptoPageReducer";
import style from "./CryptoPage.module.scss"
import CryptoPage from "./CryptoPage";

const CryptoPageContainer: React.FC = () => {

    const {id} = useParams();

    const dispatch = useAppDispatch();
    const { currentCoin } = useAppSelector((state) => state.coinPage)

    useEffect(() => {
        dispatch(fetchCurrentCoinTC(id))
    }, [id])


    return (
        <div className={style.mainContainer}>
            <CryptoPage id={id} currentCoin={currentCoin} />
        </div>
    )
}

export default CryptoPageContainer
