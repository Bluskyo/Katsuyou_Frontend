import { useRef } from 'react'

function Settings(){
    const dialogRef = useRef(null);

    function openSettings() {
        if (!dialogRef.current){
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal();
    }
    
    return (
        <div>
            <button onClick={openSettings}>Settings</button>
            <dialog ref={dialogRef}>
                <p>Test</p>
                <form>
                    <input type="checkbox" id="ID_FIELD" name="NAMEFIELD" value="VALUEFIELD" />
                    <label htmlFor="ID_FIELD"> past form</label>
                </form>
            </dialog>
        </div>
    );
}
export default Settings
