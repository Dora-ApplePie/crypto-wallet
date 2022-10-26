import React, {useEffect} from "react";
import CustomButton from "../../common/CustomButton/CustomButton";
import style from "./MainPage.module.scss"
import {Link, NavLink, useNavigate} from "react-router-dom";
import convertNumber from "../../utils/convertNumbers";
import {fetchAllCoinsTC} from "./mainPageReducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import Preloader from "../../common/Preloader/Preloader";

const MainPage: React.FC = () => {

    const dispatch = useAppDispatch();

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
                                <CustomButton primary onClick={() => alert('you are bought a crypto')}
                                              className={style.tdButton}>
                                    +
                                </CustomButton>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default MainPage

// const [number, setNumber] = useState<number>(0.1)
// const error = number ? '' : 'Not valid coast'
//
// const showAlert = () => {
//     if (error) {
//         alert('введите сумму...')
//     } else {
//         alert(number)
//     }
// }

{/*<CustomInputNumber*/
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
