import { useRef, useContext, useState, useEffect } from 'react';
import { SettingsContext } from './KanjiProvider';
import { Tooltip } from 'react-tooltip'

function Settings(props){
    const dialogRef = useRef(null);
    const [settings, setSettings] = useContext(SettingsContext);
    const [validSettings, setValidSettings] = useState(false);

    const setTriggerUpdate = props.setTriggerUpdate;
    
    // Gets the latest settings. Checks for combinations that cant be true. // change from useEffect?
    useEffect(() => {

        if (!settings.affirmative && !settings.negative
             || !settings.formal && !settings.informal 
             || tenseCheck() || jlptCheck()) {
            setValidSettings(true);
            }
        else setValidSettings(false);

        // deps determines where the useEffect should trigger.
    }, [settings.N1, settings.N2,settings.N3, settings.N4, settings.N5,
         settings.affirmative, settings.negative, settings.formal, settings.informal, 
        settings.present, settings.past, settings.teForm, settings.potential, settings.volitional,
        settings.passive, settings.causative, settings.causativePassive, settings.imperative, settings.conditional]);


    // for conjugation settings.
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setSettings((prevState) => ({...prevState, [name]: checked}));
    }

    // for appearennce settings.
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

    function tenseCheck() {
        // slice starts at index 9 to start at tense settings.
        const tenses = Object.entries(settings).slice(9); 
    
        // Return true if all tenses are false.
        return tenses.every(([, value]) => !value);
    }

    function jlptCheck() {
        const levels = Object.entries(settings).slice(0, 5); 
    
        return levels.every(([, value]) => !value);
    }

    function formalityToggle(){
        const twoConjugations = ["teForm", "causativePassive", "imperative", "conditional"];

        const tenses = Object.entries(settings).slice(9); 
        
        if (tenses.some(([tense, value]) => value && !twoConjugations.includes(tense) || tenseCheck())){
            return (
                <div>
                    <p>Formal degree</p>
                    <input type="checkbox" id="FormalID" name="formal" onChange = {handleCheckboxChange}/>
                    <label htmlFor="FormalID"> Formal </label>
            
                    <input type="checkbox" id="InformalID" name="informal" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="InformalID"> Informal </label><br/>
                </div>);

        } else return null;
    }

    function assertionToggle(){
        // hides of assertion if only Volitional is chosen.

        const tenses = Object.entries(settings).slice(9); 


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

    function openSettings(){
        if (!dialogRef.current){
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal();
    }

    function applySettings(){

        setTriggerUpdate(prev => prev + 1);

        dialogRef.current.close()
    }


    return (
        <div>
            <button onClick={openSettings}>Settings</button>
            <dialog ref={dialogRef}>
                <p>Appearence Settings</p>

                <input type="checkbox" id="streakID" name="streak" onChange = {handleToggleChange} defaultChecked/>
                <label htmlFor="streakID"> Show Streak🔥 </label>
                <input type="checkbox" id="triesID" name="tries" onChange = {handleToggleChange} defaultChecked/>
                <label htmlFor="triesID"> Show Tries </label>

                <p data-tooltip-id="JLPT" data-tooltip-content="Japanese-Language Proficiency Test">JLPT Levels</p>
                <Tooltip id="JLPT"/>

                <input type="checkbox" id="N5ID" name="N5" onChange = {handleCheckboxChange} defaultChecked/>
                <label htmlFor="N5ID"> N5 </label> 
                <input type="checkbox" id="N4ID" name="N4" onChange = {handleCheckboxChange}/>
                <label htmlFor="N4ID"> N4 </label> 
                <input type="checkbox" id="N3ID" name="N3" onChange = {handleCheckboxChange}/>
                <label htmlFor="N3ID"> N3 </label> 
                <input type="checkbox" id="N2ID" name="N2" onChange = {handleCheckboxChange}/>
                <label htmlFor="N2ID"> N2 </label> 
                <input type="checkbox" id="N1ID" name="N1" onChange = {handleCheckboxChange}/>
                <label htmlFor="N1ID"> N1 </label> 

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
                    <label htmlFor="teFormID" data-tooltip-id="teForm-tooltip" data-tooltip-content="Links actions, events and states."> Te-Form </label><br/>
                    <Tooltip id="teForm-tooltip"/>

                    <input type="checkbox" id="potentialID" name="potential" onChange = {handleCheckboxChange}/>
                    <label htmlFor="potentialID" data-tooltip-id="potential-tooltip" data-tooltip-content="Expresses the ability to able to do."> Potential </label>
                    <Tooltip id="potential-tooltip"/>

                    <input type="checkbox" id="volitionalID" name="volitional" onChange = {handleCheckboxChange}/>
                    <label htmlFor="volitionalID" data-tooltip-id="volitional-tooltip" data-tooltip-content="Invitational Let's/Shall we?"> Volitional </label>
                    <Tooltip id="volitional-tooltip"/>

                    <input type="checkbox" id="passiveID" name="passive" onChange = {handleCheckboxChange}/>
                    <label htmlFor="passiveID" data-tooltip-id="passive-tooltip" data-tooltip-content="Expresses that the verb is done to someone."> Passive </label><br/>
                    <Tooltip id="passive-tooltip"/>

                    <input type="checkbox" id="causativeID" name="causative" onChange = {handleCheckboxChange}/>
                    <label htmlFor="causativeID" data-tooltip-id="causative-tooltip" data-tooltip-content="Expresses someone is forced to do the something."> Causative </label>
                    <Tooltip id="causative-tooltip"/>

                    <input type="checkbox" id="causativePassiveID" name="causativePassive" onChange = {handleCheckboxChange}/>
                    <label htmlFor="causativePassiveID" data-tooltip-id="causativePassive-tooltip" data-tooltip-content="Expresses someone or something caused an action to occur."> Causative Passive </label>
                    <Tooltip id="causativePassive-tooltip"/>

                    <input type="checkbox" id="imperativeID" name="imperative" onChange = {handleCheckboxChange}/>
                    <label htmlFor="imperativeID" data-tooltip-id="imperative-tooltip" data-tooltip-content="Expresses an order."> Imperative </label><br/>
                    <Tooltip id="imperative-tooltip"/>

                    <input type="checkbox" id="conditionalID" name="conditional" onChange = {handleCheckboxChange}/>
                    <label htmlFor="conditionalID" data-tooltip-id="conditional-tooltip" data-tooltip-content="Expresses a conditional statement. (meaning if/when)"> Conditional (ば) </label>
                    <Tooltip id="conditional-tooltip"/>
                </form> 
                <button type="submit" disabled={validSettings} onClick={applySettings}> Apply </button>
            </dialog>
        </div>
    );
}
export default Settings;