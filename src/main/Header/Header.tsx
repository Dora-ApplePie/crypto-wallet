import React, {useEffect, useState} from "react";
import style from "./Header.module.scss"
import CustomButton from "../common/CustomButton/CustomButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons/faBriefcase";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchAllCoinsTC} from "../components/MainPage/mainPageReducer";
import convertNumber from "../utils/convertNumbers";
import {Link, useLocation} from "react-router-dom";
import {roundTo} from "../utils/roundTo";
import {getCurrentCryptoPriceListTC} from "../components/Briefcase/AddToBriefcaseModal/addToBriefcaseModalReducer";


const Header: React.FC = () => {

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false)
    const coins = useAppSelector((state) => state.main.allCoins)
    const initialSum = useAppSelector((state) => state.briefcase.initialSum)
    const currentSum = useAppSelector((state) => state.briefcase.currentSum)
    console.log(currentSum)

    useEffect(() => {
        dispatch(fetchAllCoinsTC())
    }, [])

    useEffect(() => {
        dispatch(getCurrentCryptoPriceListTC())
    }, [pathname])

    return (
        <div className={style.header}>
            <div className={style.headerContainer}>
                <div className={style.currencyContainer}>
                    {coins && coins.slice(0, 3).map(coin =>
                        <Link to={`main/assets/${coin.id}`} key={coin.id} className={style.currencyInfo}>
                            {coin.symbol}
                            <span>{roundTo(coin.priceUsd)}</span>
                        </Link>
                    )}
                </div>
                <CustomButton dark className={style.caseButton} onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon className={style.caseFontIcon} icon={faBriefcase}/>
                    {
                        initialSum > 0
                            ?
                            `${roundTo(`${currentSum}`)} USD (${(currentSum - initialSum) > 0 ? '+' : ''}${roundTo(`${(currentSum - initialSum) / initialSum * 100}`)}%)`
                            : '0 USD'
                    }
                </CustomButton>
            </div>
        </div>
    )
}

export default Header
