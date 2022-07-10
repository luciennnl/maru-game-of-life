import React, { useState, FC } from 'react';
import { MdChangeHistory } from 'react-icons/md';
import './PopupMenu.css';

const openButtonSize = 32;

interface PopupMenuProps {
    children: React.ReactNode;
}

const PopupMenu:FC<PopupMenuProps> = (props) => {
    const [active, setActive] = useState(false);

    const toggleMenu = () : void => {
        setActive(a => !a);
    }
    return <section className={`popup-menu ${active ? 'popup-menu-active' : ''}`}>
        <MdChangeHistory className='pointer' onClick={toggleMenu} color='white' size={openButtonSize}/>
        { props.children }
    </section>
}

export default PopupMenu;