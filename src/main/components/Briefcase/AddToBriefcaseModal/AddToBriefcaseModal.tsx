import React, {FormEvent, useState} from "react";
import Modal from "../../../common/Modal/Modal";
import CustomButton from "../../../common/CustomButton/CustomButton";
import convertNumber from "../../../utils/convertNumbers";
import {addToLocalStorage} from "../../../utils/localstorage";
import {useAppDispatch} from "../../../../app/hooks";
import {getCurrentCryptoPriceListTC} from "./addToBriefcaseModalReducer";
import CustomInput from "../../../common/CustomInput/CustomInput";


export type AddToBriefcaseModalType = {
    onClose: () => void
    price: string
    id: string
    isOpen: boolean
}

const AddToBriefcaseModal: React.FC<AddToBriefcaseModalType> = ({isOpen, onClose, id, price}) => {

    const [value, setValue] = useState('')
    const [inputError, setInputError] = useState('')
    const dispatch = useAppDispatch();

    const handleAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (+value > 100 || +value === 0) {
            setInputError('Please enter a number between 0,1 and 100')
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
            onClose()
        }
    }

    const handleChange = (value: string) => {
        if (+value >= 0) {
            setValue(value)
        }
    }

    return (
        <Modal isOpen={isOpen} closeModal={onClose}>
            <div className={'modal'}>
                <div className={'modalTitle'}>
                    <div className={"modalName"}>{id.toUpperCase()}</div>
                    <div className={"modalPrice"}>
                        {convertNumber(price)} USD
                    </div>
                </div>
                <form className={"ModalForm"} onSubmit={(e) => handleAdd(e)}>
                    <CustomInput step={0.1}
                                 type={'number'}
                                 value={value} onChange={(e) => handleChange(e.target.value)}
                                 placeholder={'Enter amount'}
                                 error={inputError}/>
                    <CustomButton success type="submit">Buy</CustomButton>
                </form>
            </div>
        </Modal>
    )
}

export default AddToBriefcaseModal
