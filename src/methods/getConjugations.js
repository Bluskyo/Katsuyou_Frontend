
export function getConjugation(data, setData, settings) {
    
    const encodedEntry = encodeURIComponent(data.entry);
    const encodedPos = encodeURIComponent(data.pos);

    return fetch('http://localhost:8080/api/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'pos': encodedPos,
            'entry': encodedEntry
        },
        body: JSON.stringify(settings),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .then(data => setData(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default getConjugation;