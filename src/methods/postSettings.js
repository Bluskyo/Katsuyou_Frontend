
export async function postSettings(settings) {
    try {
        const response = await fetch('http://localhost:8080/api/v1/settings', { // API ENDPOINT
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default postSettings;