const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes =  [];
let getQuoteErrorCounter = 0;

const showLoadingBar = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingBar = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

const newQuote = () => {
    showLoadingBar();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingBar();
}

// Get Quotes From API   
async function getQuotes() {
    showLoadingBar();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        if (getQuoteErrorCounter = 10) {
            alert(err);
        } else {
            getQuoteErrorCounter += 1;
            getQuotes();
        } 
    }
}

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https:/twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
