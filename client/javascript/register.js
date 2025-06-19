
function registerUser() {
    const username = document.getElementById('nameInput').value;
    const userEmail = document.getElementById('emailInput').value;

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: `${username}`, email: `${userEmail}` }),
    };

    // POST request
    fetch('http://localhost:9000/api/register', req)
        .then(response => response.json())
        .then(data => console.log('POST:', data))
        .catch((error) => console.error('Error:', error));
}

document.getElementById("submitButton").addEventListener("click", registerUser);
