import React, {useEffect} from "react";
import style from "./Header.module.scss"
import CustomButton from "../common/CustomButton/CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons/faBriefcase";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAllCoinsTC} from "../pages/MainPage/mainPageReducer";
import convertNumber from "../utils/convertNumbers";
import {Link} from "react-router-dom";


const Header: React.FC = () => {

    const dispatch = useAppDispatch();
    const coins = useAppSelector((state) => state.main.allCoins)

    useEffect(() => {
        dispatch(fetchAllCoinsTC())
    }, [])

    return (
        <div className={style.header}>
            <div className={style.headerContainer}>
                <div className={style.currencyContainer}>
                    {coins && coins.slice(0, 3).map(coin =>
                        <Link to={`crypto/${coin.id}`} key={coin.id} className={style.currencyInfo}>
                            {coin.symbol}
                            <span>{convertNumber(coin.priceUsd)}</span>
                        </Link>
                    )}
                </div>
                <CustomButton dark className={style.caseButton}>
                    <FontAwesomeIcon className={style.caseFontIcon} icon={faBriefcase}/>
                    Briefcase Value
                </CustomButton>
            </div>
        </div>
    )
}

export default Header
