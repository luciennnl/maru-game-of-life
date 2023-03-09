import React, { FC } from 'react';
import './Button.css';

/**
 * Enum that can be used to adjust the button style
 */
enum ButtonStyle {
    DEFAULT = 'button-default',
    LIGHT = 'button-light'
}

/**
 * Enum that can be used to adjust the button size
 */
enum ButtonSize {
    SMALL = 'button-small',
    MEDIUM = 'button-medium',
    LARGE = 'button-large'
}

/**
 * Props for the Button component
 */
interface ButtonProps {
    callback: () => void;
    name: string;
    style?: ButtonStyle;
    size?: ButtonSize;
}

/**
 * React component representing a generic button
 * @param props ButtonProps
 * @returns JSX
 */
const Button : FC<ButtonProps> = (props) => {
    return <button 
        className={`button ${props.style || ButtonStyle.DEFAULT} ${props.size || ButtonSize.MEDIUM}`} 
        onClick={props.callback}
    >
        { props.name }
    </button>
}

export default Button;
export { ButtonProps, ButtonStyle, ButtonSize };