import { useRef, useContext, useState, useEffect } from 'react';
import { SettingsContext } from './KanjiProvider';

import CheckboxWithTooltip from './CheckboxWithTooltip';

import './CheckboxWithTooltip.css';


import getConjugation from './methods/getConjugations';

function Settings(props){
    const dialogRef = useRef(null);

    const [settings, setSettings] = useContext(SettingsContext);
    const [possibleSettings, setPossibleSettings] = useState(false);

    const [showTeFormTooltip, setShowTeFormTooltip] = useState(false);
    // const [showPotentialTooltip, setShowPotentialTooltip] = useState(false);

    // Gets the latest settings. Checks for combinations that cant be true.
    useEffect(() => {

        if (!settings.affirmative && !settings.negative
             || !settings.formal && !settings.informal 
             || tenseCheck()) {
            setPossibleSettings(true);
            }
        else setPossibleSettings(false);

        // deps determines where the useEffect should trigger.
    }, [settings.affirmative, settings.negative, settings.formal, settings.informal, 
        settings.present, settings.past, settings.teForm, settings.potential, settings.volitional,
        settings.passive, settings.causative, settings.causativePassive, settings.imperative, settings.conditional]);

    function tenseCheck() {
        // slice starts at index 4 to start at tense settings.
        const tenses = Object.entries(settings).slice(4); 
    
        // Return true if all tenses are false.
        return tenses.every(([, value]) => !value);
    }

    function formalityToggle(){
        const twoConjugations = ["teForm", "causativePassive", "imperative", "conditional"];

        const tenses = Object.entries(settings).slice(4); 
        
        if (tenses.some(([tense, value]) => value && !twoConjugations.includes(tense) || tenseCheck())){
            return (
                <div>
                    <p>Formality</p>
                    <input type="checkbox" id="FormalID" name="formal" onChange = {handleCheckboxChange}/>
                    <label htmlFor="FormalID"> Formal </label>
            
                    <input type="checkbox" id="InformalID" name="informal" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="InformalID"> Informal </label><br/>
                </div>);

        } else return null;
    }

    function assertionToggle(){
        // hides of assertion if only Volitional is chosen.

        const tenses = Object.entries(settings).slice(4); 


        if (tenses.some(([tense, value]) => value && "volitional" != tense || tenseCheck())){
            return (
                <div>
                    <p>Assertion</p>
                    <input type="checkbox" id="AffirmativeID" name="affirmative" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="AffirmativeID"> Affirmative </label>

                    <input type="checkbox" id="NegativeID" name="negative" onChange = {handleCheckboxChange}/>
                    <label htmlFor="NegativeID"> Negative </label><br/>
                </div>);

        } else return null;
    }
    
    const handleToggleChange = (event) => {
        const { name, checked } = event.target;

        const setFuriganaToggle = props.setFuriganaToggle;
        const setStreakToggle = props.setStreakToggle;
        const setTriesToggle = props.setTriesToggle;

        switch (name) {
            case "furigana":
                setFuriganaToggle(checked);
                break;
            case "tries":
                setTriesToggle(checked);
                break;
            case "streak":
                setStreakToggle(checked);
                break;
            default:
                break;
        }
    };
    
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setSettings((prevState) => ({...prevState, [name]: checked}));
    }

    function openSettings(){
        if (!dialogRef.current){
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal();
    }

    function applySettings(){
        const data = props.kanjiData;
        const setConjugationData = props.setConjugationData;

        getConjugation(data, setConjugationData, settings)
        dialogRef.current.close()
    }

    return (
        <div>
            <button onClick={openSettings}>Settings</button>
            <dialog ref={dialogRef}>
                <p>Appearence Settings</p>
                <input type="checkbox" id="furiganaID" name="furigana" onChange = {handleToggleChange} defaultChecked/>
                <label htmlFor="furiganaID"> Furigana </label> <br/>

                <input type="checkbox" id="streakID" name="streak" onChange = {handleToggleChange} defaultChecked/>
                <label htmlFor="streakID"> Show Streak🔥 </label>
                <input type="checkbox" id="triesID" name="tries" onChange = {handleToggleChange} defaultChecked/>
                <label htmlFor="triesID"> Show Tries </label>

                <fieldset>
                    <p>Conjugation Settings</p>
                    <form onSubmit={applySettings}>
                        {assertionToggle()}

                        {formalityToggle()}

                        <p>Tenses</p>
                            <input type="checkbox" id="presentID"  onChange = {handleCheckboxChange}/>
                            <label htmlFor="presentID"> Present </label>

                            <input type="checkbox" id="pastID" onChange = {handleCheckboxChange} defaultChecked/>
                            <label htmlFor="pastID"> Past </label>

                            <CheckboxWithTooltip
                                id="teFormID"
                                label="Te-Form"
                                tooltipText="To link actions, events and states."
                                onChange={handleCheckboxChange}
                            /> <br/>
                            <CheckboxWithTooltip
                                id="potentialID"
                                label="Potential"
                                tooltipText="The ability to able to do."
                                onChange={handleCheckboxChange}
                            />
                            <CheckboxWithTooltip
                                id="volitionalID"
                                label="Volitional"
                                tooltipText="Invitational Let's/Shall we?"
                                onChange={handleCheckboxChange}
                            />
                            <CheckboxWithTooltip
                                id="passiveID"
                                label="Passive"
                                tooltipText="Expresses that the verb is done to someone."
                                onChange={handleCheckboxChange}
                            /> <br/>
                            <CheckboxWithTooltip
                                id="causativeID"
                                label="Causative"
                                tooltipText="Expresses someone is forced to do the verb. "
                                onChange={handleCheckboxChange}
                            />
                            <CheckboxWithTooltip
                                id="causativePassiveID"
                                label="Causative Passive"
                                tooltipText="Expresses someone or something caused an action to occur."
                                onChange={handleCheckboxChange}
                            /> 
                            <CheckboxWithTooltip
                                id="imperativeID"
                                label="Imperative"
                                tooltipText="Expresses an order."
                                onChange={handleCheckboxChange}
                            /> <br/>
                            <CheckboxWithTooltip
                                id="conditionalID"
                                label="Conditional (ば)"
                                tooltipText="Similar to the meaning if/when"
                                onChange={handleCheckboxChange}
                            /> 
                    </form> 
                </fieldset>
                <button type="submit" disabled={possibleSettings} onClick={applySettings}> Apply </button>


            </dialog>
        </div>
    );
}
export default Settings;
