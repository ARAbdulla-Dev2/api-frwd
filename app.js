// Import necessary modules
const express = require('express');
const axios = require('axios');
const https = require('https');
const app = express();
const port = 80; // You can set this to any other port if needed

// Your API endpoint and parameters
const targetApiUrl = "https://87e5630ecff355.lhr.life/api";

// Create an HTTPS agent to disable SSL certificate validation
const agent = new https.Agent({  
  rejectUnauthorized: false  // Disable SSL certificate validation
});

app.use(express.static('public'));

// Route to forward requests
app.get('/api', async (req, res) => {
  try {
    // Forward all query parameters received from the client to the target API
    const response = await axios.get(targetApiUrl, {
      params: req.query,  // This forwards all query parameters (apiKey, plugin, query, etc.)
      httpsAgent: agent    // Attach the custom agent to disable SSL validation
    });

    // Send the JSON response from the target API directly to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding request:", error);
    res.status(500).send("Something went wrong");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
