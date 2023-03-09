import React, { useState, FC } from 'react';
import { MdChangeHistory } from 'react-icons/md';
import './PopupMenu.css';

const openButtonSize = 32;

/**
 * Props for the PopupMenu component
 */
interface PopupMenuProps {
    children: React.ReactNode;
}

/**
 * React component representing a popup menu from the bottom of the screen
 * @param props PopupMenuProps
 * @returns JSX
 */
const PopupMenu:FC<PopupMenuProps> = (props) => {
    const [active, setActive] = useState(false);

    const toggleMenu = () : void => {
        setActive(a => !a);
    }
    return <section 
        className={`popup-menu ${active ? 'popup-menu-active' : ''}`}
    >
        <MdChangeHistory 
            className='pointer' 
            onClick={ toggleMenu } 
            color='white' 
            size={ openButtonSize }
        />
        { props.children }
    </section>
}

export default PopupMenu;