import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import style from './CustomButton.module.scss'

type PrimaryButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type CustomButtonPropsType = PrimaryButtonPropsType & {
    danger?: boolean
    success?: boolean
    primary?: boolean
    dark?: boolean
}

const CustomButton: React.FC<CustomButtonPropsType> = (
    {
        danger, success, primary, dark,
        className, ...restProps
    }
) => {
    const finalClassName = `
    ${danger ? style.danger : ''}
    ${primary ? style.primary : ''}
    ${success ? style.success : ''}
    ${dark ? style.dark : ''}
    ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}

export default CustomButton
