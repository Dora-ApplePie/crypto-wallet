import React, {useEffect, useState} from "react";
import CustomButton from "../../common/CustomButton/CustomButton";
import style from "./MainPage.module.scss"
import {Link, NavLink, useNavigate} from "react-router-dom";
import convertNumber from "../../utils/convertNumbers";
import {fetchAllCoinsTC} from "./mainPageReducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Preloader from "../../common/Preloader/Preloader";
import AddToBriefcaseModal from "../Briefcase/AddToBriefcaseModal/AddToBriefcaseModal";

const MainPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false)
    const coins = useAppSelector((state) => state.main.allCoins)
    const isLoading = useAppSelector((state) => state.main.isLoading)

    useEffect(() => {
        dispatch(fetchAllCoinsTC())
    }, [])

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <div className={style.mainContainer}>
            <table>
                <thead>
                <tr>
                    <td>Rate</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Market capitalization</td>
                    <td>VWAP</td>
                    <td>Available resources</td>
                    <td>Volume</td>
                    <td>Change</td>
                    <td>Add</td>
                </tr>
                </thead>
                <tbody>
                {
                    coins.length != 0 && coins.map((crypto) => (
                        <tr key={crypto.id}>
                            <td>{crypto.rank}</td>
                            <td>
                                <Link to={`assets/${crypto.id}`}>
                                    {crypto.name}
                                </Link>
                            </td>
                            <td>${convertNumber(crypto.priceUsd)}</td>
                            <td>${convertNumber(crypto.marketCapUsd)}</td>
                            <td>${convertNumber(crypto.vwap24Hr)}</td>
                            <td>${convertNumber(crypto.supply)}</td>
                            <td>${convertNumber(crypto.volumeUsd24Hr)}</td>
                            <td>{convertNumber(crypto.changePercent24Hr)}%</td>
                            <td>
                                <CustomButton primary
                                              className={style.tdButton}
                                              onClick={(e) => {
                                                  e.preventDefault()
                                                  setIsOpen(true)
                                              }}>
                                    +
                                </CustomButton>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {/*{*/}
            {/*    isOpen &&  <AddToBriefcaseModal id={id} price={priceUsd} onClose={() => setIsOpen(false)} />*/}
            {/*}*/}
        </div>
    )
}

export default MainPage

// const [number, setNumber] = useState<number>(0.1)
// const error = number ? '' : 'Not valid coast'
//
// const showAlert = () => {
//     if (error) {
//         alert('?????????????? ??????????...')
//     } else {
//         alert(number)
//     }
// }

{/*<CustomInput*/
}
{/*    step={"0.1"}*/
}
{/*    min={"0"}*/
}
{/*    value={number}*/
}
{/*    onChangeNumber={setNumber}*/
}
{/*    onEnter={showAlert}*/
}
{/*    error={error}*/
}
{/*/>*/
}
{/*<CustomButton danger>Sell coins</CustomButton>*/
}
{/*<CustomButton success>Buy coins</CustomButton>*/
}
{/*<CustomButton primary>Next Page</CustomButton>*/
}
{/*<CustomButton>Default button</CustomButton>*/
}
