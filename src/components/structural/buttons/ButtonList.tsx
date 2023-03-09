import React, { FC } from 'react';
import Button, { ButtonProps } from './Button';
import './ButtonList.css';

/**
 * Props for the ButtonList component
 */
interface ButtonListProps {
    buttons?: ButtonProps[];
}

/**
 * React component representing a collection of buttons
 * @param props ButtonListProps
 * @returns JSX
 */
const ButtonList:FC<ButtonListProps> = (props) => {
    return <section 
        className='button-list'>
        { props.buttons ? props.buttons.map(b => 
            <Button 
                key={ b.name } 
                {...b}
            />) : ''
        }
    </section>
}

export default ButtonList;