window.onload = async function() {
    const openTendersList = document.getElementById('open-tenders-list');
    const closedTendersList = document.getElementById('closed-tenders-list');

    try {
        const response = await fetch('http://localhost:3000/tenders/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tenders: ' + response.statusText);
        }

        const tenders = await response.json();
        
        tenders.forEach(tender => {
            // Create card container
            const card = document.createElement('li');
            card.classList.add('card');
            card.addEventListener('click', () => {
                localStorage.setItem('tenderId', tender._id);
                window.location.href = 'tender-detail.html';
            });

            // Determine image based on category (replace with actual logic)
            let imageUrl = '';
            console.log(tender.category)
            console.log("fgyhuiogfcxfghujikokijhgvchjikolpokjhgfcvhjikol")
            switch (tender.category) {
                case 'medical':
                    console.log("it is medical")
                    imageUrl = '../asset/med.jpg'; // Example path for Category1 image
                    break;
                case 'construction':
                    imageUrl = '../asset/const.jfif'; // Example path for Category2 image
                    break;
                case 'goods':
                    imageUrl = '../asset/goods.webp'; // Example path for Category2 image
                    break;
                case 'catering':
                    imageUrl = '../asset/catering.jpeg'; // Example path for Category2 image
                    break;
                // Add more cases as needed for other categories
                case 'other':
                    imageUrl = '../asset/g.jfif'; // Example path for Category2 image
                    break;
                default:
                    imageUrl = '../assets/default.jpg'; // Default image path
                    break;
            }

            // Create image element
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = tender.title; // Replace with appropriate alt text

            // Create card content container
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            // Create title element
            const title = document.createElement('h3');
            title.classList.add('card-title');
            title.textContent = tender.title;

            // Create description element
            const description = document.createElement('p');
            description.classList.add('card-description');
            description.textContent = tender.description;

            // Append elements to card
            card.appendChild(img);
            cardContent.appendChild(title);
            cardContent.appendChild(description);
            card.appendChild(cardContent);

            // Append card to appropriate list based on tender status
            if (tender.isClosed) {
                closedTendersList.appendChild(card);
            } else {
                openTendersList.appendChild(card);
            }
        });

    } catch (error) {
        console.log('Error fetching tenders:', error.message);
        // Handle error: Display a message to the user or retry logic
    }
};