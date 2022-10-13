import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import style from './CustomInputNumber.module.scss'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CustomInputNumberPropsType = DefaultInputPropsType & {
    onChangeNumber?: (value: number) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

const CustomInputNumber: React.FC<CustomInputNumberPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeNumber,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)
        onChangeNumber && onChangeNumber(e.currentTarget.valueAsNumber)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${error ? style.errorInput : '' } ${className}`

    return (
        <div className={style.inputWrapper}>
            <input
                type={'number'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}

export default CustomInputNumber
