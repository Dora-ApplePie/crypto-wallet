import React, {useState} from "react";
import convertNumber from "../../../utils/convertNumbers";
import {Link, useParams} from "react-router-dom";
import CustomButton from "../../../common/CustomButton/CustomButton";
import style from "./CryptoTable.module.scss"
import AddToBriefcaseModal from "../../Briefcase/AddToBriefcaseModal/AddToBriefcaseModal";
import {useAppSelector} from "../../../../app/hooks";

const CryptoTable: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState("")
    const [cryptoPrice, setCryptoPrice] = useState("")
    const coins = useAppSelector((state) => state.main.allCoins)


    return (<>
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
                                                      setId(crypto.id)
                                                      setCryptoPrice(crypto.priceUsd)
                                                  }}>
                                        +
                                    </CustomButton>
                                </td>
                            </tr>
                    ))
                }
                </tbody>
            </table>
            <div>
                {id && isOpen
                    ? <AddToBriefcaseModal id={id} price={cryptoPrice} isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                    : ''
                }
            </div>
        </>
    )
}

export default CryptoTable;
