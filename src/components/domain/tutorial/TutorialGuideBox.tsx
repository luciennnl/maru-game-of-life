import React from 'react';
import { FC } from 'react';
import './TutorialGuideBox.css';

/**
 * Enum representing the direction of the arrow indicator in the TutorialGuideBox
 */
enum ArrowDirection {
    TOP = 'arrow-up',
    RIGHT = 'arrow-right',
    DOWN = 'arrow-down',
    LEFT = 'arrow-left'
}

/**
 * Props for the TutorialGuideBox component
 */
interface TutorialGuideBoxProps {
    text: string;
    left: string;
    top: string;
    active: boolean;
    onClick?: () => void;
    arrow?: ArrowDirection
}

/**
 * React component representing a tooltip that is shown in the game tutorial
 * @param props TutorialGuideBoxProps
 * @returns JSX
 */
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