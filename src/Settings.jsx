import { useRef, useState, useContext  } from 'react';
import { KanjiContext } from './KanjiProvider';


function Settings(){
    const dialogRef = useRef(null);
    const data = useContext(KanjiContext);

    const [checkbox, setCheckbox] = useState({
        affirmative : true,
        negative: false,
        formal: true,
        informal: false, 
        present: false,
        past: true
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
        console.log(checkbox)
        const encodedKanji = encodeURIComponent(data.kanji);
        const encodedTag = encodeURIComponent(data.tag);

        fetch('http://localhost:8080/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'tag': encodedTag,
                'kanji': encodedKanji
            },
            body: JSON.stringify(checkbox),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

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

                    <input type="checkbox" id="presentID" name="present" onChange = {handleCheckboxChange}/>
                    <label htmlFor="presentID"> Present </label><br/>
                    <input type="checkbox" id="pastID" name="past"onChange = {handleCheckboxChange} defaultChecked/>
                    <label htmlFor="pastID"> Past </label><br/>
                </form>
                <button type="submit" onClick={applySettings}> Apply </button>
            </dialog>
        </div>
    );
}
export default Settings
