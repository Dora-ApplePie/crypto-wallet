import {
    CryptoHistoryType,
    InitialChartStateType,
    InitialCurrentCoinStateType
} from "../../../../types/Crypto";
import {AppThunk} from "../../../../app/store";
import {Dispatch} from "redux";
import {cryptoApi} from "../../../../api/cryptoApi";
import {setCoinAC} from "../cryptoPageReducer";

const initialState: InitialChartStateType = {
    cryptoHistory: [],
    isLoading: true,
    error: null,
}

export const cryptoHistoryReducer = (state: InitialChartStateType = initialState, action: ActionsType):InitialChartStateType  => {
    switch (action.type) {
        case 'SET-COIN-HISTORY':
            return {...state, cryptoHistory: action.cryptoHistory}
        default:
            return {...state}
    }
}

export const fetchCryptoHistoryTC = (id: string | undefined): AppThunk => (dispatch: Dispatch) => {
    cryptoApi.getCoinsHistory(id)
        .then(res => {
            dispatch(setCoinHistoryAC(res.data.data));
        })
    //     .catch(res => {
    //         dispatch(setErrorAC('Some error occurred'))
    //     })
    //     .finally(() => {
    //         dispatch(setIsLoadingAC(false));
    //     })
}

export const setCoinHistoryAC = (cryptoHistory: CryptoHistoryType[]) => ({type: 'SET-COIN-HISTORY', cryptoHistory} as const)

export type setCoinHistoryType = ReturnType<typeof setCoinHistoryAC>

type ActionsType = setCoinHistoryType
