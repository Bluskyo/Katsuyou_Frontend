import { useRef, useState } from 'react';

import getConjugation from './methods/getConjugations';

function Settings(props){
    const dialogRef = useRef(null);
    const data = props.kanjiData;
    const setConjugationData = props.setConjugationData;

    const [checkbox, setCheckbox] = useState({
        affirmative : true,
        negative: false,
        formal: true,
        informal: false, 
        present: true,
        past: false
    })

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        setCheckbox((prevState) => ({...prevState, [name]: checked}));
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
        getConjugation(data, setConjugationData, checkbox)
        dialogRef.current.close()
    }

    return (
        <div>
            <button onClick={openSettings}>Settings</button>
            <dialog ref={dialogRef}>
                <p>Conjugation settings</p>
                <form onSubmit={applySettings}>
                    <input type="checkbox" id="AffirmativeID" name="affirmative" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="AffirmativeID"> Affirmative </label>
                    <input type="checkbox" id="NegativeID" name="negative" onChange = {handleCheckboxChange}/>
                    <label htmlFor="NegativeID"> Negative </label><br/>

                    <input type="checkbox" id="FormalID" name="formal" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="FormalID"> Formal </label>
                    <input type="checkbox" id="InformalID" name="informal" onChange = {handleCheckboxChange}/>
                    <label htmlFor="InformalID"> Informal </label><br/>

                    <input type="checkbox" id="presentID" name="present" onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="presentID"> Present </label><br/>
                    <input type="checkbox" id="pastID" name="past"onChange = {handleCheckboxChange}/>
                    <label htmlFor="pastID"> Past </label><br/>
                </form>
                <button type="submit" onClick={applySettings}> Apply </button>
            </dialog>
        </div>
    );
}
export default Settings
