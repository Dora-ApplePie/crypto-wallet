import React from 'react';
import {ICryptoContainer} from "../../../types/Crypto";
import CryptoChart from "./CryptoChart/CryptoChart";
import CryptoInfo from "./CryptoInfo/CryptoInfo";

const CryptoPage: React.FC<ICryptoContainer> = ({ currentCoin, id }: ICryptoContainer) =>{
    return <div>
        <CryptoInfo currentCoin={currentCoin}/>
        <CryptoChart id={id}/>
    </div>
}

export default CryptoPage;
