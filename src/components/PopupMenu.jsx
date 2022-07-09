import './PopupMenu.css';
import { MdChangeHistory } from 'react-icons/md';
import { useState } from 'react';

const openButtonSize = 32;
function PopupMenu({ functions }) {
    const [active, setActive] = useState(false);

    const toggleMenu = () => {
        setActive(a => !a);
    }
    return <section className={`popup-menu ${active ? 'popup-menu-active' : ''}`}>
        <MdChangeHistory className='pointer' onClick={toggleMenu}color='white' size={openButtonSize}/>
        <section className='popup-button-list'>{ functions ? functions.map(f => <button className='popup-button' onClick={f.callback}>{ f.name }</button>) : ''}</section>
    </section>
}

export default PopupMenu;