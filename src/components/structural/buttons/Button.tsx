import React, { FC } from 'react';
import './Button.css';

enum ButtonStyle {
    DEFAULT = 'button-default',
    LIGHT = 'button-light'
}

enum ButtonSize {
    SMALL = 'button-small',
    MEDIUM = 'button-medium',
    LARGE = 'button-large'
}
interface ButtonProps {
    callback: () => void;
    name: string;
    style?: ButtonStyle;
    size?: ButtonSize;
}

const Button : FC<ButtonProps> = (props) => {
    return <button className={`button ${props.style || ButtonStyle.DEFAULT} ${props.size || ButtonSize.MEDIUM}`} onClick={props.callback}>{ props.name }</button>
}

export default Button;
export { ButtonProps, ButtonStyle, ButtonSize };