
export function getConjugation(data, setData, settings) {
    
    const encodedKanji = encodeURIComponent(data.kanji);
    const encodedTag = encodeURIComponent(data.tag);

    return fetch('http://localhost:8080/api/settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'tag': encodedTag,
            'kanji': encodedKanji
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