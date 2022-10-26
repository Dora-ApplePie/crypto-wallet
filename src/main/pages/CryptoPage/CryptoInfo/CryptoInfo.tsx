import React from 'react';
import CustomButton from "../../../common/CustomButton/CustomButton";
import convertNumber from "../../../utils/convertNumbers";
import style from "../CryptoPage.module.scss";
import {useNavigate} from "react-router-dom";
import {ICryptoPageInfo} from "../../../../types/Crypto";

const CryptoInfo: React.FC<ICryptoPageInfo> = ({ currentCoin }: ICryptoPageInfo) => {
    const navigate = useNavigate()

    return <div>
        <CustomButton danger onClick={() => navigate(-1)}>Go Back</CustomButton>
        <div>{currentCoin.rank}</div>
        <div>{currentCoin.name} {`(${currentCoin.symbol})`}</div>
        <div>{`${convertNumber(currentCoin.priceUsd)}$`}</div>
        <div className={currentCoin.changePercent24Hr[0] === "-" ? style.decrease : style.increase}>
            {`${convertNumber(currentCoin.changePercent24Hr)}%`}
        </div>


        <div>Market cap: {convertNumber(currentCoin.marketCapUsd)}</div>
        <div>Volume: {convertNumber(currentCoin.volumeUsd24Hr)}</div>
        <div>Supply: {convertNumber(currentCoin.maxSupply)}</div>

        <CustomButton success>Add to briefcase</CustomButton>
    </div>
}

export default CryptoInfo;
