document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    });

    if (response.ok) {
        console.log("response")
        const result = await response.json();
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('role', result.role);
        alert('Login successful!');

        function navigateToDashboard(role) {
            let path = '';

            if (role === 'preparer') {
                path = '../public/dashboard-preparer.html';  // Adjust path as necessary
            } else if (role === 'participant') {
                
                path = '../public/dashboard-participant.html';
            } else {
                // Handle any other roles or scenarios here
                console.error('Unknown role:', role);
                return;  // Exit function if role is unknown
            }
        
            // Navigate to the determined path
            window.location.href = path;
        }
        
        // Usage example in your login function
        if (result.role) {
            navigateToDashboard(result.role);
        } else {
            alert('Role information missing in login response!');
        }
    } else {
        console.log("fail")
        alert('Login failed! Please check your credentials.');
    }
});