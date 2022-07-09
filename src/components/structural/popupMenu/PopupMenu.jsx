import './PopupMenu.css';
import { MdChangeHistory } from 'react-icons/md';
import { useState } from 'react';

const openButtonSize = 32;
function PopupMenu({ children }) {
    const [active, setActive] = useState(false);

    const toggleMenu = () => {
        setActive(a => !a);
    }
    return <section className={`popup-menu ${active ? 'popup-menu-active' : ''}`}>
        <MdChangeHistory className='pointer' onClick={toggleMenu} color='white' size={openButtonSize}/>
        { children }
    </section>
}

export default PopupMenu;