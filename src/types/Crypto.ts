export type AssetsResponseType = {
    id: string
    rank: string
    symbol: string
    name: string
    supply: string
    maxSupply: string
    marketCapUsd: string
    volumeUsd24Hr: string
    priceUsd: string
    changePercent24Hr: string
    vwap24Hr: string
    explorer?: string
}

export type HistoryResponseType = {
    priceUsd: string
    time: number
    date: string
}

export type InitialCoinsStateType = {
    allCoins: AssetsResponseType[]
    isLoading: boolean
    error: null | string
}
