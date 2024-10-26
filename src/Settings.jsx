import { useRef, useContext, useState, useEffect } from 'react';
import { SettingsContext } from './KanjiProvider';


import getConjugation from './methods/getConjugations';

function Settings(props){
    const dialogRef = useRef(null);

    const [settings, setSettings] = useContext(SettingsContext);
    const [possibleSettings, setPossibleSettings] = useState(false);

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

                <p>Conjugation Settings</p>
                <form onSubmit={applySettings}>
                    {assertionToggle()}

                    {formalityToggle()}

                    <p>Tenses</p>
                    <input type="checkbox" id="presentID" name="present" onChange = {handleCheckboxChange}/>
                    <label htmlFor="presentID"> Present </label>

                    <input type="checkbox" id="pastID" name="past" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="pastID"> Past </label>

                    <input type="checkbox" id="teFormID" name="teForm" onChange = {handleCheckboxChange}/>
                    <label htmlFor="teFormID"> Te-Form </label><br/>

                    <input type="checkbox" id="potentialID" name="potential" onChange = {handleCheckboxChange}/>
                    <label htmlFor="potentialID"> Potential </label>

                    <input type="checkbox" id="volitionalID" name="volitional" onChange = {handleCheckboxChange}/>
                    <label htmlFor="volitionalID"> Volitional </label>

                    <input type="checkbox" id="passiveID" name="passive" onChange = {handleCheckboxChange}/>
                    <label htmlFor="passiveID"> Passive </label><br/>

                    <input type="checkbox" id="causativeID" name="causative" onChange = {handleCheckboxChange}/>
                    <label htmlFor="causativeID"> Causative </label>

                    <input type="checkbox" id="causativePassiveID" name="causativePassive" onChange = {handleCheckboxChange}/>
                    <label htmlFor="causativePassiveID"> Causative Passive </label>

                    <input type="checkbox" id="imperativeID" name="imperative" onChange = {handleCheckboxChange}/>
                    <label htmlFor="imperativeID"> Imperative </label><br/>

                    <input type="checkbox" id="conditionalID" name="conditional" onChange = {handleCheckboxChange}/>
                    <label htmlFor="conditionalID"> Conditional (ば) </label>
                </form> 
                <button type="submit" disabled={possibleSettings} onClick={applySettings}> Apply </button>
            </dialog>
        </div>
    );
}
export default Settings;
