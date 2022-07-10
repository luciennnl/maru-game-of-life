import React, { FC } from 'react';
import './ButtonList.css';

interface ButtonFunction {
    callback: () => void;
    name: string;
}
interface ButtonListProps {
    functions?: ButtonFunction[];
}
const ButtonList:FC<ButtonListProps> = (props) => {
    return <section className='button-list'>
        { props.functions ? props.functions.map(f => 
            <button className='button-list-button' onClick={f.callback}>{ f.name }</button>) : ''
        }
    </section>
}

export default ButtonList;