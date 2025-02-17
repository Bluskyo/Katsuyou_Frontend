
export async function getConjugation(data, setConjugationData) {
    
    const encodedEntry = encodeURIComponent(data.entry);
    const encodedReading = encodeURIComponent(data.reading);
    const encodedPos = encodeURIComponent(data.pos);

    try {
        const response = await fetch('http://localhost:8080/api/v1/conjugation', { // API ENDPOINT
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'entry': encodedEntry,
                'reading': encodedReading,
                'pos': encodedPos
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if(result){
            setConjugationData(result)
        }
        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export default getConjugation;