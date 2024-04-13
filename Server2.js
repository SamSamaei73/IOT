const express = require("express");
const { EventHubConsumerClient } = require("@azure/event-hubs");
const app = express();
const sampleData = { temperature: 25, humidity: 60 };
const cors = require("cors"); // Import the cors middleware

const connectionString =
  "Endpoint=sb://iothub-ns-newiot007-59030881-6c1f50ab4a.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=8EAsF8CfiFq/RoWBi2YpomRh3iOkq0atEAIoTB0mHDI=;EntityPath=newiot007";
const consumerClient = new EventHubConsumerClient("$Default", connectionString);

let latestEventData = sampleData; // Initialize with sample data

consumerClient.subscribe({
  processEvents: async (events, context) => {
    for (const event of events) {
      const eventData = event.body; // Extract message content
      console.log(
        `Humidity: '${eventData.humidity}' Temperature: '${eventData.temperature}' from: '${eventData.deviceId}'`
      );
      latestEventData = eventData; // Update latest event data
      // Process the event data here
    }
  },
  processError: async (err, context) => {
    console.error(`Error occurred: ${err}`);
  },
});

// Use cors middleware
app.use(cors());
// Endpoint to retrieve latest IoT data
app.get("/data", (req, res) => {
  res.json(latestEventData); // Return latest IoT data as JSON object
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
