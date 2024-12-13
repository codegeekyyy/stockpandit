// Define the API key and base URL
const API_KEY = "TUDHR0X7CGK64F9I";
const BASE_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY";

// Function to fetch stock data
async function fetchStockData(symbol) {
  try {
    // Build the API URL
    const url = `${BASE_URL}&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Check if the data contains valid time series
    if (data["Time Series (5min)"]) {
      const timeSeries = data["Time Series (5min)"];
      const recentTime = Object.keys(timeSeries)[0]; // Get the most recent timestamp
      const recentData = timeSeries[recentTime]; // Get the data for the most recent timestamp

      // Extract relevant data
      const openPrice = parseFloat(recentData["1. open"]);
      const closePrice = parseFloat(recentData["4. close"]);
      const trend = closePrice > openPrice ? "Upward" : "Downward";

      // Update the UI with the fetched data
      updatePredictionResults(openPrice.toFixed(2), recentTime, trend);
    } else {
      alert("No data found for the provided stock symbol.");
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    alert("An error occurred while fetching the stock data. Please try again.");
  }
}

// Function to update the prediction results on the UI
function updatePredictionResults(price, time, trend) {
  // Update the results in the HTML
  document.getElementById("predicted-price").textContent = `$${price}`;
  document.getElementById("timestamp").textContent = time;
  document.getElementById("trend").textContent = trend;
}

// Add event listener to the Predict button
document.querySelector(".primary-btn").addEventListener("click", () => {
  const stockSymbol = document.querySelector(".stock-input").value.trim(); // Get the stock symbol from input

  if (stockSymbol) {
    fetchStockData(stockSymbol); // Fetch the data for the provided symbol
  } else {
    alert("Please enter a valid stock symbol.");
  }
});
