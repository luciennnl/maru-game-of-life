import React, { FC, useState } from "react";
import config from "../../../domain/game/gameConfiguration";
import TutorialGuideBox from "./TutorialGuideBox";
import './TutorialOverlay.css';

/**
 * React component representing the tutorial overlay displayed at the start of the game
 * @returns JSX
 */
const TutorialOverlay : FC = () => {
    const [activeTutorialBox, setActiveTutorialBox] = useState(0);

    const tutorialBoxes = config.tutorialGuideBoxes.map(settings => (a : boolean) => <TutorialGuideBox {...settings} active={a} onClick={onClick}/>)

    function onClick() {
        setActiveTutorialBox(i => i + 1);
    }

    if (activeTutorialBox >= tutorialBoxes.length) {
        return <></>
    }

    return <section 
        id='tutorial-overlay'>
        { tutorialBoxes.map((tb, i) => tb(activeTutorialBox === i)) }
    </section>
}

export default TutorialOverlay