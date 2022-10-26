import {AssetsResponseType, InitialCurrentCoinStateType} from "../../../types/Crypto";
import {AppThunk} from "../../../app/store";
import {Dispatch} from "redux";
import {cryptoApi} from "../../../api/cryptoApi";

const initialState: InitialCurrentCoinStateType = {
    currentCoin: {
        id: '',
        rank: '',
        symbol: '',
        name: '',
        supply: '',
        maxSupply: '',
        marketCapUsd: '',
        volumeUsd24Hr: '',
        priceUsd: '',
        changePercent24Hr: '',
        vwap24Hr: '',
        explorer: '',
    },
    isLoading: true,
    error: null,
}

export const cryptoPageReducer = (state: InitialCurrentCoinStateType = initialState, action: ActionsType): InitialCurrentCoinStateType => {
    switch (action.type) {
        case 'SET-COIN':
            return {...state, currentCoin: action.currentCoin}
        default:
            return {...state}
    }
}

export const setCoinAC = (currentCoin: AssetsResponseType) => ({type: 'SET-COIN', currentCoin} as const)


export const fetchCurrentCoinTC = (id: string | undefined): AppThunk => (dispatch: Dispatch) => {
    cryptoApi.getCoinById(id)
        .then(res => {
            dispatch(setCoinAC(res.data.data));
        })
    //     .catch(res => {
    //         dispatch(setErrorAC('Some error occurred'))
    //     })
    //     .finally(() => {
    //         dispatch(setIsLoadingAC(false));
    //     })
}

export type SetCoinActionType = ReturnType<typeof setCoinAC>

type ActionsType = SetCoinActionType
