// Navigation logic (basic for this example)
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href').split('.')[0] + 'Page';
        document.querySelectorAll('.container').forEach(container => {
            container.style.display = 'none';
        });
        document.getElementById(target).style.display = 'block';
    });
});

// Fetch travel recommendation data
async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
}

// Display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('recommendationResults');
    resultsContainer.innerHTML = '';
    
    if (results.length > 0) {
        results.forEach(([key, items]) => {
            items.forEach(item => {
                const resultDiv = document.createElement('div');
                resultDiv.innerHTML = `
                    <h3>${item.name}</h3>
                    <img src="${item.imageUrl}" alt="${item.name}" style="width:200px;height:auto;">
                    <p>${item.description}</p>
                `;
                resultsContainer.appendChild(resultDiv);
            });
        });
        document.getElementById('recommendations').style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<p>No recommendations found.</p>';
        document.getElementById('recommendations').style.display = 'block';
    }
}

// Search functionality
async function search() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const recommendations = await fetchRecommendations();
    
    const results = Object.entries(recommendations).filter(([key]) => 
        key.toLowerCase().includes(keyword.toLowerCase())
    );
    
    displayResults(results);
}

// Clear results
function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('recommendations').style.display = 'none';
}