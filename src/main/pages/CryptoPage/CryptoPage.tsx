import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchCurrentCoinTC} from "./cryptoPageReducer";
import CustomButton from "../../common/CustomButton/CustomButton";
import CryptoChart from "./CryptoChart/CryptoChart";
import convertNumber from "../../utils/convertNumbers";
import style from "./CryptoPage.module.scss"

const CryptoPage: React.FC = () => {

    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const coin = useAppSelector((state) => state.coinPage.currentCoin)

    useEffect(() => {
        dispatch(fetchCurrentCoinTC(id))
    }, [id])


    return (
        <div className={style.mainContainer}>
            <CustomButton danger onClick={() => navigate(-1)}>Go Back</CustomButton>
            <div>{coin && coin.rank}</div>
            <div>{coin && coin.name} {`(${coin && coin.symbol})`}</div>
            <div>{`${coin && convertNumber(coin.priceUsd)}$`}</div>
            <div className={coin && coin.changePercent24Hr[0] === "-" ? style.decrease : style.increase}>
                {`${coin && convertNumber(coin.changePercent24Hr)}%`}
            </div>


            <div>Market cap: {coin && convertNumber(coin.marketCapUsd)}</div>
            <div>Volume: {coin && convertNumber(coin.volumeUsd24Hr)}</div>
            <div>Supply: {coin && convertNumber(coin.maxSupply)}</div>

            <CustomButton success>Add to briefcase</CustomButton>
            <CryptoChart/>
        </div>
    )
}

export default CryptoPage
