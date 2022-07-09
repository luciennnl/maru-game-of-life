import './ButtonList.css';
function ButtonList({ functions }) {
    return <section className='button-list'>
        { functions ? functions.map(f => 
            <button className='button-list-button' onClick={f.callback}>{ f.name }</button>) : ''
        }
    </section>
}

export default ButtonList;