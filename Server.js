const express = require("express");
const { EventHubConsumerClient } = require("@azure/event-hubs");
const app = express();
// const path = require("path");
const sampleData = { temperature: 25, humidity: 60 };

const connectionString =
  "Endpoint=sb://iothub-ns-newiot007-59030881-6c1f50ab4a.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=8EAsF8CfiFq/RoWBi2YpomRh3iOkq0atEAIoTB0mHDI=;EntityPath=newiot007";
const consumerClient = new EventHubConsumerClient("$Default", connectionString);

// app.use(express.static(path.join(__dirname, "public")));

consumerClient.subscribe({
  processEvents: async (events, context) => {
    for (const event of events) {
      const eventData = event.body; // Extract message content
      console.log(
        `Humidity: '${eventData.humidity}' Temperature: '${eventData.temperature}' from: '${eventData.deviceId}'`
      );
      // Process the event data here
    }
  },
  processError: async (err, context) => {
    console.error(`Error occurred: ${err}`);
  },
});

// Endpoint to retrieve IoT data
app.get("/data", (req, res) => {
  // You can return the IoT data here
  res.json(sampleData); // Return IoT data as JSON object
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
