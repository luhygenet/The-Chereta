window.onload = function() {
    // Example data (replace with actual data retrieval logic)
    const userProfile = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Participant", // Example role, adjust as needed
        // Add more profile fields as needed
    };

    // Update profile information in the HTML
    document.getElementById('profile-name').textContent = userProfile.name;
    document.getElementById('profile-email').textContent = userProfile.email;
    document.getElementById('profile-role').textContent = userProfile.role;
    // Add more fields as needed
};

function logout() {
    // Clear user session or token logic (example using localStorage)
    localStorage.removeItem('token'); // Remove token from localStorage

    // Redirect to login page or homepage
    window.location.href = 'login.html'; // Replace with your login page URL
}