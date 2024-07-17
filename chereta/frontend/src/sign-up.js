document.getElementById('role').addEventListener('change', function() {
    const role = this.value;
    const additionalFields = document.getElementById('additional-fields');
    additionalFields.innerHTML = '';

    if (role === 'preparer') {
        additionalFields.innerHTML = `
            <label for="license">License:</label>
            <input type="text" id="license" name="license" required>
        `;
    } else if (role === 'participant') {
        additionalFields.innerHTML = `
            <label for="preference">Preference:</label>
            <input type="text" id="preference" name="preference" required>
        `;
    }
});

document.getElementById('sign-up-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        password: formData.get('password'),
        role: formData.get('role'),
    };

    if (data.role === 'preparer') {
        data.license = formData.get('license');
    } else if (data.role === 'participant') {
        data.preference = formData.get('preference');
    }

    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Sign up successful!');
    } else {
        alert('Sign up failed!');
    }
});