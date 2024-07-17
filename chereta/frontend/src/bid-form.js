document.addEventListener('DOMContentLoaded', () => {
    const bidForm = document.getElementById('bid-form');

    bidForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const participantName = document.getElementById('participant-name').value;
        const participantEmail = document.getElementById('participant-email').value;
        const biddingDocument = document.getElementById('bidding-document').value;

        const bidData = {
            participantName,
            participantEmail,
            biddingDocument
        };

        try {
            const tenderId = localStorage.getItem('tenderId');
            const response = await fetch(`http://localhost:3000/tenders/${tenderId}/bids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bidData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit bid');
            }

            alert('Bid submitted successfully!');
            // Optionally redirect or perform other actions after successful bid submission
        } catch (error) {
            console.error('Error submitting bid:', error);
            alert('Error submitting bid. Please try again.');
        }
    });
});