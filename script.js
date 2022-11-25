const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};
let apiQuotes = [];
const newQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = 'Anonymous';
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  complete();
};
async function getQuotes() {
  loading();
  const apiURL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent}-${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuotes();
