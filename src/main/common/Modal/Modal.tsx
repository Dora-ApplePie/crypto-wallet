import React from 'react';
import CustomButton from "../CustomButton/CustomButton";
import style from "./Modal.module.scss"

export type ModalPropsType = {
    children?: React.ReactNode
    closeModal: () => void
    isOpen: boolean
}

const Modal: React.FC<ModalPropsType> = ({children, closeModal, isOpen}) => {
    return (
        <div className={isOpen ? style.active : style.modal} onClick={e => e.currentTarget === e.target && closeModal()}>
            <div className={isOpen ? style.activeContent : style.modalContent}>
                <CustomButton danger onClick={e => e.currentTarget === e.target && closeModal()}>X</CustomButton>
                {children}
            </div>
        </div>
    )
}

export default Modal;
