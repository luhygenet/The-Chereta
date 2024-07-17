window.onload = async function() {
    const searchInput = document.getElementById('search-bar');
    const tendersList = document.getElementById('tenders-list');
    const filterButtons = document.querySelectorAll('.filter-buttons button');

    let selectedCategory = '';

    // Fetch tenders function
    async function fetchTenders() {
        try {
            const response = await fetch('http://localhost:3000/tenders');
            if (!response.ok) {
                throw new Error('Failed to fetch tenders');
            }
            const tenders = await response.json();
            displayTenders(tenders);
        } catch (error) {
            console.error('Error fetching tenders:', error.message);
        }
    }

    // Display filtered tenders
    function displayTenders(tenders) {
        tendersList.innerHTML = '';
        const searchQuery = searchInput.value.toLowerCase();

        tenders.forEach(tender => {
            if (
                tender.title.toLowerCase().includes(searchQuery) &&
                (selectedCategory === '' || selectedCategory === 'all' || tender.category.toLowerCase() === selectedCategory)
            ) {
                const listItem = document.createElement('li');
                listItem.textContent = `${tender.title} - ${tender.category}`;
                tendersList.appendChild(listItem);

                listItem.addEventListener('click', () => {
                    localStorage.setItem('tenderId', tender._id);
                    window.location.href = 'tender-detail.html';
                });
            }
        });
    }

    // Filter by category function
    function filterByCategory(category) {
        selectedCategory = category;
        fetchTenders();
    }

    // Event listeners
    searchInput.addEventListener('input', fetchTenders);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.id.toLowerCase().replace('filter-', '');
            filterByCategory(category);
        });
    });

    // Initial fetch on page load
    fetchTenders();
};