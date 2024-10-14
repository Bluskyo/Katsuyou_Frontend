// should be same as Settings's checkbox default.

export var defaultSettings = {        
    affirmative : true,
    negative: false,
    formal: false,
    informal: true, 
    present: false,
    past: true,
    teForm: false,
    potential: false,
    volitional: false,
    passive: false,
    causative: false,
    causativePassive: false,
    imperative: false,
    conditional: false,
    
}

export function getConjugation(data, setData, settings = defaultSettings) {

    console.log(settings);
    
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