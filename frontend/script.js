// script.js
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const greetButton = document.getElementById('greetButton');
    const greetingDisplay = document.getElementById('greetingDisplay');

    // --- IMPORTANT CHANGE HERE ---
    // Use the actual, absolute URL of your deployed backend Cloud Run service
    // Replace 'YOUR_BACKEND_CLOUD_RUN_URL' with the URL you got from Step 1
    const BACKEND_BASE_URL = 'http://34.30.190.75:5000';
    const API_ENDPOINT = `${BACKEND_BASE_URL}/api/greet`;
    // --- END IMPORTANT CHANGE ---

    greetButton.addEventListener('click', async () => {
        const name = nameInput.value.trim();

        if (name === "") {
            greetingDisplay.textContent = "Please enter your name!";
            greetingDisplay.style.color = '#dc3545';
            return;
        }

        try {
            // Make the request directly to the backend's absolute URL
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
            });

            if (!response.ok) { // Check for HTTP errors (e.g., 400, 500)
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            greetingDisplay.textContent = data.message;
            greetingDisplay.style.color = '#28a745'; // Green for success

        } catch (error) {
            console.error('Error calling backend:', error);
            greetingDisplay.textContent = `Error: ${error.message}`;
            greetingDisplay.style.color = '#dc3545'; // Red for error
        }
    });
});
