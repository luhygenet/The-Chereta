document.getElementById('create-tender-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        deadline: formData.get('deadline'),
        category: formData.get('category'),
        document: formData.get('document'),
        biddingDocument: formData.get('bidding-document') // Add this line for the string field
    };

    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/tenders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Tender created successfully!');
        window.location.href = '../public/dashboard-preparer.html';
    } else {
        alert('Failed to create tender!');
    }
});