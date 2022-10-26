import React, {useEffect} from "react";
import {CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area, AreaChart, ResponsiveContainer} from 'recharts';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {fetchCryptoHistoryTC} from "./cryptoHistoryReducer";
import {useParams} from "react-router-dom";


const CryptoChart: React.FC = () => {

    const dispatch = useAppDispatch();
    const {id} = useParams();

    const cryptoHistory = useAppSelector((state) => state.coinHistory.cryptoHistory)

    useEffect(() => {
        dispatch(fetchCryptoHistoryTC(id))
    }, [id])

    const labels = cryptoHistory && cryptoHistory.map(({date}) => new Date(date).toLocaleDateString())

    return (
        <div style={{width: '100%', height: 500}}>
            <ResponsiveContainer>
                <AreaChart
                    width={1200}
                    height={500}
                    data={cryptoHistory}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="1 4"/>
                    <XAxis dataKey={"date"} hide={true}/>
                    <YAxis />
                    <Legend wrapperStyle={{paddingTop: "20px"}}/>
                    <Tooltip contentStyle={{
                        color: "#ffffff",
                        opacity: "0.9",
                        backgroundColor: "rgba(19,19,19,0.81)",
                        border: "transparent"
                    }}
                             wrapperStyle={{outline: "none"}}/>
                    <Area name={"USD ($)"} legendType={"star"} type="monotone" dataKey="priceUsd" stroke="#c605ce"
                          strokeWidth={3} fill="#c605ff" activeDot={{r: 4}} dot={false}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CryptoChart


