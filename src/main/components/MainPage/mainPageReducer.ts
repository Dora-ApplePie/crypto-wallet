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
        case "SET-LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return {...state}
    }
}

export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const setAllCoinsAC = (coins: Array<AssetsResponseType>) => ({type: 'SET-COINS', coins} as const)
export const setIsLoadingAC = (isLoading: boolean) => ({type: 'SET-LOADING', isLoading} as const)

export const fetchAllCoinsTC = (): AppThunk => (dispatch: Dispatch) => {
    dispatch(setIsLoadingAC(true));
    cryptoApi.getAllCoins()
        .then(res => {
            dispatch(setAllCoinsAC(res.data.data));
        })
        .catch(res => {
            dispatch(setErrorAC('Some error occurred'))
        })
        .finally(() => {
            dispatch(setIsLoadingAC(false));
        })
}

export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetAllCoinsActionType = ReturnType<typeof setAllCoinsAC>
export type setIsLoadingActionType = ReturnType<typeof setIsLoadingAC>
type ActionsType = SetErrorActionType | SetAllCoinsActionType | setIsLoadingActionType
