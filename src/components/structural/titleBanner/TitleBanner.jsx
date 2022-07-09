import './TitleBanner.css';
function TitleBanner({ title, subtitle }) {
    return <section className='title-banner'>
        <h1 className='title-title'>{title}</h1>
        { subtitle ? <h3 className='title-subtitle'>{subtitle}</h3> : ''}
    </section>
}

export default TitleBanner;