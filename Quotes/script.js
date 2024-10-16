document.getElementById('new-quote').addEventListener('click', generateQuote);

function generateQuote() {
    fetch('https://strangerthings-quotes.vercel.app/api/quotes')
        .then(response => response.json())
        .then(data => {
            // Since the API returns an array of quotes, we access the first item
            const quoteData = data[0];
            document.getElementById('quote').textContent = `"${quoteData.quote}"`;
            document.getElementById('author').textContent = `- ${quoteData.author}`;
        })
        .catch(error => {
            document.getElementById('quote').textContent = "Oops! Something went wrong.";
            document.getElementById('author').textContent = "";
            console.error('Error fetching quote:', error);
        });
}
