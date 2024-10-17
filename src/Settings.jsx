import { useRef, useContext } from 'react';
import { SettingsContext } from './KanjiProvider';


import getConjugation from './methods/getConjugations';

function Settings(props){
    const dialogRef = useRef(null);
    const data = props.kanjiData;
    const setConjugationData = props.setConjugationData;

    const [settings, setSettings] = useContext(SettingsContext);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setSettings((prevState) => ({...prevState, [name]: checked}));
    };

    function openSettings() {
        if (!dialogRef.current){
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal();
    }

    function applySettings() {
        getConjugation(data, setConjugationData, settings)
        dialogRef.current.close()
    }

    return (
        <div>
            <button onClick={openSettings}>Settings</button>
            <dialog ref={dialogRef}>
                <p>Conjugation Settings</p>
                <form onSubmit={applySettings}>
                    <p>Assertion</p>
                    <input type="checkbox" id="AffirmativeID" name="affirmative" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="AffirmativeID"> Affirmative </label>

                    <input type="checkbox" id="NegativeID" name="negative" onChange = {handleCheckboxChange}/>
                    <label htmlFor="NegativeID"> Negative </label><br/>

                    <p>Formality</p>

                    <input type="checkbox" id="FormalID" name="formal" onChange = {handleCheckboxChange} />
                    <label htmlFor="FormalID"> Formal </label>

                    <input type="checkbox" id="InformalID" name="informal" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="InformalID"> Informal </label><br/>

                    <p>Tenses</p>

                    <input type="checkbox" id="presentID" name="present" onChange = {handleCheckboxChange}/>
                    <label htmlFor="presentID"> Present </label>

                    <input type="checkbox" id="pastID" name="past"onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="pastID"> Past </label>

                    <input type="checkbox" id="teFormID" name="teForm"onChange = {handleCheckboxChange}/>
                    <label htmlFor="teFormID"> Te-Form </label><br/>

                    <input type="checkbox" id="potentialID" name="potential"onChange = {handleCheckboxChange}/>
                    <label htmlFor="potentialID"> Potential </label>

                    <input type="checkbox" id="volitionalID" name="volitional"onChange = {handleCheckboxChange}/>
                    <label htmlFor="volitionalID"> Volitional </label>

                    <input type="checkbox" id="passiveID" name="passive"onChange = {handleCheckboxChange}/>
                    <label htmlFor="passiveID"> Passive </label><br/>

                    <input type="checkbox" id="causativeID" name="causative"onChange = {handleCheckboxChange}/>
                    <label htmlFor="causativeID"> Causative </label>

                    <input type="checkbox" id="causativePassiveID" name="causativePassive"onChange = {handleCheckboxChange}/>
                    <label htmlFor="causativePassiveID"> Causative Passive </label>

                    <input type="checkbox" id="imperativeID" name="imperative"onChange = {handleCheckboxChange}/>
                    <label htmlFor="imperativeID"> Imperative </label><br/>

                    <input type="checkbox" id="conditionalID" name="conditional"onChange = {handleCheckboxChange}/>
                    <label htmlFor="conditionalID"> Conditional (ば) </label>


                </form> 
                <button type="submit" onClick={applySettings}> Apply </button>
            </dialog>
        </div>
    );
}
export default Settings
