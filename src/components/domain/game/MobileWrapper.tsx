import React, { FC, ReactNode, useEffect } from "react";
import config from "../../../domain/game/gameConfiguration";
import { useGameDispatch } from "../../../domain/game/store/hooks";

interface MobileWrapperProps {
    children?: ReactNode;
}

const MobileWrapper : FC<MobileWrapperProps> = (props) => {
    const dispatch = useGameDispatch();

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth <= config.mobileLimit.width) {
                dispatch({type: 'changedevice', isMobile: true});
            } else {
                dispatch({type: 'changedevice', isMobile: false});
            }
        }
        onResize();

        window.addEventListener('resize', onResize);
        
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [dispatch]);
    
    return <>{props.children}</>;
}

export default MobileWrapper;