// should be same as Settings's checkbox default.

var defaultSettings = {        
    affirmative : true,
    negative: false,
    formal: true,
    informal: false, 
    present: true,
    past: false
}

export function getConjugation(data, setData, settings = defaultSettings) {

    // console.log(settings);
    
    const encodedKanji = encodeURIComponent(data.kanji);
    const encodedTag = encodeURIComponent(data.tag);

    return fetch('http://localhost:8080/settings', {
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
        // console.log('Success:', data);
        return data;
    })
    .then(data => setData(data))
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default getConjugation;