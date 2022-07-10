import React, { FC } from 'react';
import Button, { ButtonProps } from './Button';
import './ButtonList.css';

interface ButtonListProps {
    buttons?: ButtonProps[];
}

const ButtonList:FC<ButtonListProps> = (props) => {
    return <section className='button-list'>
        { props.buttons ? props.buttons.map(b => 
            <Button key={b.name} {...b}/>) : ''
        }
    </section>
}

export default ButtonList;