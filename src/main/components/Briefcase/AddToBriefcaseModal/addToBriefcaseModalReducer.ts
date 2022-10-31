import {
    BriefcaseStateType,
    CurrentCryptoPrice,
    LocalStorageCryptoList
} from "../../../../types/Crypto";
import {AppThunk} from "../../../../app/store";
import {Dispatch} from "redux";
import {getListFromLocalStorage} from "../../../utils/localstorage";
import {cryptoApi} from "../../../../api/cryptoApi";

const initialState: BriefcaseStateType = {
    currentCryptoPrice: [],
    isLoading: false,
    currentSum: 0,
    initialSum: 0,
}

export const briefcaseReducer = (state: BriefcaseStateType = initialState, action: ActionsType): BriefcaseStateType => {
    switch (action.type) {
        case 'SET-CURRENT-CRYPTO-PRICE':
            return {
                ...state,
                currentCryptoPrice: action.currentCryptoPrice
            }
        case 'SET-CURRENT-BRIEFCASE-SUM':
            return {
                ...state,
                currentSum: +action.briefcase.reduce((acc, {id, amount}) => {
                    return acc + (+amount * Number(state.currentCryptoPrice.find(item => item.id === id)?.priceUsd))
                }, 0)
            }
        case 'SET-INITIAL-BRIEFCASE-SUM':
            return {
                ...state,
                initialSum: +action.briefcaseList.reduce((acc, curr) => acc + (+curr.amount * +curr.price), 0)
            }
        default:
            return state
    }
}

export const SetCurrentCryptoPriceAC = (currentCryptoPrice: CurrentCryptoPrice[]) => ({
    type: 'SET-CURRENT-CRYPTO-PRICE',
    currentCryptoPrice
} as const)
export const SetCurrentBriefcaseSumAC = (briefcase: LocalStorageCryptoList[]) => ({
    type: 'SET-CURRENT-BRIEFCASE-SUM',
    briefcase
} as const)
export const SetInitialBriefcaseSumAC = (briefcaseList: LocalStorageCryptoList[]) => ({
    type: 'SET-INITIAL-BRIEFCASE-SUM',
    briefcaseList
} as const)


export const getCurrentCryptoPriceListTC = (): AppThunk => (dispatch: Dispatch) => {

    const briefcase: LocalStorageCryptoList[] = getListFromLocalStorage("briefcase")
    const cryptoIdInBriefcaseList = Array.from(new Set(briefcase.map(cryptoItem => cryptoItem.id)))
    const currentCryptoPrice: CurrentCryptoPrice[] = []
    cryptoIdInBriefcaseList.forEach((cryptoId: string) => {
        cryptoApi.getCoinById(`/${cryptoId}`)
            .then((res) => {
                currentCryptoPrice.push({id: res.data.data.id, priceUsd: res.data.data.priceUsd})
            })
            .then(() => dispatch(SetCurrentCryptoPriceAC(currentCryptoPrice)))
            .then(() => dispatch(SetInitialBriefcaseSumAC(briefcase)))
            .then(() => dispatch(SetCurrentBriefcaseSumAC(briefcase)))
    })
}

export type SetCurrentCryptoPriceActionType = ReturnType<typeof SetCurrentCryptoPriceAC>
export type SetCurrentBriefcaseSumActionType = ReturnType<typeof SetCurrentBriefcaseSumAC>
export type SetInitialBriefcaseSumActionType = ReturnType<typeof SetInitialBriefcaseSumAC>

type ActionsType = SetCurrentCryptoPriceActionType | SetCurrentBriefcaseSumActionType | SetInitialBriefcaseSumActionType
