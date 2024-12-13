// API Base URL and Key
const API_URL = "https://api.twelvedata.com/time_series";
const API_KEY = "33799c864c5746cc9e6b58008b900841";

// Function to fetch stock data
async function fetchStockData(symbol) {
  try {
    // Construct the API request URL
    const url = `${API_URL}?symbol=${symbol}&interval=1min&apikey=${API_KEY}`;
    const response = await fetch(url);

    // Parse the response as JSON
    const data = await response.json();

    // Check if there's an error in the response
    if (data.status === "error") {
      throw new Error(data.message);
    }

    // Extract the necessary information
    const currentPrice = data.values[0]?.close || "N/A";
    const highPrice = Math.max(...data.values.map(value => parseFloat(value.high))) || "N/A";
    const lowPrice = Math.min(...data.values.map(value => parseFloat(value.low))) || "N/A";

    // Update the UI with fetched data
    updateUI({ currentPrice, highPrice, lowPrice });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    alert("Unable to fetch stock data. Please try again later.");
  }
}

// Function to update the UI with stock data
function updateUI({ currentPrice, highPrice, lowPrice }) {
  const metrics = document.querySelectorAll(".metric .metric-value");
  
  if (metrics.length === 3) {
    metrics[0].textContent = `$${currentPrice}`;
    metrics[1].textContent = `$${highPrice}`;
    metrics[2].textContent = `$${lowPrice}`;
  } else {
    console.error("Metrics elements are not found in the DOM");
  }
}

// Event Listener for the Analyze Button
document.querySelector(".primary-btn").addEventListener("click", () => {
  const stockInput = document.querySelector(".stock-input").value.trim();

  if (!stockInput) {
    alert("Please enter a stock symbol.");
    return;
  }

  // Fetch stock data for the entered symbol
  fetchStockData(stockInput);
});
