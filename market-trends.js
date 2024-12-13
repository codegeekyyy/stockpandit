async function testAPI() {
  const API_URL = "https://api.stockdata.org/v1/data/intraday";
  const API_KEY = "vIrKyXHaMLlnQBvELWvnn3jbwbhOYmrIjSjNoqti";
  const symbols = "AAPL,MSFT,AMZN,GOOGL";

  try {
    const response = await fetch(`${API_URL}?symbols=${symbols}&api_token=${API_KEY}`);
    const data = await response.json();
    console.log("Fetched Data:", data);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    if (data && data.data) {
      console.log("Stock Data:", data.data);
    } else {
      throw new Error("Data structure invalid or empty.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testAPI();
