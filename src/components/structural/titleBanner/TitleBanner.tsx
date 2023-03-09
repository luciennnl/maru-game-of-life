import React, { FC } from 'react';
import './TitleBanner.css';

interface TitleBannerProps {
    title: string;
    subtitle: string;
}

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