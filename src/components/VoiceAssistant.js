import React, { useState } from 'react';
import './VoiceAssistant.css';

const VoiceAssistant = ({ onCommand, energyData }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const processCommand = async (command) => {
    if (!energyData) {
      return "Sorry, energy data is not available at the moment.";
    }

    // Simple command processing logic
    const commandLower = command.toLowerCase();
    
    if (commandLower.includes('total energy')) {
      return `The total energy usage is ${energyData.total} kWh`;
    }
    
    if (commandLower.includes('highest consuming')) {
      const appliances = Object.entries(energyData.appliances);
      const highest = appliances.reduce((max, current) => 
        current[1].usage > max[1].usage ? current : max
      );
      return `The highest consuming appliance is ${highest[0]} with ${highest[1].usage} kWh`;
    }
    
    if (commandLower.includes('comparison')) {
      return energyData.comparison;
    }
    
    if (commandLower.includes('appliance')) {
      return `Here are the appliance usages: ${Object.entries(energyData.appliances)
        .map(([name, data]) => `${name}: ${data.usage} kWh (${data.percentage}%)`)
        .join(', ')}`;
    }

    return "I'm sorry, I didn't understand that command. You can ask about total energy, highest consuming appliance, comparison, or appliance usage.";
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const command = event.results[0][0].transcript;
      setTranscript(command);
      const aiResponse = await processCommand(command);
      setResponse(aiResponse);
      onCommand(command, aiResponse);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="voice-assistant">
      <button 
        className={`voice-button ${isListening ? 'listening' : ''}`}
        onClick={startListening}
      >
        {isListening ? 'Listening...' : 'Ask Me'}
      </button>
      
      {transcript && (
        <div className="transcript">
          <h3>You said:</h3>
          <p>{transcript}</p>
        </div>
      )}
      
      {response && (
        <div className="response">
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
