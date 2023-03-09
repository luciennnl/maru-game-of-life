import React, { FC } from 'react';
import './TitleBanner.css';

/**
 * Props for the TitleBanner component
 */
interface TitleBannerProps {
    title: string;
    subtitle: string;
}

/**
 * React component representing a title banner that covers the width of the containing element
 * @param props TitleBannerProps
 * @returns JSX
 */
const TitleBanner:FC<TitleBannerProps> = (props) => {
    return <section 
        className='title-banner'
    >
        <h1 
            className='title-title'
        >
            { props.title }
        </h1>
        { props.subtitle ? 
            <h3 
                className='title-subtitle'
            >
                { props.subtitle }
            </h3> : ''}
    </section>
}

export default TitleBanner;