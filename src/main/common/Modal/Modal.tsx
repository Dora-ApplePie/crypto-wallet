import React from 'react';
import CustomButton from "../CustomButton/CustomButton";

export type ModalPropsType = {
    children?: React.ReactNode,
    closeModal: () => void,
}

const Modal: React.FC<ModalPropsType> = ({children, closeModal}) => {
    return (
        <div className={"Modal"} onClick={e => (e.currentTarget === e.target) && closeModal()}>
            <div className={"ModalContent"}>
                <CustomButton danger>X</CustomButton>
                {children}
            </div>
        </div>
    )
}

export default Modal;
