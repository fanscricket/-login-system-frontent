const API_URL = "https://login-system-backend-vkku.onrender.com";


// Login Function
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    alert(result.message);
    fetchAttempts(); // Refresh login attempts list
}

// Fetch Login Attempts
async function fetchAttempts() {
    const response = await fetch(`${API_URL}/attempts`);
    const attempts = await response.json();

    const attemptsList = document.getElementById("attemptsList");
    attemptsList.innerHTML = "";

    attempts.forEach(attempt => {
        const li = document.createElement("li");
        li.textContent = `${attempt.username} - ${attempt.timestamp}`;
        attemptsList.appendChild(li);
    });
}

// Load login attempts on page load
fetchAttempts();
