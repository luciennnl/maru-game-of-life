import React, { FC, useState } from "react";
import TutorialGuideBox from "./TutorialGuideBox";
import './TutorialOverlay.css';


const TutorialOverlay : FC = () => {
    const [activeTutorialBox, setActiveTutorialBox] = useState(0);

    const tutorialBoxes = [
        (a : boolean) => <TutorialGuideBox key='tb0' active={a} left={'15%'} top={'20%'} text={'Welcome to Maru Game of Life! This is a short tutorial, click here to continue...'} onClick={onClick}/>,
        (a : boolean) => <TutorialGuideBox key='tb1' active={a} left={'30%'} top={'20%'} text={'\u2190'.concat(' Click on the cells to turn them alive')} onClick={onClick}/>,
        (a : boolean) => <TutorialGuideBox key='tb2' active={a} left={'52%'} top={'calc(100% - 85px)'} text={'\u2190'.concat(' Click on the triangle to open up the menu')} onClick={onClick}/>,
        (a : boolean) => <TutorialGuideBox key='tb3' active={a} left={'calc(50% - 3.5rem)'} top={'50%'} text={'Have fun! :))'} onClick={onClick}/>
    ]

    function onClick() {
        setActiveTutorialBox(i => i + 1);
    }

    if (activeTutorialBox >= tutorialBoxes.length) {
        return <></>
    }

    return <section id='tutorial-overlay' >
        { tutorialBoxes.map((tb, i) => tb(activeTutorialBox === i)) }
    </section>
}

export default TutorialOverlay