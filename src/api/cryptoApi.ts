import {AxiosResponse} from "axios";
import {instance} from "./instance/instance";
import {AssetsResponseType, HistoryResponseType} from "../types/Crypto";

export const cryptoApi = {
    getAllCoins() {
        return instance.get<AxiosResponse<Array<AssetsResponseType>>>('/assets')
    },
    getCoinById(id: string | undefined) {
        return instance.get<AxiosResponse<AssetsResponseType>>(`/assets/${id}`)
    },
    getCoinsHistory(id: string | undefined) {
        return instance.get<AxiosResponse<Array<HistoryResponseType>>>(`/assets/${id}/history?interval=d1`)
    }
}
