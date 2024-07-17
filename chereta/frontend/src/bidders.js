const biddersList = document.getElementById('bidders-list');

// Function to fetch bidders based on tender ID
async function fetchBidders() {
    const tenderId = localStorage.getItem('tenderId'); // Fetch tender ID from localStorage
    const response = await fetch(`http://localhost:3000/tenders/${tenderId}/bids`);
    
    if (!response.ok) {
        console.error('Failed to fetch bidders');
        return;
    }
    
    const bidders = await response.json();
    renderBidders(bidders);
}

// Function to render bidders list
function renderBidders(bidders) {
    biddersList.innerHTML = ''; // Clear previous content

    if (bidders.length === 0) {
        biddersList.innerHTML = '<p>No bidders found for this tender.</p>';
        return;
    }

    const ul = document.createElement('ul');
    bidders.forEach(bidder => {
        const li = document.createElement('li');
        li.textContent = `${bidder.participantName} (${bidder.participantEmail})`;
        
        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select Winner';
        selectButton.addEventListener('click', () => handleSelectWinner(bidder._id)); // Adjust to use actual bidder ID
        
        li.appendChild(selectButton);
        ul.appendChild(li);
    });
    biddersList.appendChild(ul);
}

// Function to handle selecting a winner (frontend logic)
function handleSelectWinner(bidderId) {
    // Example logic to indicate winner selection (frontend UI update)
    alert(`Selected bidder ID ${bidderId} as the winner.`);
}

// Fetch bidders when the page loads
fetchBidders();