import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import config from "../../../domain/game/gameConfiguration";
import { useGameDispatch, useGameSelector } from "../../../domain/game/store/hooks";

interface MobileWrapperProps {
    children?: ReactNode;
}
const MobileWrapper : FC<MobileWrapperProps> = (props) => {
    const observer = useRef(null);
    const gameState = useGameSelector(state => state.gameState);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const dispatch = useGameDispatch();
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth <= config.mobileLimit.width && !isMobile) {
                dispatch({type: 'hardreset', isMobile: true});
                setIsMobile(true);
            } else if (isMobile) {
                dispatch({type: 'hardreset', isMobile: false});
                setIsMobile(false);
            }
        }
        onResize();

        window.addEventListener('resize', onResize);
        
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);
    
    return <>{props.children}</>;
}

export default MobileWrapper;