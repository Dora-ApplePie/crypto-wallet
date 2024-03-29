import React, {FormEvent, useState} from "react";
import Modal from "../../../common/Modal/Modal";
import CustomButton from "../../../common/CustomButton/CustomButton";
import convertNumber from "../../../utils/convertNumbers";
import {addToLocalStorage} from "../../../utils/localstorage";
import {useAppDispatch} from "../../../../app/hooks";
import {getCurrentCryptoPriceListTC} from "./addToBriefcaseModalReducer";
import CustomInput from "../../../common/CustomInput/CustomInput";
import style from "./AddToBriefcaseModal.module.scss"


export type AddToBriefcaseModalType = {
    setIsOpen: (isOpen: boolean) => void
    price: string
    id: string
    isOpen: boolean
    cryptoName: string
}

const AddToBriefcaseModal: React.FC<AddToBriefcaseModalType> = ({isOpen, cryptoName, setIsOpen, id, price}) => {
    const [value, setValue] = useState('')
    const [inputError, setInputError] = useState('')
    const dispatch = useAppDispatch();

    const handleAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (+value > 100 || +value === 0) {
            setInputError('Please enter a number from 0,1 to 100')
            setTimeout(() => {
                setInputError('')
            }, 3000)
            setValue('')
            return
        } else if (isNaN(parseFloat(value))) {
            setInputError('Please enter a valid number')
            setTimeout(() => {
                setInputError('')
            }, 3000)
            setValue('')
            return
        } else {
            addToLocalStorage({amount: `${parseFloat(value)}`, id, price})
            dispatch(getCurrentCryptoPriceListTC())
            setIsOpen(false)
        }
    }

    const handleChange = (value: string) => {
        if (+value >= 0) {
            setValue(value)
        }
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div>
                <div>
                    <div
                        className={style.idName}>{cryptoName ? cryptoName[0].toUpperCase() + cryptoName.slice(1) : cryptoName}</div>
                    <div>
                        {convertNumber(price)} USD
                    </div>
                </div>
                <form onSubmit={(e) => handleAdd(e)}>
                    <CustomInput step={0.1}
                                 type={'number'}
                                 value={value} onChange={(e) => handleChange(e.target.value)}
                                 placeholder={'Enter amount'}
                                 error={inputError}/>
                    <CustomButton style={{padding: "10px 30px"}} success type="submit">Buy</CustomButton>
                </form>
            </div>
        </Modal>
    )
}

export default AddToBriefcaseModal
