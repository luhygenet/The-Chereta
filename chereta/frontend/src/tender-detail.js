const categoryImages = {
    'medical': '../asset/med.jpg',
    'catering': '../asset/catering.jpeg',
    'construction': '../asset/const.jfif',
    'goods': '../asset/goods.webp',
    'other': '../asset/g.jfif',

    // Add more categories and image URLs as needed
};

// Function to fetch and display tender details
async function fetchTenderDetails() {
    try {
        const tenderId = localStorage.getItem('tenderId');
        const response = await fetch(`http://localhost:3000/tenders/${tenderId}`);
        const tender = await response.json();

        // Update DOM with fetched data
        const tenderImage = document.getElementById('tender-image');
        tenderImage.src = categoryImages[tender.category] || '../asset/default-image.jpg';
        tenderImage.alt = `Image for ${tender.category} tender`;

        document.getElementById('tender-title').textContent = tender.title;
        document.getElementById('tender-description').textContent = tender.description;
        document.getElementById('tender-category').textContent = `Category: ${tender.category}`;
        document.getElementById('tender-document').textContent = `(see attached document)`;
        document.getElementById('tender-deadline').textContent = `Deadline: ${tender.deadline}`;

        const userRole = localStorage.getItem('role');
        if (userRole === 'participant') {
            document.getElementById('bid-button').style.display = 'block';
            document.getElementById('bid-button').addEventListener('click', () => {
                window.location.href = 'bid-form.html'; // Redirect to bid form page
            });
        } else if (userRole === 'preparer') {
            document.getElementById('bid-button').style.display = 'none'; // Hide bid button for preparer
        }
    } catch (error) {
        console.error('Error fetching tender details:', error);
    }
}

// Call fetchTenderDetails function when the page loads
fetchTenderDetails();