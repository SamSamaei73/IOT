// src/components/IoTData.js
import React, { useState, useEffect } from 'react';
import { EventHubConsumerClient } from '@azure/event-hubs';

const IoTData = () => {
  const [data, setData] = useState({ temperature: 0, humidity: 0 });

  useEffect(() => {
    const connectionString =
      "Endpoint=sb://iothub-ns-newiot007-59030881-6c1f50ab4a.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=8EAsF8CfiFq/RoWBi2YpomRh3iOkq0atEAIoTB0mHDI=;EntityPath=newiot007";
    const consumerClient = new EventHubConsumerClient("$Default", connectionString);

    const processData = async (events, context) => {
      for (const event of events) {
        const eventData = event.body;
        console.log(
          `Humidity: '${eventData.humidity}' Temperature: '${eventData.temperature}' from: '${eventData.deviceId}'`
        );
        setData(eventData);
      }
    };

    const processError = async (err, context) => {
      console.error(`Error occurred: ${err}`);
    };

    consumerClient.subscribe({
      processEvents: processData,
      processError: processError,
    });

    return () => {
      consumerClient.close();
    };
  }, []);

  return (
    <div>
      <p>Temperature: {data.temperature}</p>
      <p>Humidity: {data.humidity}</p>
    </div>
  );
};

export default IoTData;
