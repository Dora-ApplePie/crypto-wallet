import {LocalStorageCryptoList} from "../../types/Crypto";


export const addToLocalStorage = ({ id, amount, price }: LocalStorageCryptoList) => {
    const localStorageData = localStorage.getItem('briefcase')
    if (localStorageData?.length) {
        const localStorageDataParsed = JSON.parse(localStorageData)
        localStorageDataParsed.push({ id, amount, price })
        localStorage.setItem('briefcase', JSON.stringify(localStorageDataParsed))
    } else {
        localStorage.setItem('briefcase', JSON.stringify([{ id, amount, price }]))
    }
}

export const getListFromLocalStorage = (key: string): LocalStorageCryptoList[] => {
    const list = localStorage.getItem(key)
    return list ? JSON.parse(list) : []
}

export const removeFromLocalStorage = (id: string) => {
    const list = localStorage.getItem("briefcase")
    const newList = list ? JSON.parse(list).filter((item: LocalStorageCryptoList) => item.id !== id) : []
    localStorage.setItem("briefcase", JSON.stringify(newList))
}




