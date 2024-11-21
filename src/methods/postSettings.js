
export async function postSettings(settings) {
    try {
        const response = await fetch('http://localhost:8080/api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data_1 = await response.json();
        const data_2 = data_1;
        return data_2;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default postSettings;