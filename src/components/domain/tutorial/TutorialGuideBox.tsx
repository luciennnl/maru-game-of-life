import React from 'react';
import { FC } from 'react';
import './TutorialGuideBox.css';

enum ArrowDirection {
    TOP = 'arrow-up',
    RIGHT = 'arrow-right',
    DOWN = 'arrow-down',
    LEFT = 'arrow-left'
}

interface TutorialGuideBoxProps {
    text: string;
    left: string;
    top: string;
    active: boolean;
    onClick?: () => void;
    arrow?: ArrowDirection
}

const TutorialGuideBox : FC<TutorialGuideBoxProps> = (props) => {
    if (!props.active) {
        return <></>
    }
    return <>
        <div 
            className={`tutorial-guide-box ${props.active && 'fadein'}`}
            onClick={ props.onClick }
            style={{
                left: props.left, 
                top: props.top
            }} 
        >
            { props.text }
        </div>
    </>
}

export default TutorialGuideBox;
export { TutorialGuideBoxProps, ArrowDirection }