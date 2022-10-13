import {AssetsResponseType, InitialCoinsStateType} from "../../../types/Crypto";
import {AppThunk} from "../../../app/store";
import {Dispatch} from "redux";
import {cryptoApi} from "../../../api/cryptoApi";

const initialState: InitialCoinsStateType = {
    allCoins: [],
    isLoading: false,
    error: null,
}

export const mainPageReducer = (state: InitialCoinsStateType = initialState, action: ActionsType): InitialCoinsStateType => {
    switch (action.type) {
        case 'SET-ERROR':
            return {...state, error: action.error}
        case "SET-COINS":
            return {...state, allCoins: action.coins}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const setAllCoinsAC = (coins: Array<AssetsResponseType>) => ({type: 'SET-COINS', coins} as const)

export const fetchAllCoinsTC = (): AppThunk => (dispatch: Dispatch) => {
    cryptoApi.getAllCoins()
        .then(res => {
            if (res.data) {
                // dispatch(setIsLoadingAC(false));
                dispatch(setAllCoinsAC(res.data.data));
            } else {

            }
        })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAllCoinsActionType = ReturnType<typeof setAllCoinsAC>
type ActionsType = SetAppErrorActionType | SetAllCoinsActionType
