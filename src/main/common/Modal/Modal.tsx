import React from 'react';
import CustomButton from "../CustomButton/CustomButton";
import style from "./Modal.module.scss"

export type ModalPropsType = {
    children?: React.ReactNode
    setIsOpen: (isOpen: boolean) => void
    isOpen: boolean
}

const Modal: React.FC<ModalPropsType> = ({children, setIsOpen, isOpen}) => {
    return (
        <div className={isOpen ? style.active : style.modal} onClick={e => e.currentTarget === e.target && setIsOpen(false)}>
            <div className={isOpen ? style.activeContent : style.modalContent}>
                <CustomButton danger onClick={() => setIsOpen(false)}>x</CustomButton>
                {children}
            </div>
        </div>
    )
}

export default Modal;
