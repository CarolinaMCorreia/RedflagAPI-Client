console.log("loaded redflags.js")


document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html'; // Adjust if your main page has a different name
});

async function fetchRedflags() {
    try {
        const response = await fetch('http://localhost:5000/redflags');
        const redflags = await response.json();

        const redflagsList = document.getElementById('redflagsList');
        redflagsList.innerHTML = ''; // Clear any existing items

        redflags.forEach(flag => {
            const li = document.createElement('li');
            li.textContent = flag.description; // Adjust if you want to show more details
            redflagsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching redflags:', error);
    }
}

// Call the function to fetch redflags when the script loads
fetchRedflags();
